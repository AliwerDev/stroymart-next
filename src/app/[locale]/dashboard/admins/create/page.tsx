/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import PageHeader from '@/components/layout/PageHeader';
import useUserSchema from '@/hooks/schemas/useUserSchema';
import { useCustomMutation } from '@/hooks/useMutation';
import { useRouter } from '@/i18n/navigation';
import request from '@/lib/request';
import { getErrorMessage } from '@/lib/utils';
import { UserStatusEnum } from '@/types/enums';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import AdminForm from '../_components/AdminForm';

const CreatePage = () => {
  const t = useTranslations();
  const { formSchema } = useUserSchema();
  const router = useRouter();

  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      username: '',
      mail: '',
      fullname: '',
      phone_number: '',
      role: 'admin',
      status: String(UserStatusEnum.STATUS_ACTIVE),
    },
  });

  const createAdminMutation = useCustomMutation({
    mutationFn: (data: any) => {
      return request.post(`/user/create`, data);
    },
    onSuccess: () => {
      toast.success(t('SUCCESSFULLY_CREATED'));
      router.push('/dashboard/admins');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  const onSubmit = (data: any) => {
    data.name = data.username;
    createAdminMutation.mutate(data);
  };

  return (
    <div>
      <PageHeader
        breadcrumbs={[
          { label: t('Админы'), href: '/dashboard/admins' },
          { label: t('Добавить'), href: '/dashboard/admins/create' },
        ]}
      />

      <AdminForm
        form={form}
        onSubmit={onSubmit}
        isLoading={createAdminMutation.isPending}
        mode="create"
      />
    </div>
  );
};

export default CreatePage;
