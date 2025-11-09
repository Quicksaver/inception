import BlogTeaser from 'components/Blog/Teaser';
import Container from 'components/Container';

import { fetchPublishedBlogArticles } from 'studio/queries/blog';
import { getBlogParameters } from 'utils/blog';

import './List.scss';

function fetchPublishedArticles() {
  const { page, perPage } = getBlogParameters();

  // Also fetch the first article on the first page to use as a featured article
  const rangeStart = (page - 1) * perPage + (page === 1 ? 0 : 1);
  const rangeEnd = (page * perPage) + 1;

  return fetchPublishedBlogArticles({
    rangeEnd,
    rangeStart,
  });
}

export default async function BlogList() {
  const { page } = getBlogParameters();
  const articles = await fetchPublishedArticles();

  if (!articles.length) {
    return (
      <Container className="blog-list">
        <p className="blog-list__empty">No articles found.</p>
      </Container>
    );
  }

  const otherArticles = articles.slice(page === 1 ? 1 : 0);

  return (
    <Container className="blog-list">
      { page === 1 && (
        <div className="blog-list__featured">
          <BlogTeaser
            article={ articles[0] }
            featured
          />
        </div>
      ) }

      { otherArticles.length > 0 && (
        <div className="blog-list__grid">
          { otherArticles.map(article => (
            <BlogTeaser
              article={ article }
              key={ article.slug.current }
            />
          )) }
        </div>
      ) }
    </Container>
  );
}
