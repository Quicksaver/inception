import { useMemo } from 'react';

import useConsent from 'hooks/useConsent';
import cookieConsent from 'utils/cookieConsent';
import cookies from 'utils/cookies';

type StorageType = 'localStorage' | 'sessionStorage';

function getStoreObject(storageType: StorageType) {
  const storage = window[storageType];

  // This will throw in Safari in incognito, so that we fallback to cookies in that case.
  storage.setItem('test', 'test');
  if (storage.getItem('test') === 'test') {
    storage.removeItem('test');
  }

  // Setup simple local storage wrapper
  return {
    get: (key: string) => {
      const item = storage.getItem(key);
      if (!item) {
        return null;
      }

      try {
        return JSON.parse(item) as unknown;
      }
      catch {
        return null;
      }
    },
    remove: (key: string) => {
      if (storage.getItem(key)) {
        storage.removeItem(key);
      }
    },
    set: (key: string, value: unknown) => {
      const newValue = JSON.stringify(value);
      const oldValue = storage.getItem(key);
      if (oldValue !== newValue) {
        storage.setItem(key, newValue);
      }
    },
  };
}

function getStorageObject(consentGiven: boolean) {
  const inBrowser = typeof window !== 'undefined';
  if (!inBrowser) {
    return {
      get: () => undefined,
      remove: () => undefined,
      set: () => undefined,
    };
  }

  try {
    // User has not consented to storing information, we can only store info for this session.
    if (!consentGiven) {
      return getStoreObject('sessionStorage');
    }

    return getStoreObject('localStorage');
  }

  // Safari in incognito has local storage, but size 0
  // This system falls back to cookies in that situation
  catch {
    return cookies;
  }
}

export async function getStorage(consentType: boolean | null | string | undefined) {
  const consent = (typeof consentType === 'string')
    ? (await cookieConsent.read())?.[consentType]
    : consentType;

  return getStorageObject(!!consent);
}

// Let's try to bring any data we have in sessionStorage into localStorage as soon as the user
// agrees to the cookies policy. That way we won't lose any actions or preferences, but this is all
// still dependent on the user accepting the cookies within the current session.
if (typeof window !== 'undefined') {
  void (async () => {
    const initialConsent = (await cookieConsent.read())?.essential;

    cookieConsent.listen(newConsent => {
      try {
        if (newConsent.essential !== initialConsent) {
          // Normal usage, i.e. in site, the direction will only be sessionStorage -> localStorage,
          // but the reverse should still work.
          const from = initialConsent ? window.sessionStorage : window.localStorage;
          const to = initialConsent ? window.localStorage : window.sessionStorage;

          Object.keys(from).forEach(key => {
            // This will copy all keys from one object to the other, including those set by
            // third-parties (e.g. wallet connect or sequence). We don't remove the keys from the
            // original object, so that those third-parties can keep functioning on their own.
            const value = from.getItem(key);
            if (value !== null) {
              to.setItem(key, value);
            }
          });
        }
      }
      catch (ex) {
        // This won't really matter, will fail in safari in incognito, but we shouldn't block
        // execution just in case.
        // eslint-disable-next-line no-console
        console.error(ex);
      }
    });
  })();
}

const useStorage = (consentType: string) => {
  const consent = useConsent();
  return useMemo(() => getStorage(consent[consentType]), [ consent, consentType ]);
};

export default useStorage;
