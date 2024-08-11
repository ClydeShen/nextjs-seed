import { useSnackbar, VariantType } from 'notistack';
import { startTransition, useCallback } from 'react';

declare module 'notistack' {
  interface VariantOverrides {
    // removes the `warning` variant
    default: false;
    success: {
      title?: string;
    };
    error: {
      title?: string;
    };
    info: {
      title?: string;
    };
    warning: {
      title?: string;
    };
  }
}

export const useAlert = () => {
  const { enqueueSnackbar } = useSnackbar();
  const push = (
    title: string,
    message: string,
    variant: VariantType,
    persist = false
  ) => {
    startTransition(() => {
      enqueueSnackbar(message, {
        variant,
        persist,
        title,
      });
    });
  };

  const success = useCallback(
    (title: string, message: string, persist?: boolean) =>
      push(title, message, 'success', persist),
    []
  );
  const warning = useCallback(
    (title: string, message: string, persist?: boolean) =>
      push(title, message, 'warning', persist),
    []
  );
  const info = useCallback(
    (title: string, message: string, persist?: boolean) =>
      push(title, message, 'info', persist),
    []
  );
  const error = useCallback(
    (title: string, message: string, persist?: boolean) =>
      push(title, message, 'error', persist),
    []
  );
  return { success, warning, info, error };
};
