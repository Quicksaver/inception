import { defineQuery } from 'next-sanity';

import clientFetch from 'studio/lib/fetch';

export const queryOtherEvents = defineQuery(`
  *[_type == 'otherEvents'] | order(orderRank) {
    ...,
    subtitle
  }
`);

export function fetchOtherEvents() {
  return clientFetch(
    queryOtherEvents,
    {},
    {
      next: {
        tags: [ 'otherEvents' ],
      },
    },
  );
}
