/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import PageHeader from '@/components/layout/PageHeader';
import usePartnerSchema from '@/hooks/schemas/usePartnerSchema';
import { useCustomMutation } from '@/hooks/useMutation';
import { useRouter } from '@/i18n/navigation';
import request from '@/lib/request';
import { getErrorMessage } from '@/lib/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import PartnersForm from '../_components/PartnersForm';

const CreatePage = () => {
  const t = useTranslations();
  const { formSchema } = usePartnerSchema();
  const router = useRouter();

  const form = useForm({
    resolver: yupResolver(formSchema),
  });

  const createPartnerMutation = useCustomMutation({
    mutationFn: (data: any) => {
      return request.post(`/partner/create`, data);
    },
    onSuccess: () => {
      toast.success(t('SUCCESSFULLY_CREATED'));
      router.push('/dashboard/partners');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  const onSubmit = (data: any) => {
    data.logo_id = data.logo.id;
    delete data.logo;
    data.icon_id = data.icon.id;
    delete data.icon;
    createPartnerMutation.mutate(data);
  };

  return (
    <div>
      <PageHeader
        breadcrumbs={[
          { label: t('Партнеры'), href: '/dashboard/partners' },
          { label: t('Добавить'), href: '/dashboard/partners/create' },
        ]}
      />

      <PartnersForm
        form={form}
        onSubmit={onSubmit}
        isLoading={createPartnerMutation.isPending}
        mode="create"
      />
    </div>
  );
};

export default CreatePage;
