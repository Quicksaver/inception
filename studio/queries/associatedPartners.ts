import { defineQuery } from 'next-sanity';

import clientFetch from 'studio/lib/fetch';

export const queryAssociatedPartners = defineQuery(`
  *[_type == 'associatedPartners'] | order(orderRank) {
    ...,
    "image": {
      ...image,
      "asset": image.asset->
    }
  }
`);

export function fetchAssociatedPartners() {
  return clientFetch(
    queryAssociatedPartners,
    {},
    {
      next: {
        tags: [ 'associatedPartners' ],
      },
    },
  );
}
