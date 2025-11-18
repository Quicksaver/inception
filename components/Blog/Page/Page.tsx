'use client';

import { useMemo } from 'react';

import Button from 'components/Button';
import Container from 'components/Container';
import IconArrow from 'components/Icon/Arrow';
import IconChevron from 'components/Icon/Chevron';
import Image from 'components/Image';
import Link from 'components/Link';
import Main from 'components/Main';
import SanityBody from 'components/Sanity/Body';

import type { QueryBlogArticleBySlugResult } from 'studio/sanity.types';

import './Page.scss';

interface BlogPageProps {
  article: NonNullable<QueryBlogArticleBySlugResult>;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function BlogPage({ article }: BlogPageProps) {
  const {
    _updatedAt,
    abstract,
    author,
    body,
    coverImage,
    nextSlug,
    previousSlug,
    publishTime,
    title,
  } = article;

  const publishDate = useMemo(() => new Date(publishTime), [ publishTime ]);
  const updateDate = useMemo(() => new Date(_updatedAt), [ _updatedAt ]);

  return (
    <article className="blog-page">
      <Container>
        <header className="blog-page__header">
          <Link
            className="blog-page__back"
            href="/news"
          >
            <IconArrow />
            News
          </Link>
          <h3>{ title }</h3>

          <div className="blog-page__meta">
            <span className="blog-page__author">
              By
              { ' ' }
              { author }
            </span>
            <span className="blog-page__separator">•</span>
            <time
              className="blog-page__date"
              dateTime={ publishTime }
            >
              { formatDate(publishTime) }
            </time>
            { updateDate > publishDate && (
              <>
                <span className="blog-page__separator">•</span>
                <time
                  className="blog-page__date blog-page__date--updated"
                  dateTime={ _updatedAt }
                >
                  Updated
                  { ' ' }
                  { formatDate(_updatedAt) }
                </time>
              </>
            ) }
          </div>

          <p className="blog-page__abstract">{ abstract }</p>
        </header>
      </Container>

      <Container className="blog-page__cover">
        <Image
          alt={ coverImage.alt || title }
          preload
          sizes={ [
            { condition: 'until-desktop' as const, size: '100vw' as const },
            { size: '1200px' as const },
          ] }
          src={ coverImage }
        />
      </Container>

      { body && (
        <Container>
          <Main className="blog-page__body">
            <SanityBody>{ body }</SanityBody>
          </Main>
        </Container>
      ) }

      <div className="blog-page__navigation">
        { !!previousSlug && (
          <Button
            className="blog-page__previous"
            href={ `/news/article/${previousSlug}` }
            theme="primary"
          >
            <IconChevron />
            Previous Article
          </Button>
        ) }

        { !!nextSlug && (
          <Button
            className="blog-page__next"
            href={ `/news/article/${nextSlug}` }
            theme="primary"
          >
            Next Article
            <IconChevron />
          </Button>
        ) }
      </div>
    </article>
  );
}
