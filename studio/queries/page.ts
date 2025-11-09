import { defineQuery } from 'next-sanity';

import clientFetch from 'studio/lib/fetch';

export const queryPageBySlug = defineQuery(`
  *[_type == 'page' && slug.current == $slug][0]
`);

export function fetchPage(slug: string) {
  return clientFetch(
    queryPageBySlug,
    { slug },
    {
      next: {
        tags: [ `page:${slug}` ],
      },
    },
  );
}
