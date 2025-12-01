/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import PageHeader from '@/components/layout/PageHeader';
import useGetPromotion from '@/hooks/endpoints/promotion/useGetPromotion';
import usePromotionSchema from '@/hooks/schemas/usePromotionSchema';
import { useCustomMutation } from '@/hooks/useMutation';
import { useRouter } from '@/i18n/navigation';
import request from '@/lib/request';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import PromotionsForm from '../../_components/PromotionsForm';

const EditPage = () => {
  const t = useTranslations();
  const { formSchema } = usePromotionSchema();
  const router = useRouter();
  const { id } = useParams();

  const form = useForm({
    resolver: yupResolver(formSchema),
  });

  const { entity: promotion } = useGetPromotion(id as string);

  const updateAdminMutation = useCustomMutation({
    mutationFn: (data: any) => {
      return request.post(`/promotion/update?id=${id}`, data);
    },
    onSuccess: () => {
      toast.success(t('SUCCESSFULLY_UPDATED'));
      router.push('/dashboard/promotions');
    },
  });

  const onSubmit = (data: any) => {
    data.file_id = data.photo?.id;
    data.begin_date = `${data.periodDate?.startDate} ${data.periodTime?.startTime}`;
    data.end_date = `${data.periodDate?.endDate} ${data.periodTime?.endTime}`;
    delete data.periodDate;
    delete data.periodTime;
    delete data.photo;
    updateAdminMutation.mutate(data);
  };

  useEffect(() => {
    const [beginDate, beginTime] = promotion?.begin_date?.split(' ') || [];
    const [endDate, endTime] = promotion?.end_date?.split(' ') || [];

    if (promotion) {
      form.setValue('name', promotion?.name);
      form.setValue('description', promotion?.description);
      form.setValue('periodDate', {
        startDate: beginDate,
        endDate: endDate,
      });
      form.setValue('periodTime', {
        startTime: beginTime?.slice(0, 5),
        endTime: endTime?.slice(0, 5),
      });
      form.setValue(
        'regions',
        promotion?.regions?.map((region: any) => String(region.id))
      );
      form.setValue('referral_link', promotion?.referral_link);
      form.setValue('status', promotion?.status);
      form.setValue('photo', promotion?.file);
    }
  }, [promotion]);

  return (
    <div>
      <PageHeader
        breadcrumbs={[
          { label: t('Акции'), href: '/dashboard/promotions' },
          { label: t('Редактировать') },
        ]}
      />

      <PromotionsForm
        form={form}
        onSubmit={onSubmit}
        isLoading={updateAdminMutation.isPending}
        mode="edit"
      />
    </div>
  );
};

export default EditPage;
