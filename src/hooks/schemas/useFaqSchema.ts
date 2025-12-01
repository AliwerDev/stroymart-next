import { useTranslations } from 'next-intl';
import * as yup from 'yup';

const useFaqSchema = () => {
  const t = useTranslations();

  const formSchema = yup.object({
    title_uz: yup.string().required(t('Question required')),
    title_uzk: yup.string().required(t('Question required')),
    title_ru: yup.string().required(t('Question required')),
    title_en: yup.string().required(t('Question required')),
    description_uz: yup.string().required(t('Answer required')),
    description_uzk: yup.string().required(t('Answer required')),
    description_ru: yup.string().required(t('Answer required')),
    description_en: yup.string().required(t('Answer required')),
  });

  return { formSchema };
};

export default useFaqSchema;
