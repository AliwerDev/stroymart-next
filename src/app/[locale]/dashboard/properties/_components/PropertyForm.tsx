/* eslint-disable @typescript-eslint/no-explicit-any */
import Input from '@/components/fields/Input';
import { Select } from '@/components/fields/Select';
import Button from '@/components/ui/Button';
import { Form, FormField } from '@/components/ui/Form';
import useGetCategoryList from '@/hooks/endpoints/category/useGetCategoryList';
import useGetPropertyList from '@/hooks/endpoints/property/useGetPropertyList';
import { PropertyParentEnum } from '@/types/enums';
import { useTranslations } from 'next-intl';
import { UseFormReturn } from 'react-hook-form';

interface PropertyFormProps {
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  isLoading?: boolean;
  mode: 'create' | 'edit';
  handleClose: () => void;
  id?: string;
}

const PropertyForm = ({ form, onSubmit, isLoading, mode, handleClose, id }: PropertyFormProps) => {
  const t = useTranslations();
  const { selectOptions: categorySelectOptions } = useGetCategoryList({ perPage: 1000 }, false);

  const category_id = form.watch('category_id');

  const { selectOptions: propertySelectOptions } = useGetPropertyList(
    { perPage: 100000, parent: PropertyParentEnum.WITHOUT_PARENT, category_id },
    { setParamsToFilters: false, enabled: Boolean(category_id) }
  );

  const filteredPropertySelectOptions = propertySelectOptions.filter(
    (option) => option.value !== String(id)
  );

  return (
    <Form form={form} onSubmit={onSubmit}>
      <div className="grid grid-cols-2 gap-x-5">
        <FormField name="category_id" label={t('Категория')} required>
          <Select options={categorySelectOptions} placeholder={t('Выберите категорию')} />
        </FormField>
        <FormField name="parent_id" label={t('Родительская характеристика')}>
          <Select
            options={filteredPropertySelectOptions}
            placeholder={t('Выберите родительскую характеристику')}
          />
        </FormField>
        <FormField name="label_uz" label={t('Название') + " (O'zbekcha)"} required>
          <Input fullWidth placeholder={t('Введите название')} />
        </FormField>
        <FormField name="label_uzk" label={t('Название') + ' (Узбекский)'} required>
          <Input fullWidth placeholder={t('Введите название')} />
        </FormField>
        <FormField name="label_ru" label={t('Название') + ' (Русский)'} required>
          <Input fullWidth placeholder={t('Введите название')} />
        </FormField>
        <FormField name="label_en" label={t('Название') + ' (Английский)'} required>
          <Input fullWidth placeholder={t('Введите название')} />
        </FormField>
        <FormField name="code" label={t('Код')} required>
          <Input fullWidth placeholder={t('Введите Код')} />
        </FormField>
      </div>

      <div className="flex gap-2 justify-end mt-6">
        <Button variant="secondary" onClick={handleClose}>
          {t('Отменить')}
        </Button>
        <Button type="submit" isLoading={isLoading}>
          {mode === 'create' ? t('Добавить') : t('Сохранить')}
        </Button>
      </div>
    </Form>
  );
};

export default PropertyForm;
