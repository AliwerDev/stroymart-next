/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import PageHeader from '@/components/layout/PageHeader';
import useGetCategory from '@/hooks/endpoints/category/useGetCategory';
import useCategorySchema from '@/hooks/schemas/useCategorySchema';
import { useCustomMutation } from '@/hooks/useMutation';
import { useRouter } from '@/i18n/navigation';
import request from '@/lib/request';
import { getErrorMessage } from '@/lib/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import CategoryForm from '../_components/CategoryForm';

const EditPage = () => {
  const t = useTranslations();
  const { formSchema } = useCategorySchema();
  const router = useRouter();
  const { id } = useParams();

  const form = useForm({
    resolver: yupResolver(formSchema),
  });

  const { entity: category } = useGetCategory(id as string);

  const updateCategoryMutation = useCustomMutation({
    mutationFn: (data: any) => {
      return request.post(`/category/update?id=${id}`, data);
    },
    onSuccess: () => {
      toast.success(t('SUCCESSFULLY_UPDATED'));
      router.push('/dashboard/categories');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  const onSubmit = (data: any) => {
    data.file_id = data.photo?.id;
    delete data.photo;
    updateCategoryMutation.mutate(data);
  };

  useEffect(() => {
    if (category) {
      form.setValue('photo', category?.file);
      form.setValue('title_uz', category?.title_uz);
      form.setValue('title_uzk', category?.title_uzk);
      form.setValue('title_ru', category?.title_ru);
      form.setValue('title_en', category?.title_en);
    }
  }, [category]);

  return (
    <div>
      <PageHeader
        breadcrumbs={[
          { label: t('Категории'), href: '/dashboard/categories' },
          { label: t('Редактировать') },
        ]}
      />

      <CategoryForm
        form={form}
        onSubmit={onSubmit}
        isLoading={updateCategoryMutation.isPending}
        mode="edit"
      />
    </div>
  );
};

export default EditPage;
