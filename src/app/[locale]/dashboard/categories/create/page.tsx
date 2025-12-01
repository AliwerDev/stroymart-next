/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import PageHeader from '@/components/layout/PageHeader';
import useCategorySchema from '@/hooks/schemas/useCategorySchema';
import { useCustomMutation } from '@/hooks/useMutation';
import { useRouter } from '@/i18n/navigation';
import request from '@/lib/request';
import { getErrorMessage } from '@/lib/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import CategoryForm from '../_components/CategoryForm';

const CreatePage = () => {
  const t = useTranslations();
  const { formSchema } = useCategorySchema();
  const router = useRouter();

  const form = useForm({
    resolver: yupResolver(formSchema),
  });

  const createCategoryMutation = useCustomMutation({
    mutationFn: (data: any) => {
      return request.post(`/category/create`, data);
    },
    onSuccess: () => {
      toast.success(t('SUCCESSFULLY_CREATED'));
      router.push('/dashboard/categories');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  const onSubmit = (data: any) => {
    data.file_id = data.photo?.id;
    delete data.photo;
    createCategoryMutation.mutate(data);
  };

  return (
    <div>
      <PageHeader
        breadcrumbs={[
          { label: t('Категории'), href: '/dashboard/categories' },
          { label: t('Добавить'), href: '/dashboard/categories/create' },
        ]}
      />

      <CategoryForm
        form={form}
        onSubmit={onSubmit}
        isLoading={createCategoryMutation.isPending}
        mode="create"
      />
    </div>
  );
};

export default CreatePage;
