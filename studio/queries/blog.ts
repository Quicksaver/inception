import { defineQuery } from 'next-sanity';

import clientFetch from 'studio/lib/fetch';

export const queryBlogArticleBySlug = defineQuery(`
  *[
    _type == 'blogArticle' &&
    published == true &&
    slug.current == $slug
  ] {
    _updatedAt,
    abstract,
    author,
    body,
    "coverImage": {
      ...coverImage,
      "asset": coverImage.asset->
    },
    "nextSlug": *[_type == 'blogArticle' && published == true && publishTime > ^.publishTime] | order(publishTime asc)[0].slug.current,
    "previousSlug": *[_type == 'blogArticle' && published == true && publishTime < ^.publishTime] | order(publishTime desc)[0].slug.current,
    publishTime,
    slug,
    title
  }[0]
`);

export const queryPublishedBlogArticles = defineQuery(`
  *[
    _type == 'blogArticle' &&
    published == true
  ] | order(publishTime desc) [$rangeStart...$rangeEnd] {
    _updatedAt,
    abstract,
    author,
    "coverImage": {
      ...coverImage,
      "asset": coverImage.asset->
    },
    publishTime,
    slug,
    title
  }
`);

export const queryBlogArticlesCount = defineQuery(`
  count(*[
    _type == 'blogArticle' &&
    published == true
  ])
`);

// @TODO Check if we are invalidating cache on publishing
export function fetchBlogArticleBySlug(slug: string) {
  return clientFetch(
    queryBlogArticleBySlug,
    { slug },
    {
      next: {
        tags: [ `blogArticle:${slug}` ],
      },
    },
  );
}

export function fetchPublishedBlogArticles(parameters: {
  rangeEnd: number;
  rangeStart: number;
}) {
  return clientFetch(
    queryPublishedBlogArticles,
    parameters,
    {
      next: {
        tags: [ 'blogArticle' ],
      },
    },
  );
}

export function fetchBlogArticlesCount() {
  return clientFetch(
    queryBlogArticlesCount,
    {},
    {
      next: {
        tags: [ 'blogArticle' ],
      },
    },
  );
}
