import { clsx } from 'clsx';
import type { ReactNode } from 'react';

import Container from 'components/Container';

import './Section.scss';

export default function PageSection({
  children = null,
  className = '',
  title = null,
}: {
  children?: ReactNode;
  className?: string;
  title?: ReactNode;
}) {
  return (
    <Container
      as="section"
      className={ clsx('page-section', className) }
    >
      { !!title && (
        <h4>
          { title }
        </h4>
      ) }
      { children }
    </Container>
  );
}
