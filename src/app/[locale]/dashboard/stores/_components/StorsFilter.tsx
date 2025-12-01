import PageFilter, { FilterConfig } from '@/components/common/PageFilter';
import useGetRegions from '@/hooks/endpoints/common/useGetRegions';
import { useTranslations } from 'next-intl';

const StorsFilter = () => {
  const t = useTranslations();
  const { selectOptions: regions } = useGetRegions();

  const filterConfig: FilterConfig[] = [
    {
      type: 'select',
      key: 'region_id',
      placeholder: t('Регион'),
      options: regions,
    },
    {
      type: 'search',
      key: 'search',
      placeholder: t('Поиск'),
    },
  ];

  return <PageFilter filterConfig={filterConfig} />;
};

export default StorsFilter;
