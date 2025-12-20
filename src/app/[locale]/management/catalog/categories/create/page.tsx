'use client';
import FormLanguageTabs from '@/components/common/FormLanguageTabs';
import TranslatedTextInput from '@/components/common/TranslatedTextInput/TranslatedTextInput';
import PageHeader from '@/components/landing/PageHeader';
import { categoryApi } from '@/data/category/category.api';
import { CategoryStatusEnum, ReqCategoryCreate } from '@/data/category/category.types';
import { Language } from '@/data/common/common.types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Form, Input, InputNumber, Select, message } from 'antd';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CreateCategoryPage() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [activeLang, setActiveLang] = useState<Language>('uzl');

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: categoryApi.getAll,
  });

  const createMutation = useMutation({
    mutationFn: (data: ReqCategoryCreate) => categoryApi.create(data),
    onSuccess: () => {
      message.success(t('Category created successfully'));
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      router.push('/management/catalog/categories');
    },
    onError: () => {
      message.error(t('Failed to create category'));
    },
  });

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const payload: ReqCategoryCreate = {
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

      createMutation.mutate(payload);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const parentCategoryOptions = categories?.map((cat) => ({
    label: locale === 'uz' ? cat.name.uzl : cat.name.ru,
    value: cat.uuid,
  }));

  return (
    <div>
      <PageHeader
        breadcrumbs={[
          { label: t('Catalog'), href: '/management' },
          { label: t('Categories'), href: '/management/catalog/categories' },
          { label: t('Create') },
        ]}
      />

      <div className="mt-4 bg-white rounded-lg">
        <Form form={form} layout="vertical" initialValues={{ status: CategoryStatusEnum.ACTIVE }}>
          <FormLanguageTabs
            activeLang={activeLang}
            onLanguageChange={setActiveLang}
            className="mb-4"
          />

          <Form.Item label={t('Parent Category')} name="parentCategoryUuid">
            <Select
              size="large"
              options={parentCategoryOptions}
              placeholder={t('Select parent category')}
              allowClear
            />
          </Form.Item>

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

          <div className="grid grid-cols-3 gap-4">
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
          </div>

          <div className="flex gap-2 justify-end mt-6">
            <Button size="large" onClick={() => router.back()}>
              {t('Cancel')}
            </Button>
            <Button
              type="primary"
              size="large"
              onClick={handleSubmit}
              loading={createMutation.isPending}
            >
              {t('Create')}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
