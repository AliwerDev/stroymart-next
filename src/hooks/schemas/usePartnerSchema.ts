import { useTranslations } from 'next-intl';
import * as yup from 'yup';
import useCommonSchema from './useCommonSchema';

const usePartnerSchema = () => {
  const t = useTranslations();
  const { imageSchema } = useCommonSchema();

  const formSchema = yup.object({
    title: yup.string().required(t('Title required')),
    contact_phone: yup.string().required(t('Phone required')),
    contact_person: yup.string().required(t('Contact person required')),
    website: yup.string().url(t('Invalid url')).required(t('Website required')),
    referral_website: yup.string().url(t('Invalid url')).required(t('Referral website required')),
    logo: imageSchema,
    icon: imageSchema,
  });

  return {
    formSchema,
  };
};

export default usePartnerSchema;
