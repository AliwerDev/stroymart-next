import { useTranslations } from 'next-intl';
import * as yup from 'yup';
import useCommonSchema from './useCommonSchema';

const useNewProductsSchema = () => {
  const t = useTranslations();
  const { dateRangeSchema } = useCommonSchema();

  const formSchema = yup.object({
    name: yup.string().required(t('Name required')),
    period: dateRangeSchema,
  });

  return {
    formSchema,
  };
};

export default useNewProductsSchema;
