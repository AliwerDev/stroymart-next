'use client';

import { useConfirmModal } from '@/context/ConfirmModalContext';
import { useCallback } from 'react';

interface ConfirmOptions {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
}

export const useConfirm = () => {
  const { showConfirm, setLoading } = useConfirmModal();

  const confirm = useCallback(
    async (options: ConfirmOptions & { onConfirm: () => void | Promise<void> }) => {
      const { onConfirm, ...config } = options;

      showConfirm({
        ...config,
        onConfirm: async () => {
          setLoading(true);
          try {
            await onConfirm();
          } finally {
            setLoading(false);
          }
        },
      });
    },
    [showConfirm, setLoading]
  );

  const confirmDelete = useCallback(
    async (onConfirm: () => void | Promise<void>, options?: Omit<ConfirmOptions, 'variant'>) => {
      await confirm({
        variant: 'danger',
        title: options?.title,
        message: options?.message,
        confirmText: options?.confirmText,
        cancelText: options?.cancelText,
        onConfirm,
      });
    },
    [confirm]
  );

  const confirmAction = useCallback(
    async (onConfirm: () => void | Promise<void>, options?: Omit<ConfirmOptions, 'variant'>) => {
      await confirm({
        variant: 'warning',
        title: options?.title,
        message: options?.message,
        confirmText: options?.confirmText,
        cancelText: options?.cancelText,
        onConfirm,
      });
    },
    [confirm]
  );

  const confirmInfo = useCallback(
    async (onConfirm: () => void | Promise<void>, options?: Omit<ConfirmOptions, 'variant'>) => {
      await confirm({
        variant: 'info',
        title: options?.title || 'Confirm',
        message: options?.message || 'Are you sure?',
        confirmText: options?.confirmText || 'Confirm',
        cancelText: options?.cancelText || 'Cancel',
        onConfirm,
      });
    },
    [confirm]
  );

  return {
    confirm,
    confirmDelete,
    confirmAction,
    confirmInfo,
  };
};
