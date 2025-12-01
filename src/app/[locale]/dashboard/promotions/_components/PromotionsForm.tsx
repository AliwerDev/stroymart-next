/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedFooter from '@/components/common/FixedFooter';
import Paper from '@/components/common/Paper/Paper';
import { DateRangePicker, TimeRangePicker } from '@/components/fields/DatePicker';
import FileUploader from '@/components/fields/FileUploader';
import Input from '@/components/fields/Input';
import { Select } from '@/components/fields/Select';
import Status from '@/components/fields/Status/Status';
import Textarea from '@/components/fields/Textarea';
import Button from '@/components/ui/Button/Button';
import { Form, FormField } from '@/components/ui/Form';
import useGetRegions from '@/hooks/endpoints/common/useGetRegions';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { UseFormReturn } from 'react-hook-form';

interface PromotionsFormProps {
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  isLoading?: boolean;
  mode: 'create' | 'edit';
}

const PromotionsForm = ({ form, onSubmit, isLoading, mode }: PromotionsFormProps) => {
  const t = useTranslations();
  const { selectOptions: regions } = useGetRegions();

  return (
    <Form form={form} onSubmit={onSubmit}>
      <Paper className="p-4 md:p-6 lg:p-[30px] space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2  gap-5">
          <div className="space-y-5 order-2 lg:order-1">
            <FormField name="photo" label={t('Фото')} required>
              <FileUploader height={254} />
            </FormField>
            <FormField name="description" label={t('Описание')} required>
              <Textarea placeholder={t('Введите описание')} rows={5} />
            </FormField>
          </div>
          <div className="space-y-5 order-1 lg:order-2">
            <FormField name="name" label={t('Названиеs акции')} required>
              <Input fullWidth placeholder={t('Введите название акции')} />
            </FormField>
            <FormField name="periodDate" label={t('Период дни')} required>
              <DateRangePicker />
            </FormField>
            <FormField name="periodTime" label={t('Период время')} required>
              <TimeRangePicker />
            </FormField>
            <FormField name="regions" label={t('Регион/ы')} required>
              <Select placeholder={t('Введите регионы')} options={regions} multiple />
            </FormField>
            <FormField name="referral_link" label={t('Ссылка')} required>
              <Input fullWidth placeholder={'example.com'} />
            </FormField>
            <FormField name="status" label={t('Статус')} required>
              <Status />
            </FormField>
          </div>
        </div>
      </Paper>

      <FixedFooter className="flex gap-2 justify-end">
        <Link href="/dashboard/promotions">
          <Button variant="secondary">{t('Отменить')}</Button>
        </Link>
        <Button onClick={form.handleSubmit(onSubmit)} isLoading={isLoading}>
          {mode === 'create' ? t('Добавить') : t('Saqlash')}
        </Button>
      </FixedFooter>
    </Form>
  );
};

export default PromotionsForm;
