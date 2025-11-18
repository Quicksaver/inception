import { Metadata } from 'next';

import BlogList from 'components/Blog/List';
import BlogPagination from 'components/Blog/Pagination';
import Container from 'components/Container';
import Main from 'components/Main';
import PageTitle from 'components/Page/Title';

import { setBlogParameters } from 'utils/blog';

export const metadata: Metadata = {
  title: 'News/Blog',
};

export default async function NewsPage({
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
      <Container>
        <PageTitle>News</PageTitle>
      </Container>
      <BlogList />
      <BlogPagination />
    </Main>
  );
}
