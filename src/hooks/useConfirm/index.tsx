'use client';

import { createContext, useCallback, useContext, useState } from 'react';
import { Confirm } from './Confirm';
import type { ConfirmMessageProps, ConfirmOptions, DialogProps } from './types';

export interface ConfirmContextValue {
  openDialog: (options: ConfirmOptions) => void;
}
export interface ConfirmContextProviderProps {
  children?: React.ReactNode;
}

const ConfirmContext = createContext<ConfirmContextValue>({
  openDialog: () => {},
});

export const ConfirmProvider = (props: ConfirmContextProviderProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogConfig, setDialogConfig] = useState<ConfirmOptions>({
    title: '',
    message: '',
  });

  const openDialog = useCallback(
    ({
      title,
      message,
      confirmLabel,
      cancelLabel,
      content,
      actionCallback,
      dialogProps,
    }: ConfirmOptions) => {
      setDialogOpen(true);
      setDialogConfig({
        title,
        message,
        confirmLabel,
        cancelLabel,
        content,
        actionCallback,
        dialogProps,
      });
    },
    []
  );
  const resetDialog = useCallback(() => {
    setDialogOpen(false);
    setDialogConfig({
      title: '',
      message: '',
    });
  }, []);

  const onConfirm = useCallback(() => {
    resetDialog();
    dialogConfig?.actionCallback?.(true);
  }, [dialogConfig, resetDialog]);

  const onDismiss = useCallback(() => {
    resetDialog();
    dialogConfig?.actionCallback?.(false);
  }, [dialogConfig, resetDialog]);
  return (
    <ConfirmContext.Provider value={{ openDialog }}>
      <Confirm
        open={dialogOpen}
        title={dialogConfig.title}
        message={dialogConfig.message}
        content={dialogConfig.content}
        onConfirm={onConfirm}
        onDismiss={onDismiss}
        dialogProps={dialogConfig.dialogProps}
        confirmLabel={dialogConfig.confirmLabel}
        cancelLabel={dialogConfig.cancelLabel}
      />
      {props.children}
    </ConfirmContext.Provider>
  );
};
export const test = 'test';
const useConfirm = () => {
  const context = useContext(ConfirmContext);
  if (!context) {
    throw new Error('useConfirm must be used within a ConfirmProvider');
  }
  const { openDialog } = context;
  const confirm = (message: ConfirmMessageProps, dialogProps?: DialogProps) => {
    return new Promise((res) => {
      openDialog?.({ actionCallback: res, dialogProps, ...message });
    });
  };
  return { confirm };
};

export default useConfirm;
