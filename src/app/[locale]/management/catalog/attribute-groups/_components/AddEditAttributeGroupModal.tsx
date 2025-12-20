'use client';
import FormLanguageTabs from '@/components/common/FormLanguageTabs';
import TranslatedTextInput from '@/components/common/TranslatedTextInput/TranslatedTextInput';
import { attributeGroupApi } from '@/data/attribute-group/attribute-group.api';
import {
  ReqAttributeGroupCreate,
  ReqAttributeGroupUpdate,
} from '@/data/attribute-group/attribute-group.types';
import { Language } from '@/data/common/common.types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Form, InputNumber, Modal, Spin, message } from 'antd';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

interface AddEditAttributeGroupModalProps {
  open: boolean;
  onClose: () => void;
  attributeGroupUuid?: string;
}

const AddEditAttributeGroupModal = ({
  open,
  onClose,
  attributeGroupUuid,
}: AddEditAttributeGroupModalProps) => {
  const t = useTranslations();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [activeLang, setActiveLang] = useState<Language>('uzl');

  const isEdit = !!attributeGroupUuid;

  const { data: attributeGroupData, isLoading: isLoadingAttributeGroup } = useQuery({
    queryKey: ['attribute-group', attributeGroupUuid],
    queryFn: () => attributeGroupApi.getOne(attributeGroupUuid!),
    enabled: isEdit && open,
  });

  const createMutation = useMutation({
    mutationFn: (data: ReqAttributeGroupCreate) => attributeGroupApi.create(data),
    onSuccess: () => {
      message.success(t('Attribute group created successfully'));
      queryClient.invalidateQueries({ queryKey: ['attribute-groups'] });
      onClose();
      form.resetFields();
    },
    onError: () => {
      message.error(t('Failed to create attribute group'));
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: ReqAttributeGroupUpdate) => attributeGroupApi.update(data),
    onSuccess: () => {
      message.success(t('Attribute group updated successfully'));
      queryClient.invalidateQueries({ queryKey: ['attribute-groups'] });
      queryClient.invalidateQueries({ queryKey: ['attribute-group', attributeGroupUuid] });
      onClose();
    },
    onError: () => {
      message.error(t('Failed to update attribute group'));
    },
  });

  useEffect(() => {
    if (attributeGroupData && open) {
      form.setFieldsValue({
        name_uzl: attributeGroupData.name?.uzl,
        name_uzc: attributeGroupData.name?.uzc,
        name_ru: attributeGroupData.name?.ru,
        orderNumber: attributeGroupData.orderNumber,
      });
    } else if (!open) {
      form.resetFields();
    }
  }, [attributeGroupData, open, form, isEdit]);

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
        updateMutation.mutate({ ...payload, uuid: attributeGroupUuid });
      } else {
        createMutation.mutate(payload);
      }
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
    <Modal
      title={isEdit ? t('Edit Attribute Group') : t('Add Attribute Group')}
      open={open}
      onCancel={onClose}
      onOk={handleSubmit}
      confirmLoading={createMutation.isPending || updateMutation.isPending}
      width={800}
      okText={isEdit ? t('Update') : t('Create')}
      cancelText={t('Cancel')}
    >
      <Spin spinning={isEdit && isLoadingAttributeGroup}>
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

export default AddEditAttributeGroupModal;
