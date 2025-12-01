/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedFooter from '@/components/common/FixedFooter';
import Paper from '@/components/common/Paper/Paper';
import Input from '@/components/fields/Input';
import { Select } from '@/components/fields/Select';
import Button from '@/components/ui/Button/Button';
import { Form, FormField } from '@/components/ui/Form';
import useAppConstants from '@/hooks/useAppConstants';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { UseFormReturn } from 'react-hook-form';

interface AdminFormProps {
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  isLoading?: boolean;
  mode: 'create' | 'edit';
}

const AdminForm = ({ form, onSubmit, isLoading, mode }: AdminFormProps) => {
  const t = useTranslations();
  const { roles, userStatuses } = useAppConstants();

  return (
    <Form form={form} onSubmit={onSubmit}>
      <Paper className="grid grid-cols-1 lg:grid-cols-2 gap-x-5 p-4 md:p-6 lg:p-[30px]">
        <FormField name="username" label={t('Логин')} required>
          <Input fullWidth placeholder={t('Введите логин')} />
        </FormField>
        <FormField name="mail" label={t('Эл почта')} required>
          <Input fullWidth placeholder={t('Введите эл почту')} />
        </FormField>
        <FormField name="role" label={t('Роль')} required>
          <Select placeholder={t('Введите роль')} options={roles} />
        </FormField>
        <FormField name="fullname" label={t('ФИО')} required>
          <Input fullWidth placeholder={t('Введите ФИО')} />
        </FormField>
        <FormField name="phone_number" label={t('Телефон номер ')}>
          <Input fullWidth type="phone" />
        </FormField>
        <FormField name="status" label={t('Статус')} required>
          <Select placeholder={t('Введите статус')} options={userStatuses} />
        </FormField>
      </Paper>

      <FixedFooter className="flex gap-2 justify-end">
        <Link href="/dashboard/admins">
          <Button variant="secondary">{t('Отменить')}</Button>
        </Link>
        <Button onClick={form.handleSubmit(onSubmit)} isLoading={isLoading}>
          {mode === 'create' ? t('Добавить') : t('Saqlash')}
        </Button>
      </FixedFooter>
    </Form>
  );
};

export default AdminForm;
