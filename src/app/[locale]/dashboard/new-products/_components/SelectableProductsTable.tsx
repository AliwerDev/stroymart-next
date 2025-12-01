/* eslint-disable @typescript-eslint/no-explicit-any */

import Table, { Column } from '@/components/ui/Table';
import Cell from '@/components/ui/Table/components/Cell';
import Tag from '@/components/ui/Tag';
import Typography from '@/components/ui/Typography';
import useGetTranslatedWord from '@/hooks/useGetTranslatedWord';
import { Link } from '@/i18n/navigation';
import { getImageUrl, numberColumn } from '@/lib/utils';
import { ProductStatusEnum } from '@/types/enums';
import { RowSelectionState } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

interface SelectableProductsTableProps {
  products: any[];
  isLoading?: boolean;
  setSelectedRows?: (rows: RowSelectionState) => void;
  selectedRows?: RowSelectionState;
}

const SelectableProductsTable = ({
  products = [],
  isLoading,
  setSelectedRows,
  selectedRows,
}: SelectableProductsTableProps) => {
  const t = useTranslations();
  const { getWord } = useGetTranslatedWord();

  const columns: Column[] = [
    numberColumn(),
    {
      key: 'title',
      accessorKey: 'title',
      header: t('Наименование товара'),
      width: 600,
      cell: (value, row) => (
        <div className="flex items-center gap-4">
          <div className="w-16 h-12 rounded-lg overflow-hidden">
            <Image
              src={getImageUrl(row.image)}
              alt={value}
              width={64}
              height={48}
              className="rounded-lg w-16 h-12 object-cover border border-gray-200 overflow-hidden"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Typography
              as={Link}
              href={`/dashboard/products/${row.id}`}
              variant="subtitle-sm-16"
              className="hover:underline"
            >
              {getWord(row, 'title')}
            </Typography>
            <Typography variant="caption-rg-14" color="text-3">
              ID {row.id}{' '}
            </Typography>
          </div>
        </div>
      ),
    },
    {
      key: 'branchs',
      accessorKey: 'branchs',
      header: 'Магазин',
      cell: (value) => {
        return value?.map((branch: any) => branch.name).join(', ');
      },
    },
    {
      key: 'old_price',
      accessorKey: 'old_price',
      header: t('Старая цена'),
      cell: Cell.ExpiredMoneyCell,
    },
    {
      key: 'discount',
      accessorKey: 'price',
      header: t('Цена со скидкой'),
      cell: Cell.MoneyCell,
    },
    {
      key: 'status',
      accessorKey: 'status',
      header: t('Статус'),
      width: 100,
      cell: (status) => (
        <Tag variant={status === ProductStatusEnum.STATUS_ACTIVE ? 'success' : 'danger'}>
          {status === ProductStatusEnum.STATUS_ACTIVE ? t('Активный') : t('Неактивный')}
        </Tag>
      ),
    },
  ];

  return (
    <Table
      data={products}
      columns={columns}
      selectable
      selectedRows={selectedRows}
      setSelectedRows={setSelectedRows}
      hidePagination
      loading={isLoading}
    />
  );
};

export default SelectableProductsTable;
