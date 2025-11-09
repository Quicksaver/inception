import { useCallback } from 'react';

const useClickOutside = (handler: (e: Element) => void) => {
  return useCallback((node: HTMLElement | null) => {
    const onClick = (e: MouseEvent) => {
      if (node && !node.contains(e.target as Element)) {
        handler(e.target as Element);
      }
    };

    window.addEventListener('click', onClick, true);

    return () => {
      window.removeEventListener('click', onClick, true);
    };
  }, [ handler ]);
};

export default useClickOutside;
