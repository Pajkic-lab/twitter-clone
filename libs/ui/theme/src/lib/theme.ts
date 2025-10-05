/**
 * Use rem for text sizes and major layout spacing
 * Use px for precise component dimensions
 */

export const theme = {
  colors: {
    white: '#ffffff',
    lavender: '#e7e9ea',
    lavender1: '#e6ecf0',
    whiteSmoke: '#eff3f4',
    royalBlue: '#1d9bf0',
    gray: '#71767b',
    slateGray: '#5b7083',
    dimGray: '#595d62',
    dimGray1: '#536471',
    charcoal: '#4b4e52',
    darkGray: '#141d26',
    darkGray1: '#2f3336',
    darkGray2: '#333639',
    black: '#000000',
    black1: '#121517',
    black2: '#0f1419',
  },
  typography: {
    fontFamily: "'chip-regular', Verdana, 'Segoe UI', sans-serif",
    fontWeight: {
      normal: 400,
      medium: 500,
      semiBold: 600,
      bold: 700,
      extraBold: 800,
    },
    fontSizes: {
      xs: '0.7857rem', // 11px
      sm: '0.9286rem', // 13px
      base: '1rem', // 14px
      md: '1.0714rem', // 15px
      lg: '1.2143rem', // 17px
      xl: '1.4286rem', // 20px
      xxl: '2.2143rem', // 31px
    },
    lineHeights: {
      lh12: '0.8571rem', // 12px
      lh16: '1.1429rem', // 16px
      lh20: '1.4286rem', // 20px
      tight: '1.6071rem', // 22.5px
      normal: '1.7143rem', // 24px
      lh36: '2.5714rem', // 36px
    },
  },
  breakpoints: {
    s: 600,
    m: 960,
    l: 1280,
    xl: 1440,
    '2xl': 1920,
    '3xl': 2048,
  },
  spacing: {
    0: '0', // 0px
    0.125: '0.125rem', // 1.75px
    0.25: '0.25rem', // 3.5px
    0.375: '0.375rem', // 5.25px
    0.5: '0.5rem', // 7px
    0.625: '0.625rem', // 8.75px
    0.75: '0.75rem', // 10.5px
    0.875: '0.875rem', // 12.25px
    1: '1rem', // 14px
    1.25: '1.25rem', // 17.5px
    1.5: '1.5rem', // 21px
    1.75: '1.75rem', // 24.5px
    2: '2rem', // 28px
    2.25: '2.25rem', // 31.5px
    2.5: '2.5rem', // 35px
    3: '3rem', // 42px
    3.5: '3.5rem', // 49px
    4: '4rem', // 56px
    4.5: '4.5rem', // 63px
    5: '5rem', // 70px
    6: '6rem', // 84px
    7: '7rem', // 98px
    8: '8rem', // 112px
    9: '9rem', // 126px
    10: '10rem', // 140px
    12: '12rem', // 168px
    14: '14rem', // 196px
    16: '16rem', // 224px
    20: '20rem', // 280px
    24: '24rem', // 336px
    28: '28rem', // 392px
    32: '32rem', // 448px
    36: '36rem', // 504px
    40: '40rem', // 560px
    48: '48rem', // 672px
    56: '56rem', // 784px
    64: '64rem', // 896px
  },
  radii: {
    none: '0', // 0px, sharp corners
    xs: '2px', // very subtle rounding
    sm: '4px', // small rounding, standard for buttons/inputs
    md: '8px', // medium rounding, standard for cards
    lg: '12px', // slightly larger, noticeable curves
    xl: '16px', // large rounding for big containers
    xxl: '24px', // extra-large rounding for big sections or modals
    round: '9999px', // fully circular, for pills, avatars, circular buttons
  },
  shadows: {
    xs: '0 1px 1px rgba(0,0,0,0.03)', // very subtle
    sm: '0 1px 2px rgba(0,0,0,0.05)', // small, for buttons
    md: '0 4px 6px rgba(0,0,0,0.1)', // medium, for cards
    lg: '0 10px 15px rgba(0,0,0,0.15)', // large, for modals
    xl: '0 20px 25px rgba(0,0,0,0.2)', // extra-large, for overlays
    xxl: '0 30px 35px rgba(0,0,0,0.25)', // dramatic, for full-screen elements
  },
};

export type Theme = typeof theme;
