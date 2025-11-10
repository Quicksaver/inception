import { defineQuery } from 'next-sanity';

import clientFetch from 'studio/lib/fetch';

export const queryTrainingEvents = defineQuery(`
  *[_type == 'trainingEvents'] | order(orderRank) {
    ...,
    subtitle
  }
`);

export function fetchTrainingEvents() {
  return clientFetch(
    queryTrainingEvents,
    {},
    {
      next: {
        tags: [ 'trainingEvents' ],
      },
    },
  );
}
