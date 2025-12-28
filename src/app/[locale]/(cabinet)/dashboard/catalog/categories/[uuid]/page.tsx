'use client';
import PageHeader from '@/components/landing/PageHeader';
import { categoryApi } from '@/data/category/category.api';
import { ReqCategoryUpdate } from '@/data/category/category.types';
import useGetTranslatedWord from '@/hooks/useGetTranslatedWord';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Form, Spin, message } from 'antd';
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import CategoryForm from '../_components/CategoryForm';

export default function EditCategoryPage() {
  const params = useParams<{ uuid: string }>();
  const t = useTranslations();
  const router = useRouter();
  const getWord = useGetTranslatedWord();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

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
      router.push('/dashboard/catalog/categories');
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
          { label: t('Categories'), href: '/dashboard/catalog/categories' },
          { label: categoryData ? getWord(categoryData, 'name') : '...' },
        ]}
        actions={
          <div className="flex gap-2">
            <Button onClick={() => router.back()}>{t('Cancel')}</Button>
            <Button type="primary" onClick={handleSubmit} loading={updateMutation.isPending}>
              {t('Update')}
            </Button>
          </div>
        }
      />

      <div className="mt-4">
        <CategoryForm form={form} initialData={categoryData} parentCategories={categories} />
      </div>
    </div>
  );
}
