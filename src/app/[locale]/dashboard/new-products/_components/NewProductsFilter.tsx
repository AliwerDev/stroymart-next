import PageFilter, { FilterConfig } from '@/components/common/PageFilter';
import useAppConstants from '@/hooks/useAppConstants';
import { useTranslations } from 'next-intl';

const NewProductsFilter = () => {
  const t = useTranslations();
  const { newItemStatuses } = useAppConstants();

  const filterConfig: FilterConfig[] = [
    {
      type: 'date',
      key: 'date',
      placeholder: t('Дата создания'),
    },
    {
      type: 'select',
      key: 'status',
      placeholder: t('Статус'),
      options: newItemStatuses,
    },
    {
      type: 'search',
      key: 'search',
      placeholder: t('Поиск'),
    },
  ];
  return <PageFilter filterConfig={filterConfig} />;
};

export default NewProductsFilter;
