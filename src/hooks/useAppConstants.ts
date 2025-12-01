import { NewItemStatusEnum, PromotionStatusEnum, UserStatusEnum } from '@/types/enums';
import { useTranslations } from 'next-intl';

const useAppConstants = () => {
  const t = useTranslations();
  const roles = [
    {
      value: 'admin',
      label: t('Admin'),
    },
  ];

  const userStatuses = [
    {
      value: String(UserStatusEnum.STATUS_ACTIVE),
      label: t('Активный'),
    },
    {
      value: String(UserStatusEnum.STATUS_NOT_ACTIVE),
      label: t('Неактивный'),
    },
  ];

  const promotionStatuses = [
    {
      value: String(PromotionStatusEnum.STATUS_ACTIVE),
      label: t('Активная'),
    },
    {
      value: String(PromotionStatusEnum.STATUS_INACTIVE),
      label: t('Неактивная'),
    },
  ];

  const newItemStatuses = [
    {
      value: String(NewItemStatusEnum.STATUS_ACTIVE),
      label: t('Активная'),
    },
    {
      value: String(NewItemStatusEnum.STATUS_INACTIVE),
      label: t('Неактивная'),
    },
  ];

  const propertyTypes = [
    {
      label: t('Родительскую характеристику'),
      value: '2',
    },
    {
      label: t('Характеристику'),
      value: '3',
    },
  ];

  return {
    roles,
    userStatuses,
    promotionStatuses,
    newItemStatuses,
    propertyTypes,
  };
};

export default useAppConstants;
