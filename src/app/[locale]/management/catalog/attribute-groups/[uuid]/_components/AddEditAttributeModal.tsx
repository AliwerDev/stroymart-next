'use client';
import FormLanguageTabs from '@/components/common/FormLanguageTabs';
import TranslatedTextInput from '@/components/common/TranslatedTextInput/TranslatedTextInput';
import { attributeApi } from '@/data/attribute/attribute.api';
import { ReqAttributeCreate, ReqAttributeUpdate } from '@/data/attribute/attribute.types';
import { Language } from '@/data/common/common.types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Checkbox, Form, InputNumber, Modal, Spin, message } from 'antd';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

interface AddEditAttributeModalProps {
  open: boolean;
  onClose: () => void;
  attributeUuid?: string;
  defaultAttributeGroupUuid: string;
}

const AddEditAttributeModal = ({
  open,
  onClose,
  attributeUuid,
  defaultAttributeGroupUuid,
}: AddEditAttributeModalProps) => {
  const t = useTranslations();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [activeLang, setActiveLang] = useState<Language>('uzl');

  const isEdit = !!attributeUuid;

  const { data: attributeData, isLoading: isLoadingAttribute } = useQuery({
    queryKey: ['attribute', attributeUuid],
    queryFn: () => attributeApi.getOne(attributeUuid!),
    enabled: isEdit && open,
  });

  const createMutation = useMutation({
    mutationFn: (data: ReqAttributeCreate) => attributeApi.create(data),
    onSuccess: () => {
      message.success(t('Attribute created successfully'));
      queryClient.invalidateQueries({ queryKey: ['attributes', defaultAttributeGroupUuid] });
      onClose();
      form.resetFields();
    },
    onError: () => {
      message.error(t('Failed to create attribute'));
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: ReqAttributeUpdate) => attributeApi.update(data),
    onSuccess: () => {
      message.success(t('Attribute updated successfully'));
      queryClient.invalidateQueries({ queryKey: ['attributes', defaultAttributeGroupUuid] });
      queryClient.invalidateQueries({ queryKey: ['attribute', attributeUuid] });
      onClose();
    },
    onError: () => {
      message.error(t('Failed to update attribute'));
    },
  });

  useEffect(() => {
    if (attributeData && open) {
      form.setFieldsValue({
        key_uzl: attributeData.key?.uzl,
        key_uzc: attributeData.key?.uzc,
        key_ru: attributeData.key?.ru,
        isMain: attributeData.isMain,
        orderNumber: attributeData.orderNumber,
      });
    } else if (!open) {
      form.resetFields();
    }
  }, [attributeData, open, form, isEdit]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const payload = {
        key: {
          uzl: values.key_uzl,
          uzc: values.key_uzc,
          ru: values.key_ru,
        },
        isMain: values.isMain || false,
        orderNumber: values.orderNumber || 0,
        attributeGroupUuid: defaultAttributeGroupUuid,
      };

      if (isEdit) {
        updateMutation.mutate({ ...payload, uuid: attributeUuid });
      } else {
        createMutation.mutate(payload);
      }
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
    <Modal
      title={isEdit ? t('Edit Attribute') : t('Add Attribute')}
      open={open}
      onCancel={onClose}
      onOk={handleSubmit}
      confirmLoading={createMutation.isPending || updateMutation.isPending}
      width={800}
      okText={isEdit ? t('Update') : t('Create')}
      cancelText={t('Cancel')}
    >
      <Spin spinning={isEdit && isLoadingAttribute}>
        <Form form={form} layout="vertical">
          <FormLanguageTabs
            activeLang={activeLang}
            onLanguageChange={setActiveLang}
            className="mb-4"
          />

          <TranslatedTextInput
            name="key"
            label={t('Key')}
            required
            type="input"
            activeLang={activeLang}
          />

          <Form.Item name="isMain" valuePropName="checked">
            <Checkbox>{t('Is Main')}</Checkbox>
          </Form.Item>

          <Form.Item label={t('Order Number')} name="orderNumber">
            <InputNumber size="large" min={0} className="w-full!" />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};

export default AddEditAttributeModal;
