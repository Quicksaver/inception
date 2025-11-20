import { defineQuery } from 'next-sanity';

import clientFetch from 'studio/lib/fetch';

export const querySiteSettings = defineQuery(`
  *[_type == 'siteSettings' && _id == 'siteSettings'][0] {
    ...,
    "disclaimerImages": disclaimerImages[] {
      ...,
      "asset": asset->
    },
    "shareimage": {
      ...shareimage,
      "asset": shareimage.asset->
    }
  }
`);

export function fetchSiteSettings() {
  return clientFetch(
    querySiteSettings,
    {},
    {
      next: {
        tags: [ 'siteSettings' ],
      },
    },
  );
}
