/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Modal } from '@/components/ui/Modal';
import usePropertySchema from '@/hooks/schemas/usePropertySchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import PropertyForm from './PropertyForm';

interface PropertyModalProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
  isLoading?: boolean;
  editingProperty?: any | null;
}

const PropertyModal = ({ onClose, onSubmit, isLoading, editingProperty }: PropertyModalProps) => {
  const t = useTranslations();
  const { formSchema } = usePropertySchema();

  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      parent_id: '',
      label_uz: '',
      label_uzk: '',
      label_ru: '',
      label_en: '',
      code: '',
    },
  });

  useEffect(() => {
    if (editingProperty) {
      form.reset({
        category_id: editingProperty.category?.id,
        parent_id: editingProperty.parent_id,
        label_uz: editingProperty.label_uz,
        label_uzk: editingProperty.label_uzk,
        label_ru: editingProperty.label_ru,
        label_en: editingProperty.label_en,
        code: editingProperty.code,
      });
    } else {
      form.reset({
        label_uz: '',
        label_uzk: '',
        label_ru: '',
        label_en: '',
        code: '',
      });
    }
  }, [editingProperty, form]);

  const handleSubmit = (data: any) => {
    onSubmit(data);
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Modal
      isOpen
      onClose={handleClose}
      title={editingProperty ? t('Редактировать') : t('Добавить')}
      width="max-w-2xl"
    >
      <PropertyForm
        form={form}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        mode={editingProperty ? 'edit' : 'create'}
        handleClose={handleClose}
        id={editingProperty?.id}
      />
    </Modal>
  );
};

export default PropertyModal;
