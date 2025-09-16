export type BreakpointKeys = keyof typeof breakpoints;
export type Breakpoints = typeof breakpoints;

// This file is absolute, breakpoints are in theme file now
export const breakpoints = {
  s: 600,
  m: 960,
  l: 1280,
  xl: 1440,
  '2xl': 1920,
  '3xl': 2048,
};
