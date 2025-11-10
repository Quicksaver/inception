import { defineQuery } from 'next-sanity';

import clientFetch from 'studio/lib/fetch';

export const queryPositions = defineQuery(`
  *[_type == 'positions'] | order(orderRank) {
    ...,
    "image": {
      ...image,
      "asset": image.asset->
    }
  }
`);

export function fetchPositions() {
  return clientFetch(
    queryPositions,
    {},
    {
      next: {
        tags: [ 'positions' ],
      },
    },
  );
}
