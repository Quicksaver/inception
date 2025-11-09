import { type ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

import { type Json } from 'types/json';
import getBaseUrl from 'utils/getBaseUrl';

type NextSetCookieOptions = Omit<ResponseCookie, 'name' | 'value'>;
type NextRemoveCookieOptions = Omit<ResponseCookie, 'expires' | 'value'>;
type JsCookieOptions = Cookies.CookieAttributes;
type CookieOptions = JsCookieOptions | NextSetCookieOptions;

const url = new URL(getBaseUrl());

const cookieOptions: CookieOptions = {
  domain: url.hostname,
  expires: 365,
  path: url.pathname,
  sameSite: 'strict',
  secure: !/^localhost(:[0-9]+)?$/.test(url.hostname) && process.env.NODE_ENV === 'production',
};

async function getCookieStore() {
  if (typeof window !== 'undefined') {
    const { default: store } = await import('js-cookie');

    return {
      has: async (name: string) => {
        return store.get(name) !== undefined;
      },

      get: async (name: string) => {
        return store.get(name);
      },

      set: async (name: string, value: string, options?: CookieOptions) => {
        const setOptions = {
          ...cookieOptions,
          ...options,
        } as JsCookieOptions;

        if (setOptions.expires && setOptions.expires instanceof Date) {
          // - js-cookie's expires is a number (days)
          // - next/headers' expires is a Date
          setOptions.expires = Math.ceil(
            (setOptions.expires.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
          );
        }

        store.set(name, value, setOptions);
      },

      remove: async (name: string, options?: CookieOptions) => {
        store.remove(name, {
          ...cookieOptions,
          ...options,
        } as JsCookieOptions);
      },
    };
  }

  const { cookies: nextCookies } = await import('next/headers');

  return {
    has: async (name: string) => {
      return (await nextCookies()).has(name);
    },

    get: async (name: string) => {
      return (await nextCookies()).get(name)?.value;
    },

    set: async (name: string, value: string, options?: CookieOptions) => {
      const setOptions = {
        ...cookieOptions,
        ...options,
      } as NextSetCookieOptions;

      if (setOptions.expires && typeof setOptions.expires === 'number') {
        // - js-cookie's expires is a number (days)
        // - next/headers' expires is a Date
        const expires = new Date();
        expires.setDate(expires.getDate() + (setOptions.expires));

        setOptions.expires = expires;
      }

      (await nextCookies()).set(name, value, setOptions);
    },

    remove: async (name: string, options?: CookieOptions) => {
      (await nextCookies()).delete({
        name,
        ...cookieOptions,
        ...options,
      } as NextRemoveCookieOptions);
    },
  };
}

const cookieStore = getCookieStore();

const cookies = {
  async get(name: string) {
    const store = await cookieStore;
    const value = await store.get(name);

    if (typeof value === 'string') {
      try {
        return JSON.parse(value) as Json;
      }
      catch {
        // Ignore JSON parse error, return raw value
        return value;
      }
    }

    return null;
  },

  async set(name: string, value: Json, options?: CookieOptions) {
    const store = await cookieStore;
    const stored = await store.get(name);
    const strValue = typeof value !== 'string' ? JSON.stringify(value) : value;

    if (stored !== strValue) {
      await store.set(name, strValue, options);
    }
  },

  async remove(name: string, options?: CookieOptions) {
    const store = await cookieStore;

    if (await store.has(name)) {
      await store.remove(name, options);
    }
  },
};

export default cookies;
