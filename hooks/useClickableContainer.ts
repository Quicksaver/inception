import { useMemo } from 'react';

interface ClickableContainerProps {
  onClick: (event: React.MouseEvent) => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
  role: string;
  tabIndex: number;
}

export default function useClickableContainer(
  handler: (event: React.KeyboardEvent | React.MouseEvent) => void,
  props?: Partial<ClickableContainerProps>,
): ClickableContainerProps {
  return useMemo(
    () => {
      function onClick(event: React.MouseEvent) {
        handler(event);
      }

      function onKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Enter') {
          handler(event);
        }
      }

      return {
        onClick,
        onKeyDown,
        role: 'button',
        tabIndex: 0,
        ...props,
      };
    },
    [ handler, props ],
  );
}
