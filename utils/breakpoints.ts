/* eslint-disable perfectionist/sort-objects */

const breakpoints = {
  fullhd: 1920,
  wide: 1680,
  large: 1440,
  desktop: 1200,
  landscape: 992,
  tablet: 840,
  portrait: 768,
  mobile: 600,
  small: 472,
  tiny: 425,
};

export type BreakpointKey = keyof typeof breakpoints;

export default breakpoints as Record<BreakpointKey, number>;
