'use client';

import { PortableText } from '@portabletext/react';
import type { TypedObject } from '@portabletext/types';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

import IconQuote from 'components/Icon/Quote';
import Image from 'components/Image';
import Link from 'components/Link';

import { urlFor } from 'studio/lib/image';

interface SanityMark {
  children?: React.ReactNode;
}

interface SanityLink extends SanityMark {
  value?: {
    href: string;
  };
}

interface SanityImage {
  value: SanityImageSource & {
    alt?: string;
    subtitle?: string;
  };
}

interface SanityQuote {
  value: {
    author: string;
    quote: string;
  };
}

export type SanityPortableTextChildren = TypedObject | TypedObject[] | undefined;

const sizes = [
  {
    condition: 'until-large' as const,
    size: '95vw' as const,
  },
  {
    size: '770px' as const,
  },
];

const components = {
  marks: {
    link: ({ children, value }: SanityLink) => {
      return (
        <Link href={ value?.href }>
          { children }
        </Link>
      );
    },

    subscript: ({ children }: SanityMark) => {
      return (
        <sub>{ children }</sub>
      );
    },

    superscript: ({ children }: SanityMark) => {
      return (
        <sup>{ children }</sup>
      );
    },
  },

  types: {
    image: ({ value }: SanityImage) => {
      return (
        <figure>
          <Image
            alt={ value.alt || value.subtitle || 'inline image' }
            sizes={ sizes }
            src={ urlFor(value) }
          />
          { !!value.subtitle && (
            <figcaption>{ value.subtitle }</figcaption>
          ) }
        </figure>
      );
    },

    quote: ({ value }: SanityQuote) => {
      return (
        <blockquote>
          <IconQuote />
          <p>{ value.quote }</p>
          <cite>{ value.author }</cite>
        </blockquote>
      );
    },
  },
};

export default function SanityPortableText({
  children,
}: {
  children: SanityPortableTextChildren;
}) {
  return !!children && (
    <PortableText
      components={ components }
      value={ children }
    />
  );
}
