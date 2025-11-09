'use client';

import { useMemo } from 'react';

import Button from 'components/Button';
import Container from 'components/Container';
import IconChevron from 'components/Icon/Chevron';
import Image from 'components/Image';
import Main from 'components/Main';
import PageTitle from 'components/Page/Title';
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
          <PageTitle>{ title }</PageTitle>

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

      <div className="blog-page__cover">
        <Image
          alt={ coverImage.alt || title }
          preload
          sizes={ [
            { condition: 'until-desktop' as const, size: '100vw' as const },
            { size: '1200px' as const },
          ] }
          src={ coverImage }
        />
      </div>

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
            href={ `/blog/article/${previousSlug}` }
            theme="outline"
          >
            <IconChevron />
            Previous Article
          </Button>
        ) }

        { !!nextSlug && (
          <Button
            className="blog-page__next"
            href={ `/blog/article/${nextSlug}` }
            theme="outline"
          >
            Next Article
            <IconChevron />
          </Button>
        ) }
      </div>
    </article>
  );
}
