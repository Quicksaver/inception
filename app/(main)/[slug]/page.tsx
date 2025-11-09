import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import SimplePage from 'components/SimplePage';

import { fetchPage } from 'studio/queries/page';
import { type PagePropsWithSlug } from 'types/next';

export async function generateMetadata({ params }: PagePropsWithSlug): Promise<Metadata | null> {
  const { slug } = await params;
  const page = await fetchPage(slug);

  if (page) {
    return {
      title: page.title,
    };
  }

  return null;
}

export default async function MainSlugPage({ params }: PagePropsWithSlug) {
  const { slug } = await params;

  const page = await fetchPage(slug);
  if (page) {
    return (
      <SimplePage { ...page } />
    );
  }

  return notFound();
}
