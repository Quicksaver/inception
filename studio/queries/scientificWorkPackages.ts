import { defineQuery } from 'next-sanity';

import clientFetch from 'studio/lib/fetch';

export const queryScientificWorkPackages = defineQuery(`
  *[_type == 'scientificWorkPackages'] | order(orderRank)
`);

export function fetchScientificWorkPackages() {
  return clientFetch(
    queryScientificWorkPackages,
    {},
    {
      next: {
        tags: [ 'scientificWorkPackages' ],
      },
    },
  );
}
