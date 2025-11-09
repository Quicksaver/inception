import {
  Arrow,
  Content,
  Portal,
  Provider, Root, Trigger,
} from '@radix-ui/react-tooltip';

import './Tooltip.scss';

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  delayDuration?: number;
  side?: 'bottom' | 'left' | 'right' | 'top';
}

export default function Tooltip({
  children,
  content,
  delayDuration = 400,
  side = 'top',
}: TooltipProps) {
  return (
    <Provider delayDuration={ delayDuration }>
      <Root>
        <Trigger asChild>{ children }</Trigger>
        <Portal>
          <Content
            className="tooltip__content"
            side={ side }
            sideOffset={ 8 }
          >
            { content }
            <Arrow className="tooltip__arrow" />
          </Content>
        </Portal>
      </Root>
    </Provider>
  );
}
