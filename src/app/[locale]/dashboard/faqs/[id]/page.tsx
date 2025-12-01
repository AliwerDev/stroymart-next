'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import PageHeader from '@/components/layout/PageHeader';
import useGetFaq from '@/hooks/endpoints/faq/useGetFaq';
import useFaqSchema from '@/hooks/schemas/useFaqSchema';
import { useRouter } from '@/i18n/navigation';
import request from '@/lib/request';
import { getErrorMessage } from '@/lib/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import FaqForm from '../_components/FaqForm';

const EditPage = () => {
    const t = useTranslations();
    const router = useRouter();
    const { id } = useParams();
    const { formSchema } = useFaqSchema();

    const { entity } = useGetFaq(id as string);

    const form = useForm({
        resolver: yupResolver(formSchema),
    });

    useEffect(() => {
        if (entity) {
            form.setValue('title_uz', entity.title_uz);
            form.setValue('title_uzk', entity.title_uzk);
            form.setValue('title_ru', entity.title_ru);
            form.setValue('title_en', entity.title_en);
            form.setValue('description_uz', entity.description_uz);
            form.setValue('description_uzk', entity.description_uzk);
            form.setValue('description_ru', entity.description_ru);
            form.setValue('description_en', entity.description_en);
        }
    }, [entity]);

    const updateMutation = useMutation({
        mutationFn: (data: any) => request.post(`/faq/update?id=${id}`, data),
        onSuccess: () => {
            toast.success(t('SUCCESSFULLY_UPDATED'));
            router.push('/dashboard/faqs');
        },
        onError: (error) => {
            toast.error(getErrorMessage(error));
        },
    });

    const onSubmit = (data: any) => {
        updateMutation.mutate(data);
    };

    return (
        <div>
            <PageHeader
                breadcrumbs={[
                    { label: t('FAQ'), href: '/dashboard/faqs' },
                    { label: t('Редактировать') },
                ]}
            />

            <FaqForm form={form} onSubmit={onSubmit} isLoading={updateMutation.isPending} mode="edit" />
        </div>
    );
};

export default EditPage;
