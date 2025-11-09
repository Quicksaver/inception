import { create } from 'zustand';

import useRendered from 'hooks/useRendered';

interface ScrollPositionState {
  scrollPosition: number;
}

export const useRealScrollPosition = create<ScrollPositionState>(set => {
  const handleScroll = () => {
    set({ scrollPosition: window.scrollY });
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  return {
    scrollPosition: typeof window !== 'undefined' ? window.scrollY : 0,
  };
});

export default function useScrollPosition() {
  const { scrollPosition } = useRealScrollPosition();
  const rendered = useRendered();

  return rendered ? scrollPosition : 0;
}
