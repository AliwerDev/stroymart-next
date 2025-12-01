/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedFooter from '@/components/common/FixedFooter';
import Paper from '@/components/common/Paper/Paper';
import { DateRangePicker } from '@/components/fields/DatePicker';
import Input from '@/components/fields/Input';
import PlusIcon from '@/components/icons/PlusIcon';
import WarningIcon from '@/components/icons/WarningIcon';
import Button from '@/components/ui/Button/Button';
import { Form, FormField } from '@/components/ui/Form';
import Tag from '@/components/ui/Tag';
import Typography from '@/components/ui/Typography';
import useGetNewItemProductsList from '@/hooks/endpoints/new-items/useGetNewItemProductsList';
import useDebounce from '@/hooks/useDebounce';
import { Link } from '@/i18n/navigation';
import { RowSelectionState } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import ProductsFilter from './ProductsFilter';
import SelectableProductsTable from './SelectableProductsTable';
import SelectedProductsTable from './SelectedProductsTable';

interface NewProductsFormProps {
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  isLoading?: boolean;
  isFetching?: boolean;
  mode: 'create' | 'edit';
  productsAndAnalogs: any;
  newItemData?: any;
}

const NewProductsForm = ({
  form,
  onSubmit,
  isLoading,
  isFetching,
  mode,
  productsAndAnalogs,
  newItemData,
}: NewProductsFormProps) => {
  const t = useTranslations();
  const [productFilters, setProductFilters] = useState<any>({});

  const debouncedSetProductFilters = useDebounce(productFilters, 300);

  const [selected, setSelected] = useState<RowSelectionState>({});
  const [selectedIds, setSelectedIds] = useState<Record<string, boolean>>({});
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [selectedAnalogs, setSelectedAnalogs] = useState<any[]>([]);
  const hasSelected = Object.values(selected).some((value) => value);

  const { list, isLoading: isProductsLoading } = useGetNewItemProductsList(
    debouncedSetProductFilters
  );

  const products = useMemo(() => {
    return list.filter((product: any) => !selectedIds?.[product.id]);
  }, [list, selectedIds]);

  const handleAddProducts = (type: 'analogs' | 'products') => () => {
    const sp = products.filter((_: any, index: number) => selected[index]);
    const spIds = sp.reduce((acc: any, p: any) => ({ ...acc, [p?.id]: true }), {});

    if (type === 'products') {
      setSelectedProducts((s) => [...s, ...sp]);
    } else {
      setSelectedAnalogs((s) => [...s, ...sp]);
    }

    setSelectedIds((s) => ({ ...s, ...spIds }));
    setSelected({});
  };

  const handleFinish = () => {
    productsAndAnalogs.current.products = selectedProducts?.map((product: any) => product.id);
    productsAndAnalogs.current.analogs = selectedAnalogs?.map((analog: any) => analog.id);

    form.handleSubmit(onSubmit)();
  };

  const removeProduct = (type: 'products' | 'analogs') => (id: string) => {
    if (type === 'products') {
      setSelectedProducts((s) => s.filter((p) => p.id !== id));
    } else {
      setSelectedAnalogs((s) => s.filter((p) => p.id !== id));
    }
    setSelectedIds((s) => ({ ...s, [id]: false }));
  };

  const handleResetFilters = () => {
    setProductFilters({});
    setSelected({});
  };

  useEffect(() => {
    if (newItemData?.newItems || newItemData?.analogs) {
      const selectedPIds = newItemData?.newItems?.reduce(
        (acc: any, p: any) => ({ ...acc, [p.id]: true }),
        {}
      );
      const selectedAIds = newItemData?.analogs?.reduce(
        (acc: any, a: any) => ({ ...acc, [a.id]: true }),
        {}
      );

      setSelectedProducts(newItemData?.newItems);
      setSelectedAnalogs(newItemData?.analogs);
      setSelectedIds({ ...selectedPIds, ...selectedAIds });
    }
  }, [newItemData]);

  return (
    <Form form={form} onSubmit={onSubmit}>
      <Paper className="p-4 md:p-6 lg:p-[30px] space-y-4 md:space-y-5 lg:space-y-6">
        <Typography variant="body-sm-20">{t('Главный')}</Typography>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5">
          <FormField name="name" label={t('Название новинки')} required>
            <Input fullWidth placeholder={t('Введите название новинки')} />
          </FormField>
          <FormField name="period" label={t('Период')} required>
            <DateRangePicker />
          </FormField>
        </div>
      </Paper>

      <Paper>
        <div className="px-4 md:px-6 lg:px-[30px] pt-[30px]">
          <Typography variant="body-sm-20">{t('Товар')}</Typography>
        </div>
        <ProductsFilter
          values={productFilters}
          onValuesChange={setProductFilters}
          onReset={handleResetFilters}
        />
        <div className="border-t border-mid-gray-1 p-4 md:p-6 lg:p-[30px] space-y-4 md:space-y-5">
          <div className="rounded-2xl border border-mid-gray-1 overflow-hidden">
            <SelectableProductsTable
              setSelectedRows={setSelected}
              selectedRows={selected}
              products={products}
              isLoading={isProductsLoading || isFetching}
            />
            <div className="flex justify-center flex-wrap my-4 gap-2">
              <Button
                variant="secondary"
                onClick={handleAddProducts('analogs')}
                disabled={!hasSelected}
                icon={<PlusIcon />}
              >
                {t('Добавить аналоги')}
              </Button>
              <Button
                variant="primary"
                onClick={handleAddProducts('products')}
                disabled={!hasSelected}
                icon={<PlusIcon />}
              >
                {t('Добавить новинки')}
              </Button>
            </div>
          </div>
        </div>
      </Paper>

      <Paper className='p-4 md:p-6 lg:p-[30px] space-y-5'>
        <Typography variant="body-sm-20">{t('Новинки')}</Typography>

        <div className="space-y-5">
          <div className="rounded-2xl border border-mid-gray-1 overflow-hidden">
            <SelectedProductsTable
              products={selectedProducts}
              removeProduct={removeProduct('products')}
            />
          </div>
        </div>
      </Paper>

      <Paper className='p-4 md:p-6 lg:p-[30px] space-y-5'>
        <div className="flex items-center flex-wrap gap-2">
          <Typography variant="body-sm-20">{t('Аналог')}</Typography>{' '}
          <Tag variant="warning" icon={<WarningIcon />}>
            {t('Выберите товары, которые не будут показываться клиентам в Telegram-боте')}
          </Tag>
        </div>
        <div className="space-y-5">
          <div className="rounded-2xl border border-mid-gray-1 overflow-hidden">
            <SelectedProductsTable
              products={selectedAnalogs}
              removeProduct={removeProduct('analogs')}
            />
          </div>
        </div>
      </Paper>

      <FixedFooter className="flex gap-2 justify-end">
        <Link href="/dashboard/new-products">
          <Button variant="secondary">{t('Отменить')}</Button>
        </Link>
        <Button
          disabled={!Object.values(selectedIds).some((value) => value)}
          onClick={handleFinish}
          isLoading={isLoading}
        >
          {mode === 'create' ? t('Добавить') : t('Saqlash')}
        </Button>
      </FixedFooter>
    </Form>
  );
};

export default NewProductsForm;
