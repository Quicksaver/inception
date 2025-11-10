import { defineQuery } from 'next-sanity';

import clientFetch from 'studio/lib/fetch';

export const queryTraining = defineQuery(`
  *[_type == 'training' && _id == 'training'][0]
`);

export function fetchTraining() {
  return clientFetch(
    queryTraining,
    {},
    {
      next: {
        tags: [ 'training' ],
      },
    },
  );
}
