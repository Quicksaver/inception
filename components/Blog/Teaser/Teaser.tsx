import clsx from 'clsx';
import { useMemo } from 'react';

import IconArrow from 'components/Icon/Arrow';
import Image from 'components/Image';
import Link from 'components/Link';

import type { QueryPublishedBlogArticlesResult } from 'studio/sanity.types';
import date from 'utils/date';

import './Teaser.scss';

export interface BlogTeaserProps {
  article: NonNullable<QueryPublishedBlogArticlesResult>[number];
  featured?: boolean;
}

const sizes = [
  { condition: 'until-tablet' as const, size: '100vw' as const },
  { condition: 'until-desktop' as const, size: '50vw' as const },
  { size: '33vw' as const },
];

export default function BlogTeaser({
  article,
  featured = false,
}: BlogTeaserProps) {
  const {
    abstract,
    author,
    coverImage,
    publishTime,
    slug,
    title,
  } = article;

  const publishDateStr = useMemo(
    () => date.long(publishTime),
    [ publishTime ],
  );

  return (
    <Link
      className={ clsx('blog-teaser', {
        'blog-teaser--featured': featured,
      }) }
      href={ `/news/article/${slug.current}` }
    >
      <div className="blog-teaser__image">
        <Image
          alt={ coverImage.alt || title }
          sizes={ sizes }
          src={ coverImage }
        />
      </div>
      <div className="blog-teaser__content">
        <div className="blog-teaser__meta">
          <span className="blog-teaser__author">{ author }</span>
          <span className="blog-teaser__separator">•</span>
          <time
            className="blog-teaser__date"
            dateTime={ publishTime }
          >
            { publishDateStr }
          </time>
        </div>
        <h3 className="blog-teaser__title">{ title }</h3>
        <p className="blog-teaser__abstract">{ abstract }</p>

        { featured && (
          <IconArrow />
        ) }
      </div>
    </Link>
  );
}
