import { useTranslations } from 'next-intl';
import * as yup from 'yup';

const usePropertySchema = () => {
  const t = useTranslations();
  const formSchema = yup.object({
    category_id: yup.string().required(t('Category required')),
    parent_id: yup.string().optional(),
    label_uz: yup.string().required(t('Name required')),
    label_uzk: yup.string().required(t('Name required')),
    label_ru: yup.string().required(t('Name required')),
    label_en: yup.string().required(t('Name required')),
    code: yup.string().required(t('Code required')),
  });

  return {
    formSchema,
  };
};

export default usePropertySchema;
