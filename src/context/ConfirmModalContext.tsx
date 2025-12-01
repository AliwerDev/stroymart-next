'use client';

import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react';

interface ConfirmModalConfig {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
  onConfirm: () => void | Promise<void>;
}

interface ConfirmModalContextType {
  isOpen: boolean;
  config: ConfirmModalConfig | null;
  showConfirm: (config: ConfirmModalConfig) => void;
  hideConfirm: () => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const ConfirmModalContext = createContext<ConfirmModalContextType | undefined>(undefined);

interface ConfirmModalProviderProps {
  children: ReactNode;
}

export const ConfirmModalProvider: React.FC<ConfirmModalProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<ConfirmModalConfig | null>(null);
  const [loading, setLoading] = useState(false);

  const showConfirm = useCallback((newConfig: ConfirmModalConfig) => {
    setConfig(newConfig);
    setIsOpen(true);
  }, []);

  const hideConfirm = useCallback(() => {
    setIsOpen(false);
    setConfig(null);
    setLoading(false);
  }, []);

  const value: ConfirmModalContextType = {
    isOpen,
    config,
    showConfirm,
    hideConfirm,
    loading,
    setLoading,
  };

  return <ConfirmModalContext.Provider value={value}>{children}</ConfirmModalContext.Provider>;
};

export const useConfirmModal = () => {
  const context = useContext(ConfirmModalContext);
  if (context === undefined) {
    throw new Error('useConfirmModal must be used within a ConfirmModalProvider');
  }
  return context;
};

export default ConfirmModalContext;
