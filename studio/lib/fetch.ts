import { PHASE_PRODUCTION_BUILD } from 'next/constants';
import type { QueryWithoutParams, ResponseQueryOptions } from 'next-sanity';
import type { QueryParams } from 'sanity';

import client from 'studio/lib/client';

export default function clientFetch<const Q extends string>(
  query: Q,
  params: QueryParams | QueryWithoutParams,
  options?: ResponseQueryOptions,
) {
  // When supplying tags to the request, we expect that the response will be cached until the tags are invalidated.
  // However during build, we want to force the cache to never be used, as there is no way invalidate that cache; this
  // is the default behavior of the client.
  // https://nextjs.org/docs/app/api-reference/functions/fetch#optionscache
  // https://developer.mozilla.org/en-US/docs/Web/API/Request/cache
  if (options?.next?.tags?.length && !('cache' in options) && process.env.NEXT_PHASE !== PHASE_PRODUCTION_BUILD) {
    options.cache = 'force-cache';
  }

  return client.fetch(query, params, options);
}
