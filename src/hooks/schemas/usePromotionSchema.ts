import { useTranslations } from 'next-intl';
import * as yup from 'yup';
import useCommonSchema from './useCommonSchema';

const usePromotionSchema = () => {
  const t = useTranslations();
  const { dateRangeSchema, imageSchema, timeRangeSchema } = useCommonSchema();

  const formSchema = yup.object({
    photo: imageSchema,
    name: yup.string().required(t('Name required')),
    description: yup.string().required(t('Description required')),
    periodDate: dateRangeSchema,
    periodTime: timeRangeSchema,
    regions: yup.array().of(yup.number()).required(t('Regions required')),
    referral_link: yup.string().url(t('Invalid url')).required(t('Link required')),
    status: yup.number().required(t('Status required')),
  });

  return {
    formSchema,
  };
};

export default usePromotionSchema;
