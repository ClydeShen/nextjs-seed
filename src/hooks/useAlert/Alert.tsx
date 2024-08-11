import CloseIcon from '@mui/icons-material/Close';
import {
  AlertTitle,
  IconButton,
  Alert as MuiAlert,
  Paper,
} from '@mui/material';
import { SnackbarContent, useSnackbar } from 'notistack';
import { forwardRef, useCallback } from 'react';
import { AlertProps } from './types';
export const Alert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  const {
    // You have access to notistack props and options 👇🏼
    id,
    message,
    title,
    variant,
    ...other
  } = props;
  const { closeSnackbar } = useSnackbar();
  const handleDismiss = useCallback(() => {
    closeSnackbar(id);
  }, [id, closeSnackbar]);
  return (
    <SnackbarContent ref={ref} role='alert'>
      <Paper elevation={6} sx={{ width: { xs: '100%', sm: 400 } }}>
        <MuiAlert
          severity={variant}
          action={
            <IconButton
              aria-label='close'
              color='inherit'
              size='small'
              onClick={handleDismiss}
            >
              <CloseIcon fontSize='inherit' />
            </IconButton>
          }
        >
          <AlertTitle>{title}</AlertTitle>
          {message}
        </MuiAlert>
      </Paper>
    </SnackbarContent>
  );
});
Alert.displayName = 'Alert';
