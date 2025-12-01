/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Paper from '@/components/common/Paper/Paper';
import DotsIcon from '@/components/icons/DotsIcon';
import EyeIcon from '@/components/icons/EyeIcon';
import PageHeader from '@/components/layout/PageHeader';
import { Dropdown, DropdownItem } from '@/components/ui/Dropdown';
import Table, { Column } from '@/components/ui/Table';
import Cell from '@/components/ui/Table/components/Cell';
import Tabs from '@/components/ui/Tabs/Tabs';
import Tag from '@/components/ui/Tag';
import Typography from '@/components/ui/Typography';
import useGetCategoryList from '@/hooks/endpoints/category/useGetCategoryList';
import useGetProductList from '@/hooks/endpoints/product/useGetProductList';
import useGetTranslatedWord from '@/hooks/useGetTranslatedWord';
import { Link } from '@/i18n/navigation';
import { getImageUrl, numberColumn } from '@/lib/utils';
import { ProductStatusEnum } from '@/types/enums';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const Page = () => {
  const t = useTranslations();
  const { getWord } = useGetTranslatedWord();
  const { selectOptions } = useGetCategoryList({ perPage: 100 }, false);
  const { list, meta, isLoading } = useGetProductList();

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
    {
      header: t('Amallar'),
      key: 'actions',
      width: 80,
      align: 'center',
      cell: (_, row) => {
        return (
          <div onClick={(e) => e.stopPropagation()}>
            <Dropdown renderButton={() => <DotsIcon />}>
              <DropdownItem
                href={`/dashboard/products/${row.id}`}
                icon={<EyeIcon className="w-6 h-6" />}
              >
                {t('Просмотр')}
              </DropdownItem>
            </Dropdown>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: t('Товары'), href: '/dashboard/products' }]} />

      <Paper>
        <Tabs items={selectOptions} queryKey="category_id" hidePanels />
        <Table data={list} columns={columns} meta={meta} loading={isLoading} />
      </Paper>
    </div>
  );
};

export default Page;
