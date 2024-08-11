'use client';

import { ConfirmProvider } from '@hooks/useConfirm';
import { nzLocaleText } from '@libs/dayjs';
import { CssBaseline } from '@mui/material';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { memo } from 'react';

import { Alert } from '@hooks/useAlert/Alert';
import AlertSettings from '@libs/notistack/config';
import { SnackbarProvider } from 'notistack';
import theme from './createTheme';

export interface ThemeProviderProps {
  children?: React.ReactNode;
}
export const ThemeProvider = memo((props: ThemeProviderProps) => {
  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale='en-nz'
      localeText={nzLocaleText}
    >
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider
          {...AlertSettings}
          Components={{
            success: Alert,
            error: Alert,
            warning: Alert,
            info: Alert,
          }}
        >
          <ConfirmProvider>{props.children}</ConfirmProvider>
        </SnackbarProvider>
      </MuiThemeProvider>
    </LocalizationProvider>
  );
});
ThemeProvider.displayName = 'ThemeProvider';
