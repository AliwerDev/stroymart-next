import PageFilter, { FilterConfig } from '@/components/common/PageFilter';
import useGetCategoryList from '@/hooks/endpoints/category/useGetCategoryList';
import { useTranslations } from 'next-intl';

const PropertiesFilter = () => {
  const t = useTranslations();
  const { selectOptions: categorySelectOptions } = useGetCategoryList({ perPage: 1000 }, false);

  const filterConfig: FilterConfig[] = [
    {
      type: 'select',
      key: 'category_id',
      placeholder: t('Выберите категорию'),
      options: categorySelectOptions,
    },
    {
      type: 'search',
      key: 'search',
      placeholder: t('Поиск'),
    },
  ];

  return <PageFilter filterConfig={filterConfig} />;
};

export default PropertiesFilter;
