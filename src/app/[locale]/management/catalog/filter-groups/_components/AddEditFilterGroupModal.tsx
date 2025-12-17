'use client';
import FormLanguageTabs from '@/components/common/FormLanguageTabs';
import TranslatedTextInput from '@/components/common/TranslatedTextInput/TranslatedTextInput';
import { Language } from '@/data/common/common.types';
import { filterGroupApi } from '@/data/filter-group/filter-group.api';
import { ReqFilterGroupCreate, ReqFilterGroupUpdate } from '@/data/filter-group/filter-group.types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Form, InputNumber, Modal, Spin, message } from 'antd';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

interface AddEditFilterGroupModalProps {
  open: boolean;
  onClose: () => void;
  filterGroupUuid?: string;
}

const AddEditFilterGroupModal = ({
  open,
  onClose,
  filterGroupUuid,
}: AddEditFilterGroupModalProps) => {
  const t = useTranslations();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [activeLang, setActiveLang] = useState<Language>('uzl');

  const isEdit = !!filterGroupUuid;

  const { data: filterGroupData, isLoading: isLoadingFilterGroup } = useQuery({
    queryKey: ['filter-group', filterGroupUuid],
    queryFn: () => filterGroupApi.getOne(filterGroupUuid!),
    enabled: isEdit && open,
  });

  const createMutation = useMutation({
    mutationFn: (data: ReqFilterGroupCreate) => filterGroupApi.create(data),
    onSuccess: () => {
      message.success(t('Filter group created successfully'));
      queryClient.invalidateQueries({ queryKey: ['filter-groups'] });
      onClose();
      form.resetFields();
    },
    onError: () => {
      message.error(t('Failed to create filter group'));
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: ReqFilterGroupUpdate) => filterGroupApi.update(data),
    onSuccess: () => {
      message.success(t('Filter group updated successfully'));
      queryClient.invalidateQueries({ queryKey: ['filter-groups'] });
      queryClient.invalidateQueries({ queryKey: ['filter-group', filterGroupUuid] });
      onClose();
    },
    onError: () => {
      message.error(t('Failed to update filter group'));
    },
  });

  useEffect(() => {
    if (filterGroupData && open) {
      form.setFieldsValue({
        name_uzl: filterGroupData.name?.uzl,
        name_uzc: filterGroupData.name?.uzc,
        name_ru: filterGroupData.name?.ru,
        orderNumber: filterGroupData.orderNumber,
      });
    } else if (!open) {
      form.resetFields();
    }
  }, [filterGroupData, open, form, isEdit]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const payload = {
        name: {
          uzl: values.name_uzl,
          uzc: values.name_uzc,
          ru: values.name_ru,
        },
        orderNumber: values.orderNumber || 0,
      };

      if (isEdit) {
        updateMutation.mutate({ ...payload, uuid: filterGroupUuid });
      } else {
        createMutation.mutate(payload);
      }
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
    <Modal
      title={isEdit ? t('Edit Filter Group') : t('Add Filter Group')}
      open={open}
      onCancel={onClose}
      onOk={handleSubmit}
      confirmLoading={createMutation.isPending || updateMutation.isPending}
      width={800}
      okText={isEdit ? t('Update') : t('Create')}
      cancelText={t('Cancel')}
    >
      <Spin spinning={isEdit && isLoadingFilterGroup}>
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

          <Form.Item label={t('Order Number')} name="orderNumber">
            <InputNumber size="large" min={0} className="w-full!" />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};

export default AddEditFilterGroupModal;
