import PageFilter, { FilterConfig } from '@/components/common/PageFilter';
import useAppConstants from '@/hooks/useAppConstants';
import { useTranslations } from 'next-intl';

const PromotionsFilter = () => {
  const t = useTranslations();
  const { promotionStatuses } = useAppConstants();

  const filterConfig: FilterConfig[] = [
    {
      type: 'select',
      key: 'status',
      placeholder: t('Статус'),
      options: promotionStatuses,
    },
    {
      type: 'search',
      key: 'search',
      placeholder: t('Поиск'),
    },
  ];

  return <PageFilter filterConfig={filterConfig} />;
};

export default PromotionsFilter;
