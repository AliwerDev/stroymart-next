/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import FixedFooter from '@/components/common/FixedFooter';
import Paper from '@/components/common/Paper/Paper';
import Input from '@/components/fields/Input';
import Textarea from '@/components/fields/Textarea';
import Button from '@/components/ui/Button';
import { Form, FormField } from '@/components/ui/Form';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { UseFormReturn } from 'react-hook-form';

interface FaqFormProps {
    form: UseFormReturn<any>;
    onSubmit: (data: any) => void;
    isLoading?: boolean;
    mode: 'create' | 'edit';
}

const FaqForm = ({ form, onSubmit, isLoading, mode }: FaqFormProps) => {
    const t = useTranslations();

    return (
        <Form form={form}>
            <Paper className="grid grid-cols-1 md:grid-cols-2 gap-x-5 p-4 md:p-6 lg:p-[30px]">
                <FormField name="title_uz" label={t('Вопрос') + " (O'zbekcha)"} required>
                    <Input fullWidth placeholder={t('Введите вопрос')} />
                </FormField>
                <FormField name="title_uzk" label={t('Вопрос') + ' (Узбекский)'} required>
                    <Input fullWidth placeholder={t('Введите вопрос')} />
                </FormField>
                <FormField name="title_ru" label={t('Вопрос') + ' (Русский)'} required>
                    <Input fullWidth placeholder={t('Введите вопрос')} />
                </FormField>
                <FormField name="title_en" label={t('Вопрос') + ' (Английский)'} required>
                    <Input fullWidth placeholder={t('Введите вопрос')} />
                </FormField>

                <div className="md:col-span-2 border-b border-[#E5E7EB] my-5"></div>

                <FormField name="description_uz" label={t('Ответ') + " (O'zbekcha)"} required>
                    <Textarea rows={4} placeholder={t('Введите ответ')} />
                </FormField>
                <FormField name="description_uzk" label={t('Ответ') + ' (Узбекский)'} required>
                    <Textarea rows={4} placeholder={t('Введите ответ')} />
                </FormField>
                <FormField name="description_ru" label={t('Ответ') + ' (Русский)'} required>
                    <Textarea rows={4} placeholder={t('Введите ответ')} />
                </FormField>
                <FormField name="description_en" label={t('Ответ') + ' (Английский)'} required>
                    <Textarea rows={4} placeholder={t('Введите ответ')} />
                </FormField>
            </Paper>

            <FixedFooter className="flex gap-2 justify-end">
                <Link href="/dashboard/faqs">
                    <Button variant="outlined">{t('Отменить')}</Button>
                </Link>
                <Button onClick={form.handleSubmit(onSubmit)} isLoading={isLoading}>
                    {mode === 'create' ? t('Добавить') : t('Сохранить')}
                </Button>
            </FixedFooter>
        </Form>
    );
};

export default FaqForm;
