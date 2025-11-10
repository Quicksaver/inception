import { defineQuery } from 'next-sanity';

import clientFetch from 'studio/lib/fetch';

export const queryAbout = defineQuery(`
  *[_type == 'about' && _id == 'about'][0]
`);

export function fetchAbout() {
  return clientFetch(
    queryAbout,
    {},
    {
      next: {
        tags: [ 'about' ],
      },
    },
  );
}
