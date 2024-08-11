import { SnackbarProviderProps } from 'notistack';

const AlertSettings: SnackbarProviderProps = {
  maxSnack: 3,
  autoHideDuration: 4000,
  preventDuplicate: true,
  dense: true,
  hideIconVariant: false,
  anchorOrigin: {
    vertical: 'top',
    horizontal: 'right',
  },
  TransitionProps: {
    direction: 'left',
  },
};
export default AlertSettings;
