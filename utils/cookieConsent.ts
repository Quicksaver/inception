import cookies from 'utils/cookies';
import events from 'utils/events';
import { getSiteSettings } from 'utils/siteSettings';

export interface Consent {
  [key: string]: boolean;
}

async function getCookieName() {
  const siteSettings = await getSiteSettings();
  const { cookieVersion } = siteSettings;

  // eslint-disable-next-line no-nested-ternary
  const version = cookieVersion
    ? (/^v[0-9\-.]+$/.exec(cookieVersion))
      ? cookieVersion
      : `v${cookieVersion}`
    : '';

  return version ? `CookieConsent-${version}` : '';
}

const cookieConsent = {
  listen(handler: (consent: Consent) => void) {
    events.on('consentUpdated', handler);
  },

  unlisten(handler: (consent: Consent) => void) {
    events.off('consentUpdated', handler);
  },

  async read(): Promise<Consent | null> {
    try {
      const cookieName = await getCookieName();
      if (!cookieName) {
        return null;
      }

      const saved = await cookies.get(cookieName);
      if (saved && typeof saved === 'object' && !Array.isArray(saved)) {
        return saved as Consent;
      }

      return {};
    }
    catch {
      return null;
    }
  },

  async save(value: Consent) {
    const cookieName = await getCookieName();

    await cookies.set(cookieName, value);
    events.emit('consentUpdated', value);
  },
};

export default cookieConsent;
