import { createBreakpoints } from '@mui/system';

export const breakpoints = createBreakpoints({});
breakpoints.values.xs = 0;
breakpoints.values.sm = 600;
breakpoints.values.md = 1024;
breakpoints.values.lg = 1512;
breakpoints.values.xl = 1728;

const fontSize = 16;
enum FontWeight {
  LIGHT = 300,
  REGULAR = 400,
  MEDIUM = 600,
  BOLD = 700,
  BLACK = 800,
  STRONG = 900,
}

const baseThemeOptions = Object.freeze({
  breakpoints: {
    values: {
      ...breakpoints.values,
    },
  },
  typography: {
    fontSize,
    // Body Default
    body1: {
      fontSize: 16,
      fontWeight: FontWeight.REGULAR,
      lineHeight: 24 / 16,
    },
    // Body Small
    body2: {
      fontSize: 14,
      fontWeight: FontWeight.REGULAR,
      lineHeight: 16 / 14,
    },
    subtitle1: {
      fontSize: 14,
      lineHeight: 16 / 14,
      fontWeight: FontWeight.BOLD,
    },
    subtitle2: {
      fontSize: 14,
      lineHeight: 16 / 14,
      fontWeight: FontWeight.MEDIUM,
    },
    overline: {
      fontSize: 14,
      lineHeight: 16 / 14,
      fontWeight: FontWeight.REGULAR,
    },
    caption: {
      fontSize: 14,
      lineHeight: 16 / 14,
      fontWeight: FontWeight.MEDIUM,
    },
    h1: {
      fontSize: 32,
      lineHeight: 36 / 32,
      fontWeight: FontWeight.BOLD,
    },
    h2: {
      fontWeight: FontWeight.MEDIUM,
      fontSize: 24,
      lineHeight: 32 / 24,
    },
    h3: {
      fontWeight: FontWeight.BOLD,
      fontSize: 20,
      lineHeight: 28 / 20,
    },
    h4: {
      fontWeight: FontWeight.MEDIUM,
      fontSize: 18,
      lineHeight: 28 / 18,
    },
    // Body Large
    h5: {
      fontSize: 18,
      lineHeight: 28 / 18,
      fontWeight: FontWeight.REGULAR,
    },
    // Body Medium
    h6: {
      fontSize: 16,
      lineHeight: 24 / 16,
      fontWeight: FontWeight.MEDIUM,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          boxSizing: 'border-box',
        },
        html: {
          MozOsxFontSmoothing: 'grayscale',
          WebkitFontSmoothing: 'antialiased',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100dvh',
          width: '100%',
        },
        body: {
          display: 'flex',
          flex: '1 1 auto',
          minHeight: '100dvh',
          width: '100%',
        },
      },
    },
  },
});

export default baseThemeOptions;
