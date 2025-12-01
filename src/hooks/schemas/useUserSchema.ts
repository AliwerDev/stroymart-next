import { useTranslations } from 'next-intl';
import * as yup from 'yup';

const useUserSchema = () => {
  const t = useTranslations();
  const formSchema = yup.object({
    username: yup.string().required(t('Login required')),
    mail: yup.string().email(t('Invalid email')).required(t('Email required')),
    role: yup.string().required(t('Role required')),
    fullname: yup.string().required(t('Fullname required')),
    phone_number: yup.string().optional(),
    status: yup.string().required(t('Status required')),
  });

  return {
    formSchema,
  };
};

export default useUserSchema;
