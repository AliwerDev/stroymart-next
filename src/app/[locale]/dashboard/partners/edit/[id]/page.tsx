/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import PageHeader from '@/components/layout/PageHeader';
import useGetPartner from '@/hooks/endpoints/partner/useGetPartner';
import usePartnerSchema from '@/hooks/schemas/usePartnerSchema';
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
import PartnersForm from '../../_components/PartnersForm';

const EditPage = () => {
  const t = useTranslations();
  const { formSchema } = usePartnerSchema();
  const router = useRouter();
  const { id } = useParams();

  const form = useForm({
    resolver: yupResolver(formSchema),
  });

  const { entity: partner } = useGetPartner(id as string);

  const updatePartnerMutation = useCustomMutation({
    mutationFn: (data: any) => {
      return request.post(`/partner/update?id=${id}`, data);
    },
    onSuccess: () => {
      toast.success(t('SUCCESSFULLY_UPDATED'));
      router.push('/dashboard/partners');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  const onSubmit = (data: any) => {
    data.logo_id = data.logo?.id;
    delete data.logo;
    data.icon_id = data.icon?.id;
    delete data.icon;
    updatePartnerMutation.mutate(data);
  };

  useEffect(() => {
    if (partner) {
      form.setValue('title', partner?.title);
      form.setValue('contact_person', partner?.contact_person);
      form.setValue('contact_phone', formatPhoneNumber(partner?.contact_phone));
      form.setValue('website', partner?.website);
      form.setValue('referral_website', partner?.referral_website);
      form.setValue('logo', partner?.logo);
      form.setValue('icon', partner?.icon);
    }
  }, [partner]);

  return (
    <div>
      <PageHeader
        breadcrumbs={[
          { label: t('Партнерлар'), href: '/dashboard/partners' },
          { label: t('Редактировать') },
        ]}
      />

      <PartnersForm
        form={form}
        onSubmit={onSubmit}
        isLoading={updatePartnerMutation.isPending}
        mode="edit"
      />
    </div>
  );
};

export default EditPage;
