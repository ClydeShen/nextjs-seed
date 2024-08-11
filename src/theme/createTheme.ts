import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import baseThemeOptions from './basic-options';

const createCustomTheme = () => {
  const theme = createTheme(baseThemeOptions);
  return responsiveFontSizes(theme);
};
const dfeTheme = createCustomTheme();
export default dfeTheme;
