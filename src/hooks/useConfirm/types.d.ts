import { ButtonProps } from '@mui/material';

export interface ConfirmMessageProps {
  title: string;
  message: string | React.ReactComponentElement;
  confirmLabel?: string;
  cancelLabel?: string;
}
export interface DialogProps {
  cancelProps?: ButtonProps;
  confirmProps?: ButtonProps;
}
export interface ConfirmOptions extends ConfirmMessageProps {
  content?: React.ReactNode;
  actionCallback?: (confirm: boolean) => void;
  dialogProps?: DialogProps;
  confirmLabel?: string;
  cancelLabel?: string;
}

export interface ConfirmProps extends ConfirmOptions {
  open: boolean;
  onConfirm: () => void;
  onDismiss: () => void;
}
