'use client';
import FileUpload from '@/components/common/FileUpload';
import FormLanguageTabs from '@/components/common/FormLanguageTabs';
import TranslatedTextInput from '@/components/common/TranslatedTextInput/TranslatedTextInput';
import { Language } from '@/data/common/common.types';
import { filterApi } from '@/data/filter/filter.api';
import { ReqFilterCreate, ReqFilterUpdate } from '@/data/filter/filter.types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Form, InputNumber, Modal, Spin, message } from 'antd';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

interface AddEditFilterModalProps {
  open: boolean;
  onClose: () => void;
  filterUuid?: string;
  filterGroupUuid: string;
}

const AddEditFilterModal = ({
  open,
  onClose,
  filterUuid,
  filterGroupUuid,
}: AddEditFilterModalProps) => {
  const t = useTranslations();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [activeLang, setActiveLang] = useState<Language>('uzl');

  const isEdit = !!filterUuid;

  const { data: filterData, isLoading: isLoadingFilter } = useQuery({
    queryKey: ['filter', filterUuid],
    queryFn: () => filterApi.getOne(filterUuid!),
    enabled: isEdit && open,
  });

  const createMutation = useMutation({
    mutationFn: (data: ReqFilterCreate) => filterApi.create(data),
    onSuccess: () => {
      message.success(t('Filter created successfully'));
      queryClient.invalidateQueries({ queryKey: ['filters', filterGroupUuid] });
      onClose();
      form.resetFields();
    },
    onError: () => {
      message.error(t('Failed to create filter'));
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: ReqFilterUpdate) => filterApi.update(data),
    onSuccess: () => {
      message.success(t('Filter updated successfully'));
      queryClient.invalidateQueries({ queryKey: ['filters', filterGroupUuid] });
      queryClient.invalidateQueries({ queryKey: ['filter', filterUuid] });
      onClose();
    },
    onError: () => {
      message.error(t('Failed to update filter'));
    },
  });

  useEffect(() => {
    if (filterData && open) {
      form.setFieldsValue({
        name_uzl: filterData.name?.uzl,
        name_uzc: filterData.name?.uzc,
        name_ru: filterData.name?.ru,
        iconUrl: filterData.iconUrl,
        orderNumber: filterData.orderNumber,
      });
    } else if (!open) {
      form.resetFields();
    }
  }, [filterData, open, form, isEdit]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const payload = {
        name: {
          uzl: values.name_uzl,
          uzc: values.name_uzc,
          ru: values.name_ru,
        },
        iconUrl: values.iconUrl || '',
        orderNumber: values.orderNumber || 0,
        filterGroupUuid: filterGroupUuid,
      };

      if (isEdit) {
        updateMutation.mutate({ ...payload, uuid: filterUuid });
      } else {
        createMutation.mutate(payload);
      }
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
    <Modal
      title={isEdit ? t('Edit Filter') : t('Add Filter')}
      open={open}
      onCancel={onClose}
      onOk={handleSubmit}
      confirmLoading={createMutation.isPending || updateMutation.isPending}
      width={800}
      okText={isEdit ? t('Update') : t('Create')}
      cancelText={t('Cancel')}
    >
      <Spin spinning={isEdit && isLoadingFilter}>
        <Form form={form} layout="vertical">
          <FormLanguageTabs
            activeLang={activeLang}
            onLanguageChange={setActiveLang}
            className="mb-4"
          />

          <TranslatedTextInput
            name="name"
            label={t('Name')}
            required
            type="input"
            activeLang={activeLang}
          />

          <FileUpload
            name="iconUrl"
            label={t('Icon')}
            required
            accept="image/*"
            maxSize={2}
            listType="picture-card"
          />

          <Form.Item label={t('Order Number')} name="orderNumber">
            <InputNumber size="large" min={0} className="w-full!" />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};

export default AddEditFilterModal;
