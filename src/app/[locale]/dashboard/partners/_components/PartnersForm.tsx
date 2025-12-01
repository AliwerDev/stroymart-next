/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedFooter from '@/components/common/FixedFooter';
import Paper from '@/components/common/Paper/Paper';
import FileUploader from '@/components/fields/FileUploader';
import Input from '@/components/fields/Input';
import Button from '@/components/ui/Button/Button';
import { Form, FormField } from '@/components/ui/Form';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { UseFormReturn } from 'react-hook-form';

interface PartnersFormProps {
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  isLoading?: boolean;
  mode: 'create' | 'edit';
}

const PartnersForm = ({ form, onSubmit, isLoading, mode }: PartnersFormProps) => {
  const t = useTranslations();

  return (
    <Form form={form} onSubmit={onSubmit}>
      <Paper className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-5 p-4 md:p-6 lg:p-[30px]">
        <div className="order-2 md:order-1">
          <FormField name="logo" label={t('Логотип')} required>
            <FileUploader height={250} />
          </FormField>
          <FormField name="icon" label={t('Иконка')} required>
            <FileUploader height={250} />
          </FormField>
        </div>
        <div className="order-1 md:order-2">
          <FormField name="title" label={t('Название партнера')} required>
            <Input fullWidth placeholder={t('Введите название партнера')} />
          </FormField>
          <FormField name="contact_person" label={t('Контактное лицо')} required>
            <Input fullWidth placeholder={t('Введите контактное лицо')} />
          </FormField>
          <FormField name="website" label={t('Сайт партнера')} required>
            <Input fullWidth placeholder={'example.com'} />
          </FormField>
          <FormField name="referral_website" label={t('Страница с товарами LG')} required>
            <Input fullWidth placeholder={'example.com/brand/lg'} />
          </FormField>
          <FormField name="contact_phone" label={t('Телефон номер')} required>
            <Input fullWidth type="phone" />
          </FormField>
        </div>
      </Paper>

      <FixedFooter className="flex gap-2 justify-end">
        <Link href="/dashboard/partners">
          <Button variant="secondary">{t('Отменить')}</Button>
        </Link>
        <Button onClick={form.handleSubmit(onSubmit)} isLoading={isLoading}>
          {mode === 'create' ? t('Добавить') : t('Saqlash')}
        </Button>
      </FixedFooter>
    </Form>
  );
};

export default PartnersForm;
