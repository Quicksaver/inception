// Simple util to store and retrieve site settings from the server side in client components. No need to be a state as
// these will not change during the lifetime of the app.

import type { QuerySiteSettingsResult } from 'studio/sanity.types';
import events from 'utils/events';

export const defaultSiteSettings: NonNullable<QuerySiteSettingsResult> = {
  _createdAt: '',
  _id: '',
  _rev: '',
  _type: 'siteSettings',
  _updatedAt: '',
  description: '',
  shareimage: {
    _type: 'image',
    asset: null,
  },
  title: '',
};

let internal: QuerySiteSettingsResult = null;

export function getSiteSettings(): Promise<NonNullable<QuerySiteSettingsResult>> {
  return new Promise(resolve => {
    if (internal) {
      resolve(internal);
      return;
    }

    events.once('siteSettingsUpdated', (siteSettings: NonNullable<QuerySiteSettingsResult>) => {
      resolve(siteSettings);
    });
  });
}

export function setSiteSettings(siteSettings: QuerySiteSettingsResult) {
  internal = {
    ...defaultSiteSettings,
    ...siteSettings,
  };

  events.emit('siteSettingsUpdated', internal);
}

if (typeof window === 'undefined') {
  void (async () => {
    const { fetchSiteSettings } = await import('studio/queries/siteSettings');

    const siteSettings = await fetchSiteSettings();

    setSiteSettings(siteSettings);
  })();
}
