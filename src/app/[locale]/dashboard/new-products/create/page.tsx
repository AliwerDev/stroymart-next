/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import PageHeader from '@/components/layout/PageHeader';
import useNewProductsSchema from '@/hooks/schemas/useNewProductsSchema';
import { useCustomMutation } from '@/hooks/useMutation';
import { useRouter } from '@/i18n/navigation';
import request from '@/lib/request';
import { getErrorMessage } from '@/lib/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import NewProductsForm from '../_components/NewProductsForm';

const CreatePage = () => {
  const t = useTranslations();
  const { formSchema } = useNewProductsSchema();
  const router = useRouter();
  const productsAndAnalogs = useRef<{ products: any[]; analogs: any[] }>({
    products: [],
    analogs: [],
  });

  const form = useForm({
    resolver: yupResolver(formSchema),
  });

  const createAdminMutation = useCustomMutation({
    mutationFn: (data: any) => {
      return request.post(`/new-item/create`, data);
    },
    onSuccess: () => {
      toast.success(t('SUCCESSFULLY_CREATED'));
      router.push('/dashboard/new-products');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  const onSubmit = (data: any) => {
    data.begin_date = data.period?.startDate;
    data.end_date = data.period?.endDate;
    data.new_items = productsAndAnalogs.current.products;
    data.analogs = productsAndAnalogs.current.analogs;
    delete data.period;
    createAdminMutation.mutate(data);
  };

  return (
    <div>
      <PageHeader
        breadcrumbs={[
          { label: t('Новые продукты'), href: '/dashboard/new-products' },
          { label: t('Добавить'), href: '/dashboard/new-products/create' },
        ]}
      />

      <NewProductsForm
        form={form}
        onSubmit={onSubmit}
        isLoading={createAdminMutation.isPending}
        mode="create"
        productsAndAnalogs={productsAndAnalogs}
      />
    </div>
  );
};

export default CreatePage;
