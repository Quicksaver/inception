import { Metadata } from 'next';

import BlogList from 'components/Blog/List';
import BlogPagination from 'components/Blog/Pagination';
import Main from 'components/Main';

import { setBlogParameters } from 'utils/blog';

export const metadata: Metadata = {
  title: 'Blog',
};

export default async function BlogPage({
  params,
}: {
  params: Promise<{
    parameters: string[];
  }>;
}) {
  const { parameters } = await params;
  setBlogParameters(parameters);

  return (
    <Main>
      <BlogList />
      <BlogPagination />
    </Main>
  );
}
