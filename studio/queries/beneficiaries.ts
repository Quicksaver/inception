import { defineQuery } from 'next-sanity';

import clientFetch from 'studio/lib/fetch';

export const queryBeneficiaries = defineQuery(`
  *[_type == 'beneficiaries'] | order(orderRank) {
    ...,
    "images": images[] {
      ...,
      "asset": asset->
    }
  }
`);

export function fetchBeneficiaries() {
  return clientFetch(
    queryBeneficiaries,
    {},
    {
      next: {
        tags: [ 'beneficiaries' ],
      },
    },
  );
}
