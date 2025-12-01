import InfoIcon from '@/components/icons/InfoIcon';
import TrashIcon from '@/components/icons/TrashIcon';
import Button from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import Typography from '@/components/ui/Typography';
import { useTranslations } from 'next-intl';
import React from 'react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
  loading?: boolean;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  cancelText,
  variant = 'danger',
  loading = false,
}) => {
  const t = useTranslations();

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  // Default texts based on variant
  const getDefaultTexts = () => {
    switch (variant) {
      case 'danger':
        return {
          title: t('Confirm deletion'),
          message: t('Are you sure you want to delete this item?'),
          confirmText: t('Delete'),
          cancelText: t('Cancel'),
        };
      case 'warning':
        return {
          title: t('Confirm action'),
          message: t('Are you sure you want to proceed?'),
          confirmText: t('Proceed'),
          cancelText: t('Cancel'),
        };
      case 'info':
        return {
          title: t('Confirm'),
          message: t('Are you sure?'),
          confirmText: t('Confirm'),
          cancelText: t('Cancel'),
        };
      default:
        return {
          title: t('Confirm'),
          message: t('Are you sure?'),
          confirmText: t('Confirm'),
          cancelText: t('Cancel'),
        };
    }
  };

  const getIcons = () => {
    switch (variant) {
      case 'danger':
        return (
          <div className="w-20 h-20 bg-[#F8EBEB] rounded-full flex items-center justify-center">
            <TrashIcon className="w-10 h-10 text-red-500" />
          </div>
        );
      case 'warning':
        return (
          <div className="w-20 h-20 bg-[#F8EBEB] rounded-full flex items-center justify-center">
            <InfoIcon className="w-10 h-10 text-red-500" />
          </div>
        );
      case 'info':
        return (
          <div className="w-20 h-20 bg-[#F8EBEB] rounded-full flex items-center justify-center">
            <TrashIcon className="w-10 h-10 text-red-500" />
          </div>
        );
      default:
        return (
          <div className="w-20 h-20 bg-[#F8EBEB] rounded-full flex items-center justify-center">
            <TrashIcon className="w-10 h-10 text-red-500" />
          </div>
        );
    }
  };

  const defaultTexts = getDefaultTexts();

  return (
    <Modal isOpen={isOpen} onClose={handleCancel} width={480} showCloseButton={false}>
      <div className="flex flex-col gap-6">
        <div className="flex justify-center">{getIcons()}</div>

        <div className="mx-auto space-y-2 text-center">
          <Typography variant="h3-bl-24" color="text-1">
            {title || defaultTexts.title}
          </Typography>
          <Typography variant="subtitle-rg-16" color="text-3">
            {message || defaultTexts.message}
          </Typography>
        </div>

        <div className="flex gap-3 pt-6">
          <Button variant="secondary" onClick={handleCancel} fullWidth disabled={loading}>
            {cancelText || defaultTexts.cancelText}
          </Button>
          <Button variant={'primary'} onClick={handleConfirm} fullWidth disabled={loading}>
            {confirmText || defaultTexts.confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
