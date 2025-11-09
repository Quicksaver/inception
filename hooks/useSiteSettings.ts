'use client';

import { use } from 'react';

import { getSiteSettings } from 'utils/siteSettings';

const siteSettings = getSiteSettings();

export default function useSiteSettings() {
  return use(siteSettings);
}
