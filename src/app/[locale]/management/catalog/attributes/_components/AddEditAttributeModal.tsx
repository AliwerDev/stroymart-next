'use client';
import FormLanguageTabs from '@/components/common/FormLanguageTabs';
import TranslatedTextInput from '@/components/common/TranslatedTextInput/TranslatedTextInput';
import { attributeGroupApi } from '@/data/attribute-group/attribute-group.api';
import { attributeApi } from '@/data/attribute/attribute.api';
import { ReqAttributeCreate, ReqAttributeUpdate } from '@/data/attribute/attribute.types';
import { Language } from '@/data/common/common.types';
import useGetTranslatedWord from '@/hooks/useGetTranslatedWord';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Checkbox, Form, InputNumber, Modal, Select, Spin, message } from 'antd';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

interface AddEditAttributeModalProps {
  open: boolean;
  onClose: () => void;
  attributeUuid?: string;
  defaultAttributeGroupUuid?: string;
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
  const getWord = useGetTranslatedWord();

  const isEdit = !!attributeUuid;

  const { data: attributeGroups } = useQuery({
    queryKey: ['attribute-groups'],
    queryFn: attributeGroupApi.getAll,
  });

  const { data: attributeData, isLoading: isLoadingAttribute } = useQuery({
    queryKey: ['attribute', attributeUuid],
    queryFn: () => attributeApi.getOne(attributeUuid!),
    enabled: isEdit && open,
  });

  const createMutation = useMutation({
    mutationFn: (data: ReqAttributeCreate) => attributeApi.create(data),
    onSuccess: () => {
      message.success(t('Attribute created successfully'));
      queryClient.invalidateQueries({ queryKey: ['attributes'] });
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
      queryClient.invalidateQueries({ queryKey: ['attributes'] });
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
        name_uzl: attributeData.name?.uzl,
        name_uzc: attributeData.name?.uzc,
        name_ru: attributeData.name?.ru,
        isMain: attributeData.isMain,
        orderNumber: attributeData.orderNumber,
        attributeGroupUuid: attributeData.attributeGroupUuid,
      });
    } else if (!open) {
      form.resetFields();
      if (defaultAttributeGroupUuid) {
        form.setFieldsValue({ attributeGroupUuid: defaultAttributeGroupUuid });
      }
    } else if (open && defaultAttributeGroupUuid) {
      form.setFieldsValue({ attributeGroupUuid: defaultAttributeGroupUuid });
    }
  }, [attributeData, open, form, isEdit, defaultAttributeGroupUuid]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const payload = {
        name: {
          uzl: values.name_uzl,
          uzc: values.name_uzc,
          ru: values.name_ru,
        },
        isMain: values.isMain || false,
        orderNumber: values.orderNumber || 0,
        attributeGroupUuid: values.attributeGroupUuid,
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

          <Form.Item
            label={t('Attribute Group')}
            name="attributeGroupUuid"
            rules={[{ required: true, message: t('Please select attribute group') }]}
          >
            <Select
              size="large"
              placeholder={t('Select attribute group')}
              options={attributeGroups?.data?.map((group) => ({
                label: getWord(group, 'name'),
                value: group.uuid,
              }))}
            />
          </Form.Item>

          <TranslatedTextInput
            name="name"
            label={t('Name')}
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
