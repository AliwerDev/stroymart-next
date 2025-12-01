/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import PageHeader from '@/components/layout/PageHeader';
import useGetNotification from '@/hooks/endpoints/notification/useGetNotification';
import useNotificationSchema from '@/hooks/schemas/useNotificationSchema';
import { useCustomMutation } from '@/hooks/useMutation';
import { useRouter } from '@/i18n/navigation';
import request from '@/lib/request';
import { formReachText, getErrorMessage, reformReachText } from '@/lib/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import NotificationForm from '../../_components/NotificationForm';

const EditPage = () => {
  const t = useTranslations();
  const { formSchema } = useNotificationSchema();
  const router = useRouter();
  const { id } = useParams();

  const form = useForm({
    resolver: yupResolver(formSchema),
  });

  const { entity: notification } = useGetNotification(id as string);

  const updateNotificationMutation = useCustomMutation({
    mutationFn: (data: any) => {
      return request.post(`/notification/update?id=${id}`, data);
    },
    onSuccess: () => {
      toast.success(t('SUCCESSFULLY_UPDATED'));
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
    updateNotificationMutation.mutate(data);
  };

  useEffect(() => {
    if (notification) {
      const [date, time] = notification?.send_at?.split(' ') || [];
      form.setValue('name', notification?.name);
      form.setValue('description', notification?.description);
      form.setValue('buttons', notification?.buttons);
      form.setValue('sendDate', date);
      form.setValue('sendTime', time?.slice(0, 5));
      form.setValue('photo', notification?.file);
      form.setValue('description', reformReachText(notification?.description));
    }
  }, [notification]);

  return (
    <div>
      <PageHeader
        breadcrumbs={[
          { label: t('Уведомления'), href: '/dashboard/notifications' },
          { label: t('Редактировать') },
        ]}
      />

      <NotificationForm
        form={form}
        onSubmit={onSubmit}
        isLoading={updateNotificationMutation.isPending}
        mode="edit"
      />
    </div>
  );
};

export default EditPage;
