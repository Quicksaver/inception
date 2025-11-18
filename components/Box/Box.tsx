import clsx from 'clsx';
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

import './Box.scss';

export default function Box<T extends ElementType = 'div'>({
  as,
  children = null,
  className = '',
  ...props
}: Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'> & {
  as?: T;
  children?: ReactNode;
  className?: string;
}) {
  const Component = as || 'div';

  return (
    <Component
      className={ clsx('box', className) }
      { ...props }
    >
      { children }
    </Component>
  );
}
