/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import PageHeader from '@/components/layout/PageHeader';
import useNotificationSchema from '@/hooks/schemas/useNotificationSchema';
import { useCustomMutation } from '@/hooks/useMutation';
import { useRouter } from '@/i18n/navigation';
import request from '@/lib/request';
import { formReachText, getErrorMessage } from '@/lib/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import NotificationForm from '../_components/NotificationForm';

const CreatePage = () => {
  const t = useTranslations();
  const { formSchema } = useNotificationSchema();
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      buttons: [{ name: '', url: '' }],
    },
    resolver: yupResolver(formSchema),
  });

  const createPartnerMutation = useCustomMutation({
    mutationFn: (data: any) => {
      return request.post(`/notification/create`, data);
    },
    onSuccess: () => {
      toast.success(t('SUCCESSFULLY_CREATED'));
      router.push('/dashboard/notifications');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  const onSubmit = (data: any) => {
    data.file_id = data.photo.id;
    data.send_at = `${data.sendDate} ${data.sendTime}`;
    data.description = formReachText(data.description);
    delete data.photo;
    delete data.sendDate;
    delete data.sendTime;
    createPartnerMutation.mutate(data);
  };

  return (
    <div>
      <PageHeader
        breadcrumbs={[
          { label: t('Уведомления'), href: '/dashboard/notifications' },
          { label: t('Добавить'), href: '/dashboard/notifications/create' },
        ]}
      />

      <NotificationForm
        form={form}
        onSubmit={onSubmit}
        isLoading={createPartnerMutation.isPending}
        mode="create"
      />
    </div>
  );
};

export default CreatePage;
