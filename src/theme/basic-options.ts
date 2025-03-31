import {
  ComponentsPropsList,
  CSSInterpolation,
  Theme,
  ThemeOptions,
} from '@mui/material';
import { createBreakpoints } from '@mui/system';

type ComponentName = keyof ComponentsPropsList;
interface StyleOverridesRootProps {
  ownerState: ComponentsPropsList[ComponentName] & Record<string, unknown>;
  theme: Theme & Record<string, unknown>;
}

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

enum Color {
  FOREST = '#5F7C14',
  BRAND = '#95C11F',
  FRESH_LIME = '#C5D98E',
  PASTEL = '#DEE7B7',
  FOOTER = '#F4F9E9',
  MOJITO = '#EAF1DD',
  CLEAR = '#F8F8F4',

  CHARCOAL = '#1E2C3F',
  SPACE = '#3F4855',
  MUD = '#766F62',
  SMOKE = '#D5D6CF',
  GRAY = '#D6D3CD',
  CLOUD = '#E9E9E9',
  ICE = '#F4F4F4',
  WHITE = '#FFFFFF',

  RED = '#D14D17',
  LIGHT_RED = '#FDF6F3',
  YELLOW = '#F9B400',
  LIGHT_YELLOW = '#FDF7E5',
  BLUE = '#194488',
  LIGHT_BLUE = '#E6F0F7',
}

export const THEME_COLOR = Object.freeze({
  brand: Color.BRAND,
  forest: Color.FOREST,
  freshLime: Color.FRESH_LIME,
  pastel: Color.PASTEL,
  footer: Color.FOOTER,
  mojito: Color.MOJITO,
  clear: Color.CLEAR,
  charcoal: Color.CHARCOAL,
  cloud: Color.CLOUD,
  gray: Color.GRAY,
  mud: Color.MUD,
  ice: Color.ICE,
});

const palette = {
  white: Color.WHITE,
  black: Color.CHARCOAL,
  primary: {
    main: Color.BRAND,
    light: Color.FRESH_LIME,
    dark: Color.FOREST,
    contrastText: Color.CHARCOAL,
  },
  secondary: {
    main: Color.SPACE,
    light: Color.SMOKE,
    dark: Color.CHARCOAL,
    contrastText: Color.ICE,
  },
  border: Color.CLOUD,
  background: {
    default: Color.CLEAR,
    paper: Color.WHITE,
  },
  error: {
    main: Color.RED,
    light: Color.LIGHT_RED,
    contrastText: Color.CHARCOAL,
  },
  warning: {
    main: Color.YELLOW,
    light: Color.LIGHT_YELLOW,
    contrastText: Color.CHARCOAL,
  },
  info: {
    main: Color.BLUE,
    light: Color.LIGHT_BLUE,
    contrastText: Color.ICE,
  },
  success: {
    main: Color.FRESH_LIME,
    dark: Color.BRAND,
    light: Color.MOJITO,
    contrastText: Color.CHARCOAL,
  },
  text: {
    primary: Color.CHARCOAL,
    secondary: Color.SPACE,
    disabled: Color.SMOKE,
  },
};

const baseThemeOptions = Object.freeze({
  palette: {
    primary: {
      main: palette.primary.main,
    },
    secondary: {
      main: palette.secondary.main,
    },
    text: {
      primary: palette.primary.contrastText,
      secondary: palette.secondary.main,
    },
    error: {
      main: palette.error.main,
      light: palette.error.light,
    },
    freshLime: {
      main: Color.FRESH_LIME,
      light: Color.PASTEL,
      dark: Color.FOREST,
      contrastText: Color.CHARCOAL,
    },
    background: palette.background,
  },
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
    MuiPaper: {
      styleOverrides: {
        root: ({ ownerState, theme }: StyleOverridesRootProps) => {
          return {
            backgroundImage: 'none',
            ...(ownerState.variant === 'outlined' && {
              border: `1px solid ${Color.CLOUD}`,
            }),
          };
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: palette.text.primary,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: ({ ownerState, theme }: StyleOverridesRootProps) => {
          return {
            boxShadow: 'none',
            textTransform: 'none',
            borderRadius: '25px',
            width: 'fit-content',
            fontWeight: 400,
            ...(ownerState.size === 'small' && {
              fontSize: 14,
              lineHeight: 16 / 14,
              padding: '8px 12px',
              height: '32px',
            }),
            ...(ownerState.variant === 'contained' &&
              ownerState.color === 'primary' && {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette[ownerState.color].main,
                ':hover': {
                  backgroundColor: theme.palette[ownerState.color].dark,
                },
                '&:disabled': {
                  color: theme.palette.text.primary,
                  backgroundColor: theme.palette[ownerState.color].main,
                  opacity: 0.5,
                },
              }),
            ...(ownerState.variant === 'outlined' &&
              ownerState.color === 'primary' && {
                color: theme.palette.text.primary,
              }),
            ...(ownerState.variant === 'text' &&
              ownerState.color === 'primary' && {
                color: theme.palette[ownerState.color].dark,
                fontWeight: 600,
              }),
          } satisfies CSSInterpolation;
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: ({ ownerState, theme }: StyleOverridesRootProps) => {
          return {
            backgroundColor: theme.palette.background.paper,
            '&.MuiInputBase-formControl': {
              borderRadius: '2px',
              ...(ownerState.error === true && {
                borderWidth: 2,
                backgroundColor: palette.error.light,
              }),
            },

            '& .MuiInputBase-input': {
              padding: '12px 16px',
              lineHeight: '24px',
            },

            '& .Mui-disabled': {
              backgroundColor: Color.ICE,
              WebkitTextFillColor: `${Color.SPACE} !important`,
            },
            '&.MuiInputBase-multiline': {
              padding: 0,
            },
          };
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: 'transparent',
          padding: 0,
          '& .MuiPaper-root': {
            background: Color.CHARCOAL,
            color: Color.WHITE,
            padding: 12,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: ({ ownerState, theme }: StyleOverridesRootProps) => {
          return {
            padding: '2px 4px',
            fontSize: 14,
            lineHeight: 16 / 14,
            '& .MuiChip-label': {
              '&.MuiChip-labelSmall': {
                fontSize: 14,
                lineHeight: 16 / 14,
                background: 'red',
              },
            },
            ...(ownerState.variant === 'outlined' && {
              color: theme.palette.text.primary,
            }),
          };
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          '&.Mui-selected': {
            backgroundColor: Color.MOJITO,
            color: Color.CHARCOAL,
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }: StyleOverridesRootProps) => {
          const root = {
            fontSize: 16,
            lineHeight: 24 / 16,
            letterSpacing: '-0.16px',
          };
          if (ownerState.severity === 'error') {
            return {
              ...root,
              backgroundColor: Color.LIGHT_RED,
              color: Color.RED,
            };
          }
          if (ownerState.severity === 'warning') {
            return {
              ...root,
              backgroundColor: Color.LIGHT_YELLOW,
              color: Color.CHARCOAL,
            };
          }
          if (ownerState.severity === 'info') {
            return {
              ...root,
              backgroundColor: Color.WHITE,
              borderColor: Color.CLOUD,
              '& .MuiAlert-icon': {
                color: Color.CHARCOAL,
              },
            };
          }
          return {
            ...root,
            backgroundColor: Color.MOJITO,
            color: Color.CHARCOAL,
          };
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontFamily: 'var(--font-din)',
          fontWeight: FontWeight.BOLD,
          fontSize: 18,
          lineHeight: 28 / 18,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          // "3px solid #000",
          border: `3px solid ${Color.CHARCOAL}`,
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          '& .MuiAutocomplete-inputRoot': {
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 0,
            '& .MuiAutocomplete-input': {
              padding: '12px 16px',
            },
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          '&.MuiTableCell-head': {
            fontWeight: FontWeight.BOLD,
            fontSize: 16,
            lineHeight: 24 / 16,
          },
          '&.MuiTableCell-body': {
            fontWeight: FontWeight.REGULAR,
            fontSize: 16,
            lineHeight: 24 / 16,
            letterSpacing: '-0.16px',
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 34,
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          '& .MuiAccordionSummary-root': {
            padding: '16px',
            '& .MuiAccordionSummary-content': {
              margin: 0,
            },
          },
        },
      },
    },
    MuiTableSortLabel: {
      styleOverrides: {
        root: {
          '& .MuiTableSortLabel-icon': {
            width: 24,
            height: 24,
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontWeight: FontWeight.REGULAR,
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          width: 24,
          height: 24,
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          marginRight: 0,
        },
      },
    },
    MuiStack: {
      styleOverrides: {
        root: {
          '& ol.MuiStack-root': {
            marginBlockStart: 0,
            marginBlockEnd: 0,
          },
        },
      },
    },
  },
} satisfies ThemeOptions);

export default baseThemeOptions;
