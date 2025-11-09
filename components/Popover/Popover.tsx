import {
  Arrow,
  Content,
  type PopoverProps,
  Portal,
  Root,
  Trigger,
} from '@radix-ui/react-popover';
import { clsx } from 'clsx';
import { ReactNode } from 'react';

import './Popover.scss';

export default function Popover({
  children,
  className = '',
  content,
  noArrow = false,
  side = 'bottom',
  sideOffset = 8,
  ...props
}: PopoverProps & {
  children: ReactNode;
  className?: string;
  content: ReactNode;
  noArrow?: boolean;
  side?: 'bottom' | 'left' | 'right' | 'top';
  sideOffset?: number;
}) {
  return (
    <Root { ...props }>
      <Trigger asChild>{ children }</Trigger>
      <Portal>
        <Content
          className={ clsx('popover__content', className) }
          side={ side }
          sideOffset={ sideOffset }
        >
          { content }
          { !noArrow && <Arrow className="popover__arrow" /> }
        </Content>
      </Portal>
    </Root>
  );
}
