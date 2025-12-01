/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import PageHeader from '@/components/layout/PageHeader';
import useFaqSchema from '@/hooks/schemas/useFaqSchema';
import { useRouter } from '@/i18n/navigation';
import request from '@/lib/request';
import { getErrorMessage } from '@/lib/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import FaqForm from '../_components/FaqForm';

const CreatePage = () => {
    const t = useTranslations();
    const { formSchema } = useFaqSchema();
    const router = useRouter();

    const form = useForm({
        defaultValues: {},
        resolver: yupResolver(formSchema),
    });

    const { mutate, isPending } = useMutation({
        mutationFn: (data: any) => request.post(`/faq/create`, data),
        onSuccess: () => {
            toast.success(t('SUCCESSFULLY_CREATED'));
            router.push('/dashboard/faqs');
        },
        onError: (error) => {
            toast.error(getErrorMessage(error));
        },
    });

    const onSubmit = (data: any) => {
        mutate(data);
    };

    return (
        <div>
            <PageHeader
                breadcrumbs={[
                    { label: t('FAQ'), href: '/dashboard/faqs' },
                    { label: t('Добавить'), href: '/dashboard/faqs/create' },
                ]}
            />

            <FaqForm form={form} onSubmit={onSubmit} isLoading={isPending} mode="create" />
        </div>
    );
};

export default CreatePage;
