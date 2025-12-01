/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import PageHeader from '@/components/layout/PageHeader';
import useGetAdmin from '@/hooks/endpoints/admin/useGetAdmin';
import useUserSchema from '@/hooks/schemas/useUserSchema';
import { useCustomMutation } from '@/hooks/useMutation';
import { useRouter } from '@/i18n/navigation';
import request from '@/lib/request';
import { formatPhoneNumber, getErrorMessage } from '@/lib/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import AdminForm from '../_components/AdminForm';

const EditPage = () => {
  const t = useTranslations();
  const { formSchema } = useUserSchema();
  const router = useRouter();
  const { id } = useParams();

  const form = useForm({
    resolver: yupResolver(formSchema),
  });

  const { entity: admin } = useGetAdmin(id as string);

  const updateAdminMutation = useCustomMutation({
    mutationFn: (data: any) => {
      return request.post(`/user/update?id=${id}`, data);
    },
    onSuccess: () => {
      toast.success(t('SUCCESSFULLY_UPDATED'));
      router.push('/dashboard/admins');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  const onSubmit = (data: any) => {
    updateAdminMutation.mutate(data);
  };

  useEffect(() => {
    if (admin) {
      form.setValue('username', admin?.username);
      form.setValue('mail', admin?.email);
      form.setValue('role', admin?.role);
      form.setValue('fullname', admin?.fullname);
      form.setValue('phone_number', formatPhoneNumber(admin?.phone_number));
      form.setValue('status', String(admin?.status));
    }
  }, [admin]);

  return (
    <div>
      <PageHeader
        breadcrumbs={[
          { label: t('Админы'), href: '/dashboard/admins' },
          { label: t('Редактировать') },
        ]}
      />

      <AdminForm
        form={form}
        onSubmit={onSubmit}
        isLoading={updateAdminMutation.isPending}
        mode="edit"
      />
    </div>
  );
};

export default EditPage;
