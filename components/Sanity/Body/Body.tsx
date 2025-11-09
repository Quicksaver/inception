'use client';

import clsx from 'clsx';

import SanityPortableText, { type SanityPortableTextChildren } from 'components/Sanity/PortableText';

import './Body.scss';

interface SanityBodyProps {
  children: SanityPortableTextChildren;
  className?: string;
}

export default function SanityBody({
  children,
  className = '',
}: SanityBodyProps) {
  return (
    <section className={ clsx('sanity-body', className) }>
      <SanityPortableText>
        { children }
      </SanityPortableText>
    </section>
  );
}
