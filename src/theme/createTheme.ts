import {
  createTheme,
  PaletteColor as MuiPaletteColor,
  responsiveFontSizes,
  Theme,
} from '@mui/material/styles';
import baseThemeOptions, { THEME_COLOR } from './basic-options';

declare module '@mui/material/styles' {
  interface Palette {
    freshLime: MuiPaletteColor;
  }

  interface PaletteOptions {
    freshLime: MuiPaletteColor;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    brand: true;
    forest: true;
    freshLime: true;
    pastel: true;
    footer: true;
    mojito: true;
    clear: true;
    charcoal: true;
    cloud: true;
    gray: true;
    mud: true;
    ice: true;
  }
}

const generateThemeColor = (theme: Theme) =>
  Object.entries(THEME_COLOR).reduce((acc, [key, value]) => {
    return {
      ...acc,
      [key]: theme.palette.augmentColor({
        color: {
          main: value,
          contrastText: theme.palette.getContrastText(value),
        },
        name: key,
      }),
    };
  });

const createCustomTheme = () => {
  const theme = createTheme(baseThemeOptions);
  const themeWithThemeColor = createTheme(theme, {
    palette: { ...generateThemeColor(theme) },
  });
  console.log(themeWithThemeColor.palette);
  return responsiveFontSizes(themeWithThemeColor);
};

const myTheme = createCustomTheme();
console.log(myTheme);
export default myTheme;
