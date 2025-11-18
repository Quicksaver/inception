import { clsx } from 'clsx';
import type { ReactNode } from 'react';

import './List.scss';

export default function PageList({
  children = null,
  className = '',
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={ clsx('page-list', className) }>
      { children }
    </div>
  );
}
