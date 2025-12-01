/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import PageHeader from '@/components/layout/PageHeader';
import useGetNewItem from '@/hooks/endpoints/new-items/useGetNewItem';
import useNewProductsSchema from '@/hooks/schemas/useNewProductsSchema';
import { useCustomMutation } from '@/hooks/useMutation';
import { useRouter } from '@/i18n/navigation';
import request from '@/lib/request';
import { getErrorMessage } from '@/lib/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import NewProductsForm from '../_components/NewProductsForm';

const EditPage = () => {
  const t = useTranslations();
  const { formSchema } = useNewProductsSchema();
  const router = useRouter();
  const { id } = useParams();
  const productsAndAnalogs = useRef<{ products: any[]; analogs: any[] }>({
    products: [],
    analogs: [],
  });
  const { entity: newItem, isLoading: isNewItemLoading } = useGetNewItem(id as string);

  const form = useForm({
    resolver: yupResolver(formSchema),
  });

  const updateNewItemMutation = useCustomMutation({
    mutationFn: (data: any) => {
      return request.post(`/new-item/update?id=${id}`, data);
    },
    onSuccess: () => {
      toast.success(t('SUCCESSFULLY_UPDATED'));
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
    updateNewItemMutation.mutate(data);
  };

  useEffect(() => {
    const period = {
      startDate: newItem.begin_date,
      endDate: newItem.end_date,
    };
    if (newItem) {
      form.setValue('name', newItem.name);
      form.setValue('period', period);
    }
  }, [newItem]);

  return (
    <div>
      <PageHeader
        breadcrumbs={[
          { label: t('Новые продукты'), href: '/dashboard/new-products' },
          { label: t('Редактировать'), href: `/dashboard/new-products/${id}` },
        ]}
      />

      <NewProductsForm
        form={form}
        onSubmit={onSubmit}
        isLoading={updateNewItemMutation.isPending}
        isFetching={isNewItemLoading}
        mode="edit"
        newItemData={newItem}
        productsAndAnalogs={productsAndAnalogs}
      />
    </div>
  );
};

export default EditPage;
