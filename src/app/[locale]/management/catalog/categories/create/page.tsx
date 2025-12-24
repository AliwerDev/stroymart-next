'use client';
import PageHeader from '@/components/landing/PageHeader';
import { categoryApi } from '@/data/category/category.api';
import { ReqCategoryCreate } from '@/data/category/category.types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Form, message } from 'antd';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import CategoryForm from '../_components/CategoryForm';

export default function CreateCategoryPage() {
  const t = useTranslations();
  const router = useRouter();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

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

  return (
    <div>
      <PageHeader
        breadcrumbs={[
          { label: t('Catalog'), href: '/management' },
          { label: t('Categories'), href: '/management/catalog/categories' },
          { label: t('Create') },
        ]}
        actions={
          <div className="flex gap-2">
            <Button onClick={() => router.back()}>{t('Cancel')}</Button>
            <Button type="primary" onClick={handleSubmit} loading={createMutation.isPending}>
              {t('Create')}
            </Button>
          </div>
        }
      />

      <div className="mt-4">
        <CategoryForm form={form} parentCategories={categories} />
      </div>
    </div>
  );
}
