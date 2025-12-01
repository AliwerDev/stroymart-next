/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import PageHeader from '@/components/layout/PageHeader';
import usePromotionSchema from '@/hooks/schemas/usePromotionSchema';
import { useCustomMutation } from '@/hooks/useMutation';
import { useRouter } from '@/i18n/navigation';
import request from '@/lib/request';
import { getErrorMessage } from '@/lib/utils';
import { PromotionStatusEnum } from '@/types/enums';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import PromotionsForm from '../_components/PromotionsForm';

const CreatePage = () => {
  const t = useTranslations();
  const { formSchema } = usePromotionSchema();
  const router = useRouter();

  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      status: PromotionStatusEnum.STATUS_ACTIVE,
    },
  });

  const createAdminMutation = useCustomMutation({
    mutationFn: (data: any) => {
      return request.post(`/promotion/create`, data);
    },
    onSuccess: () => {
      toast.success(t('SUCCESSFULLY_CREATED'));
      router.push('/dashboard/promotions');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  const onSubmit = (data: any) => {
    data.file_id = data.photo?.id;
    data.begin_date = `${data.periodDate?.startDate} ${data.periodTime?.startTime}`;
    data.end_date = `${data.periodDate?.endDate} ${data.periodTime?.endTime}`;
    delete data.periodDate;
    delete data.periodTime;
    delete data.photo;
    createAdminMutation.mutate(data);
  };

  return (
    <div>
      <PageHeader
        breadcrumbs={[
          { label: t('Акции'), href: '/dashboard/promotions' },
          { label: t('Добавить'), href: '/dashboard/promotions/create' },
        ]}
      />

      <PromotionsForm
        form={form}
        onSubmit={onSubmit}
        isLoading={createAdminMutation.isPending}
        mode="create"
      />
    </div>
  );
};

export default CreatePage;
