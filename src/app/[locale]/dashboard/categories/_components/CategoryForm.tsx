/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedFooter from '@/components/common/FixedFooter';
import Paper from '@/components/common/Paper/Paper';
import FileUploader from '@/components/fields/FileUploader';
import Input from '@/components/fields/Input';
import Button from '@/components/ui/Button';
import { Form, FormField } from '@/components/ui/Form';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { UseFormReturn } from 'react-hook-form';

interface CategoryFormProps {
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  isLoading?: boolean;
  mode: 'create' | 'edit';
}

const CategoryForm = ({ form, onSubmit, isLoading, mode }: CategoryFormProps) => {
  const t = useTranslations();
  console.log(form.formState.errors);

  return (
    <Form form={form} onSubmit={onSubmit}>
      <Paper className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-5 p-4 md:p-5 lg:p-[30px]">
        <FormField name="photo" label={t('Фото')} required>
          <FileUploader height={430} />
        </FormField>
        <div>
          <FormField name="title_uz" label={t('Название') + " (O'zbekcha)"} required>
            <Input fullWidth placeholder={t('Введите название')} />
          </FormField>
          <FormField name="title_uzk" label={t('Название') + ' (Узбекский)'} required>
            <Input fullWidth placeholder={t('Введите название')} />
          </FormField>
          <FormField name="title_ru" label={t('Название') + ' (Русский)'} required>
            <Input fullWidth placeholder={t('Введите название')} />
          </FormField>
          <FormField name="title_en" label={t('Название') + ' (English)'} required>
            <Input fullWidth placeholder={t('Введите название')} />
          </FormField>
        </div>
      </Paper>

      <FixedFooter className="flex gap-2 justify-end">
        <Link href="/dashboard/categories">
          <Button variant="secondary">{t('Отменить')}</Button>
        </Link>
        <Button onClick={form.handleSubmit(onSubmit)} isLoading={isLoading}>
          {mode === 'create' ? t('Добавить') : t('Saqlash')}
        </Button>
      </FixedFooter>
    </Form >
  );
};

export default CategoryForm;
