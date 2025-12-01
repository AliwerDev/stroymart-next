/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedFooter from '@/components/common/FixedFooter';
import Paper from '@/components/common/Paper/Paper';
import Show from '@/components/common/Show';
import DatePicker from '@/components/fields/DatePicker';
import FileUploader from '@/components/fields/FileUploader';
import Input from '@/components/fields/Input';
import TgRichText from '@/components/fields/TgRichText';
import PlusIcon from '@/components/icons/PlusIcon';
import TrashIcon from '@/components/icons/TrashIcon';
import Button from '@/components/ui/Button/Button';
import { Form, FormField } from '@/components/ui/Form';
import Typography from '@/components/ui/Typography';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { useFieldArray, UseFormReturn } from 'react-hook-form';

interface NotificationFormProps {
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  isLoading?: boolean;
  mode: 'create' | 'edit';
}

const NotificationForm = ({ form, onSubmit, isLoading, mode }: NotificationFormProps) => {
  const t = useTranslations();

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'buttons',
  });

  return (
    <Form form={form} onSubmit={onSubmit}>
      <Paper className="grid grid-cols-1 lg:grid-cols-2 gap-5 p-4 md:p-5 lg:p-[30px]">
        <div className="order-2 lg:order-1">
          <FormField name="photo" label={t('Фото')} required>
            <FileUploader height={250} />
          </FormField>
          <FormField name="description" label={t('Описание')} className="mb-0" required>
            <TgRichText />
          </FormField>
          <Typography variant="caption-rg-14" className="text-text-3">
            {t('Выделите нужный текст, чтобы добавить ссылку')}
          </Typography>
        </div>

        <div className="order-1 lg:order-2">
          <FormField name="name" label={t('Название')} required>
            <Input fullWidth placeholder={t('Введите название')} />
          </FormField>
          <div className="grid grid-cols-2 gap-2">
            <FormField name="sendDate" label={t('Дата отправки')} required>
              <DatePicker />
            </FormField>
            <FormField name="sendTime" label={t('Время отправки')} required>
              <DatePicker mode="time" placeholder="HH:mm" />
            </FormField>
          </div>
          <div>
            {fields?.map((field, index) => (
              <div key={field.id}>
                <div className="flex justify-between mt-3">
                  <Typography variant="subtitle-bl-16" className="text-1">
                    {t('Кнопка')}
                  </Typography>

                  {fields?.length <= 1 ? (
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() =>
                        append({
                          name: '',
                          url: '',
                        })
                      }
                      icon={<PlusIcon />}
                    >
                      {t('Добавить')}
                    </Button>
                  ) : (
                    <Button
                      size="small"
                      variant="danger"
                      onClick={() => remove(index)}
                      icon={<TrashIcon />}
                    >
                      {t('Удалить')}
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <FormField name={`buttons[${index}].name`} label={t('Название кнопки')} required>
                    <Input fullWidth placeholder={t('Введите название')} />
                  </FormField>
                  <FormField name={`buttons[${index}].url`} label={t('Ссылка кнопки')} required>
                    <Input fullWidth placeholder={t('Введите ссылку')} />
                  </FormField>
                </div>
              </div>
            ))}
            <Show when={fields?.length > 1}>
              <Button
                size="small"
                fullWidth
                variant="outlined"
                onClick={() =>
                  append({
                    name: '',
                    url: '',
                  })
                }
                icon={<PlusIcon />}
              >
                {t('Добавить')}
              </Button>
            </Show>
          </div>
        </div>
      </Paper>

      <FixedFooter className="flex gap-2 justify-end">
        <Link href="/dashboard/notifications">
          <Button variant="secondary">{t('Отменить')}</Button>
        </Link>
        <Button onClick={form.handleSubmit(onSubmit)} isLoading={isLoading}>
          {mode === 'create' ? t('Добавить') : t('Saqlash')}
        </Button>
      </FixedFooter>
    </Form>
  );
};

export default NotificationForm;
