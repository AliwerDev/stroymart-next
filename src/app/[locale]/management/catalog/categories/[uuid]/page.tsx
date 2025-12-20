'use client';
import FormLanguageTabs from '@/components/common/FormLanguageTabs';
import TranslatedTextInput from '@/components/common/TranslatedTextInput/TranslatedTextInput';
import PageHeader from '@/components/landing/PageHeader';
import { categoryApi } from '@/data/category/category.api';
import { CategoryStatusEnum, ReqCategoryUpdate } from '@/data/category/category.types';
import { Language } from '@/data/common/common.types';
import useGetTranslatedWord from '@/hooks/useGetTranslatedWord';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Form, Input, InputNumber, Select, Spin, message } from 'antd';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface EditCategoryPageProps {
  params: {
    uuid: string;
  };
}

export default function EditCategoryPage({ params }: EditCategoryPageProps) {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const getWord = useGetTranslatedWord();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [activeLang, setActiveLang] = useState<Language>('uzl');

  const { data: categoryData, isLoading: isLoadingCategory } = useQuery({
    queryKey: ['category', params.uuid],
    queryFn: () => categoryApi.getOne(params.uuid),
  });

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: categoryApi.getAll,
  });

  const updateMutation = useMutation({
    mutationFn: (data: ReqCategoryUpdate) => categoryApi.update(data),
    onSuccess: () => {
      message.success(t('Category updated successfully'));
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['category', params.uuid] });
      router.push('/management/catalog/categories');
    },
    onError: () => {
      message.error(t('Failed to update category'));
    },
  });

  useEffect(() => {
    if (categoryData) {
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
    }
  }, [categoryData, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const payload: ReqCategoryUpdate = {
        uuid: params.uuid,
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

      updateMutation.mutate(payload);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const parentCategoryOptions = categories
    ?.filter((cat) => cat.uuid !== params.uuid)
    .map((cat) => ({
      label: locale === 'uz' ? cat.name.uzl : cat.name.ru,
      value: cat.uuid,
    }));

  if (isLoadingCategory) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        breadcrumbs={[
          { label: t('Catalog') },
          { label: t('Categories'), href: '/management/catalog/categories' },
          { label: categoryData ? getWord(categoryData, 'name') : '...' },
        ]}
      />

      <div className="mt-4 bg-white rounded-lg">
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
              <Input placeholder={t('Enter icon URL')} size="large" />
            </Form.Item>

            <Form.Item
              label={t('Banner URL')}
              name="bannerUrl"
              rules={[{ required: true, message: t('Required field') }]}
            >
              <Input placeholder={t('Enter banner URL')} size="large" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <Form.Item
              label={t('Status')}
              name="status"
              rules={[{ required: true, message: t('Required field') }]}
            >
              <Select
                size="large"
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
                size="large"
                options={parentCategoryOptions}
                placeholder={t('Select parent category')}
                allowClear
              />
            </Form.Item>
          </div>

          <div className="flex gap-2 justify-end mt-6">
            <Button size="large" onClick={() => router.back()}>
              {t('Cancel')}
            </Button>
            <Button
              type="primary"
              size="large"
              onClick={handleSubmit}
              loading={updateMutation.isPending}
            >
              {t('Update')}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
