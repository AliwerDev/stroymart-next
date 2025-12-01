import { useTranslations } from 'next-intl';
import * as yup from 'yup';

const useCommonSchema = () => {
  const t = useTranslations();

  const imageSchema = yup.object({
    id: yup.number().required(t('Image required')),
    path: yup.string().required(t('Image required')),
  });

  const dateRangeSchema = yup.object({
    startDate: yup.string().required(t('Start date required')),
    endDate: yup.string().required(t('End date required')),
  });

  const timeRangeSchema = yup.object({
    startTime: yup.string().required(t('Start time required')),
    endTime: yup.string().required(t('End time required')),
  });

  return {
    dateRangeSchema,
    imageSchema,
    timeRangeSchema,
  };
};

export default useCommonSchema;
