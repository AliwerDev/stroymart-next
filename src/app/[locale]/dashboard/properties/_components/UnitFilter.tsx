import PageFilter, { FilterConfig } from '@/components/common/PageFilter';
import { useTranslations } from 'next-intl';

const PropertyValuesFilter = () => {
  const t = useTranslations();
  const filterConfig: FilterConfig[] = [
    {
      type: 'search',
      key: 'search',
      placeholder: t('Поиск'),
    },
  ];

  return <PageFilter filterConfig={filterConfig} />;
};

export default PropertyValuesFilter;
