import { useTranslations } from 'next-intl';
import * as yup from 'yup';
import useCommonSchema from './useCommonSchema';

const useNotificationSchema = () => {
  const t = useTranslations();
  const { imageSchema } = useCommonSchema();

  const formSchema = yup.object({
    photo: imageSchema,
    name: yup.string().required(t('Name required')),
    description: yup.string().required(t('Description required')),
    buttons: yup
      .array()
      .of(
        yup.object({
          name: yup.string().required(t('Button name required')),
          url: yup.string().required(t('Button link required')),
        })
      )
      .min(1, t('Buttons required')),
    sendDate: yup.string().required(t('Send date required')),
    sendTime: yup.string().required(t('Send time required')),
  });

  return {
    formSchema,
  };
};

export default useNotificationSchema;
