import { createClient } from 'next-sanity';

import {
  apiVersion, dataset, projectId, token,
} from 'studio/env';

const client = createClient({
  apiVersion,
  dataset,
  perspective: 'published',
  projectId,
  token,
  useCdn: false,
});

export default client;
