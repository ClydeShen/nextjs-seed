import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import type { ConfirmProps } from './types';

export const Confirm = (props: ConfirmProps) => {
  const {
    open,
    title,
    message,
    content,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    onConfirm,
    onDismiss,
  } = props;
  const onClose = (e: never, reason: string) => {
    if (reason !== 'backdropClick') onDismiss();
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={'xs'}
      fullWidth
      aria-labelledby={title}
    >
      <DialogTitle
        component={Stack}
        direction={'row'}
        justifyContent='space-between'
        alignItems={'center'}
      >
        {title && <Typography variant='h4'>{title}</Typography>}
        <IconButton
          edge='end'
          aria-label='close'
          color='inherit'
          onClick={onDismiss}
        >
          <CloseIcon fontSize='small' />
        </IconButton>
      </DialogTitle>
      {content || (message && <DialogContent>{message}</DialogContent>)}
      <DialogActions>
        {cancelLabel && (
          <Button onClick={onDismiss} size='small' color='inherit'>
            {cancelLabel}
          </Button>
        )}
        <Button
          onClick={onConfirm}
          variant='contained'
          size='small'
          color='error'
        >
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
