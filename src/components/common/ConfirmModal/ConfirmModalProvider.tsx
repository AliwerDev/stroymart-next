'use client';

import {
  ConfirmModalProvider as ContextProvider,
  useConfirmModal,
} from '@/context/ConfirmModalContext';
import React, { ReactNode } from 'react';
import ConfirmModal from './ConfirmModal';

interface ConfirmModalProviderProps {
  children: ReactNode;
}

const ConfirmModalRenderer: React.FC = () => {
  const { isOpen, config, hideConfirm, loading } = useConfirmModal();

  if (!config) return null;

  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={hideConfirm}
      onConfirm={config.onConfirm}
      title={config.title}
      message={config.message}
      confirmText={config.confirmText}
      cancelText={config.cancelText}
      variant={config.variant}
      loading={loading}
    />
  );
};

export const ConfirmModalProvider: React.FC<ConfirmModalProviderProps> = ({ children }) => {
  return (
    <ContextProvider>
      {children}
      <ConfirmModalRenderer />
    </ContextProvider>
  );
};
