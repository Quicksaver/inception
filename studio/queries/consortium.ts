import { defineQuery } from 'next-sanity';

import clientFetch from 'studio/lib/fetch';

export const queryConsortium = defineQuery(`
  *[_type == 'consortium' && _id == 'consortium'][0]
`);

export function fetchConsortium() {
  return clientFetch(
    queryConsortium,
    {},
    {
      next: {
        tags: [ 'consortium' ],
      },
    },
  );
}
