/* eslint-disable @typescript-eslint/no-explicit-any */
import PageFilter, { FilterConfig } from '@/components/common/PageFilter';
import FilterIcon from '@/components/icons/FilterIcon';
import ResetIcon from '@/components/icons/ResetIcon';
import SearchIcon from '@/components/icons/SearchIcon';
import useGetCategoryList from '@/hooks/endpoints/category/useGetCategoryList';
import useGetRegions from '@/hooks/endpoints/common/useGetRegions';
import useGetStoreList from '@/hooks/endpoints/store/useGetStoreList';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import ProductsPropertyFilters from './PropertyFiltersModal';

interface ProductsFilterProps {
  values?: any;
  onValuesChange?: (values: any) => void;
  onReset?: () => void;
}

const ProductsFilter = ({ values, onValuesChange, onReset = () => { } }: ProductsFilterProps) => {
  const t = useTranslations();
  const [isPropertyFilterOpen, setIsPropertyFilterOpen] = useState(false);
  const { selectOptions: categoryOptions } = useGetCategoryList({ perPage: 10000 }, false);
  const { selectOptions: regionOptions } = useGetRegions();
  const { selectOptions: storeOptions } = useGetStoreList(undefined, { perPage: 10000 });

  const filterConfig: FilterConfig[] = [
    {
      type: 'select',
      key: 'category_id',
      placeholder: t('Категория'),
      options: categoryOptions,
    },
    {
      type: 'select',
      key: 'region_id',
      placeholder: t('Регион'),
      options: regionOptions,
    },
    {
      type: 'text',
      inputType: 'text',
      key: 'title',
      placeholder: t('Поиск товара'),
      icon: <SearchIcon className="text-text-3" />,
    },
    {
      type: 'select',
      key: 'branch_id',
      placeholder: t('Магазин'),
      options: storeOptions,
    },
    {
      type: 'text',
      inputType: 'number',
      key: 'price',
      placeholder: t('Цена UZS'),
    },
  ];

  return (
    <>
      <PageFilter
        fillWidth
        filterConfig={filterConfig}
        values={values}
        onValuesChange={onValuesChange}
        rightContent={
          <div className="flex gap-2">
            <div
              className="text-text-1 w-11 md:w-[54px] h-11 md:h-[54px] flex items-center justify-center rounded-[10px] border border-mid-gray-1 cursor-pointer"
              onClick={() => setIsPropertyFilterOpen(!isPropertyFilterOpen)}
            >
              <FilterIcon />
            </div>
            <div
              className="text-text-1 w-11 md:w-[54px] h-11 md:h-[54px] flex items-center justify-center rounded-[10px] border border-primary-500 bg-primary-50 cursor-pointer"
              onClick={onReset}
            >
              <ResetIcon className="w-5 h-5 text-primary-500" />
            </div>
          </div>
        }
      />

      <ProductsPropertyFilters
        isOpen={isPropertyFilterOpen}
        onClose={() => setIsPropertyFilterOpen(false)}
        values={values}
        onValuesChange={onValuesChange}
      />
    </>
  );
};

export default ProductsFilter;
