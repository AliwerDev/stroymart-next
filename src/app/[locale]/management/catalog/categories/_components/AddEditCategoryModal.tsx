'use client';
import FormLanguageTabs from '@/components/common/FormLanguageTabs';
import TranslatedTextInput from '@/components/common/TranslatedTextInput/TranslatedTextInput';
import { categoryApi } from '@/data/category/category.api';
import {
  CategoryStatusEnum,
  ReqCategoryCreate,
  ReqCategoryUpdate,
} from '@/data/category/category.types';
import { Language } from '@/data/common/common.types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Form, Input, InputNumber, Modal, Select, Spin, message } from 'antd';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

interface AddEditCategoryModalProps {
  open: boolean;
  onClose: () => void;
  categoryUuid?: string;
}

const AddEditCategoryModal = ({ open, onClose, categoryUuid }: AddEditCategoryModalProps) => {
  const t = useTranslations();
  const locale = useLocale();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [activeLang, setActiveLang] = useState<Language>('uzl');

  const isEdit = !!categoryUuid;

  const { data: categoryData, isLoading: isLoadingCategory } = useQuery({
    queryKey: ['category', categoryUuid],
    queryFn: () => categoryApi.getOne(categoryUuid!),
    enabled: isEdit && open,
  });

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: categoryApi.getAll,
  });

  const createMutation = useMutation({
    mutationFn: (data: ReqCategoryCreate) => categoryApi.create(data),
    onSuccess: () => {
      message.success(t('Category created successfully'));
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      onClose();
      form.resetFields();
    },
    onError: () => {
      message.error(t('Failed to create category'));
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: ReqCategoryUpdate) => categoryApi.update(data),
    onSuccess: () => {
      message.success(t('Category updated successfully'));
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['category', categoryUuid] });
      onClose();
    },
    onError: () => {
      message.error(t('Failed to update category'));
    },
  });

  useEffect(() => {
    if (categoryData && open) {
      form.setFieldsValue({
        name_uzl: categoryData.name?.uzl,
        name_uzc: categoryData.name?.uzc,
        name_ru: categoryData.name?.ru,
        description_uzl: categoryData.description?.uzl,
        description_uzc: categoryData.description?.uzc,
        description_ru: categoryData.description?.ru,
        contentDescription_uzl: categoryData.contentDescription?.uzl,
        contentDescription_uzc: categoryData.contentDescription?.uzc,
        contentDescription_ru: categoryData.contentDescription?.ru,
        ceoContent_uzl: categoryData.ceoContent?.uzl,
        ceoContent_uzc: categoryData.ceoContent?.uzc,
        ceoContent_ru: categoryData.ceoContent?.ru,
        iconUrl: categoryData.iconUrl,
        bannerUrl: categoryData.bannerUrl,
        percent: categoryData.percent,
        status: categoryData.status,
        orderNumber: categoryData.orderNumber,
        parentCategoryUuid: categoryData.parentCategoryUuid || undefined,
      });
    } else if (!open) {
      form.resetFields();
    }
  }, [categoryData, open, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const payload = {
        name: {
          uzl: values.name_uzl,
          uzc: values.name_uzc,
          ru: values.name_ru,
        },
        description: {
          uzl: values.description_uzl || '',
          uzc: values.description_uzc || '',
          ru: values.description_ru || '',
        },
        contentDescription: {
          uzl: values.contentDescription_uzl || '',
          uzc: values.contentDescription_uzc || '',
          ru: values.contentDescription_ru || '',
        },
        ceoContent: {
          uzl: values.ceoContent_uzl || '',
          uzc: values.ceoContent_uzc || '',
          ru: values.ceoContent_ru || '',
        },
        iconUrl: values.iconUrl || '',
        bannerUrl: values.bannerUrl || '',
        percent: values.percent || 0,
        status: values.status,
        orderNumber: values.orderNumber || 0,
        parentCategoryUuid: values.parentCategoryUuid || undefined,
        filterUuids: [],
      };

      if (isEdit) {
        updateMutation.mutate({ ...payload, uuid: categoryUuid });
      } else {
        createMutation.mutate(payload);
      }
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const parentCategoryOptions = categories
    ?.filter((cat) => cat.uuid !== categoryUuid)
    .map((cat) => ({
      label: locale === 'uz' ? cat.name.uzl : cat.name.ru,
      value: cat.uuid,
    }));

  return (
    <Modal
      title={isEdit ? t('Edit Category') : t('Add Category')}
      open={open}
      onCancel={onClose}
      onOk={handleSubmit}
      confirmLoading={createMutation.isPending || updateMutation.isPending}
      width={800}
      okText={isEdit ? t('Update') : t('Create')}
      cancelText={t('Cancel')}
    >
      <Spin spinning={isEdit && isLoadingCategory}>
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

          <TranslatedTextInput
            name="description"
            label={t('Description')}
            type="textarea"
            rows={3}
            activeLang={activeLang}
          />

          <TranslatedTextInput
            name="contentDescription"
            label={t('Content Description')}
            type="textarea"
            rows={3}
            activeLang={activeLang}
          />

          <TranslatedTextInput
            name="ceoContent"
            label={t('CEO Content')}
            type="textarea"
            rows={2}
            activeLang={activeLang}
          />

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label={t('Icon URL')}
              name="iconUrl"
              rules={[{ required: true, message: t('Required field') }]}
            >
              <Input placeholder={t('Enter icon URL')} />
            </Form.Item>

            <Form.Item
              label={t('Banner URL')}
              name="bannerUrl"
              rules={[{ required: true, message: t('Required field') }]}
            >
              <Input placeholder={t('Enter banner URL')} />
            </Form.Item>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <Form.Item
              label={t('Status')}
              name="status"
              rules={[{ required: true, message: t('Required field') }]}
              initialValue={CategoryStatusEnum.ACTIVE}
            >
              <Select
                options={[
                  { label: 'ACTIVE', value: CategoryStatusEnum.ACTIVE },
                  { label: 'INACTIVE', value: CategoryStatusEnum.INACTIVE },
                ]}
              />
            </Form.Item>

            <Form.Item
              label={t('Percent')}
              name="percent"
              rules={[{ required: true, message: t('Required field') }]}
            >
              <InputNumber size="large" min={0} max={100} className="w-full!" />
            </Form.Item>

            <Form.Item label={t('Order Number')} name="orderNumber">
              <InputNumber size="large" min={0} className="w-full!" />
            </Form.Item>

            <Form.Item label={t('Parent Category')} name="parentCategoryUuid">
              <Select
                options={parentCategoryOptions}
                placeholder={t('Select parent category')}
                allowClear
              />
            </Form.Item>
          </div>
        </Form>
      </Spin>
    </Modal>
  );
};

export default AddEditCategoryModal;
