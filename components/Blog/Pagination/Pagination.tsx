import Container from 'components/Container';
import IconChevron from 'components/Icon/Chevron';
import Pagination from 'components/Pagination';

import { fetchBlogArticlesCount } from 'studio/queries/blog';
import { blogUrlBuilder, getBlogParameters } from 'utils/blog';

import './Pagination.scss';

export default async function BlogPagination() {
  const blogParameters = getBlogParameters();
  const { page, perPage } = blogParameters;

  const total = await fetchBlogArticlesCount();

  const hrefBuilder = (newPage: number) => blogUrlBuilder({
    page: newPage,
  });

  return (
    <Container className="blog-pagination">
      <Pagination
        current={ page || 1 }
        hrefBuilder={ hrefBuilder }
        nextLabel={ <IconChevron /> }
        previousLabel={ <IconChevron /> }
        total={ Math.ceil((total - 1) / perPage) }
      />
    </Container>
  );
}
