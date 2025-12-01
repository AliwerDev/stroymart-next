import { useTranslations } from 'next-intl';
import * as yup from 'yup';
import useCommonSchema from './useCommonSchema';

const useCategorySchema = () => {
  const t = useTranslations();
  const { imageSchema } = useCommonSchema();

  const formSchema = yup.object({
    photo: imageSchema,
    title_uz: yup.string().required(t('Title required')),
    title_uzk: yup.string().required(t('Title required')),
    title_ru: yup.string().required(t('Title required')),
    title_en: yup.string().required(t('Title required')),
  });

  return {
    formSchema,
  };
};

export default useCategorySchema;
