import PageFilter, { FilterConfig } from '@/components/common/PageFilter';
import { useTranslations } from 'next-intl';

const ProductsFilter = () => {
  const t = useTranslations();

  const filterConfig: FilterConfig[] = [
    {
      type: 'date',
      key: 'date',
      placeholder: t('Дата'),
    },
    {
      type: 'select',
      key: 'status',
      placeholder: t('Статус'),
      options: [
        { value: 'published', label: t('Опубликовано') },
        { value: 'draft', label: t('Черновик') },
      ],
    },
    {
      type: 'search',
      key: 'search',
      placeholder: t('Поиск'),
    },
  ];
  return <PageFilter filterConfig={filterConfig} />;
};

export default ProductsFilter;
