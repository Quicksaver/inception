import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import BlogPage from 'components/Blog/Page';
import Main from 'components/Main';

import { fetchBlogArticleBySlug } from 'studio/queries/blog';
import { type PagePropsWithSlug } from 'types/next';

export async function generateMetadata({ params }: PagePropsWithSlug): Promise<Metadata | null> {
  const { slug } = await params;
  const article = await fetchBlogArticleBySlug(slug);

  if (!article) {
    return null;
  }

  return {
    description: article.abstract,
    title: article.title,
  };
}

export default async function BlogSlugPage({ params }: PagePropsWithSlug) {
  const { slug } = await params;
  const article = await fetchBlogArticleBySlug(slug);

  if (!article) {
    return notFound();
  }

  return (
    <Main>
      <BlogPage article={ article } />
    </Main>
  );
}
