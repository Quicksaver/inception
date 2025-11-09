'use client';

import type { QuerySiteSettingsResult } from 'studio/sanity.types';
import { setSiteSettings } from 'utils/siteSettings';

export default function SiteSettings({ siteSettings }: { siteSettings: QuerySiteSettingsResult }) {
  setSiteSettings(siteSettings);
  return null;
}
