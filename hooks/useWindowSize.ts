'use client';

import { create } from 'zustand';

import breakpoints, { type BreakpointKey } from 'utils/breakpoints';

interface WindowSizeState {
  height: number;
  isAtLeast: (breakpoint: BreakpointKey | number) => boolean;
  isUntil: (breakpoint: BreakpointKey | number) => boolean;
  width: number;
}

function updateState() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  function isAtLeast(breakpoint: BreakpointKey | number) {
    if (!width) {
      return true;
    }

    if (!breakpoint) {
      return false;
    }

    if (typeof breakpoint === 'number') {
      return width >= breakpoint;
    }

    return width >= breakpoints[breakpoint];
  }

  function isUntil(breakpoint: BreakpointKey | number) {
    if (!width) {
      return false;
    }

    if (!breakpoint) {
      return true;
    }

    if (typeof breakpoint === 'number') {
      return width < breakpoint;
    }

    return width < breakpoints[breakpoint];
  }

  return {
    height,
    width,

    isAtLeast,
    isUntil,
  };
}

const useWindowSize = create<WindowSizeState>(set => {
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', () => set(updateState()), { passive: true });
  }

  if (typeof window === 'undefined') {
    return {
      height: 0,
      width: 0,

      isAtLeast: () => false,
      isUntil: () => false,
    };
  }

  return updateState();
});

export default useWindowSize;
