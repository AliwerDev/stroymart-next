import PageFilter, { FilterConfig } from '@/components/common/PageFilter';
import { useTranslations } from 'next-intl';

const FaqsFilter = () => {
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

export default FaqsFilter;
