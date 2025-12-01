'use client';

import Paper from '@/components/common/Paper/Paper';
import DotsIcon from '@/components/icons/DotsIcon';
import EyeIcon from '@/components/icons/EyeIcon';
import PageHeader from '@/components/layout/PageHeader';
import { Dropdown, DropdownItem } from '@/components/ui/Dropdown';
import Table, { Column } from '@/components/ui/Table';
import Cell from '@/components/ui/Table/components/Cell';
import Tag from '@/components/ui/Tag';
import Typography from '@/components/ui/Typography';
import useGetNewItemList from '@/hooks/endpoints/new-items/useGetNewItemList';
import useGetTranslatedWord from '@/hooks/useGetTranslatedWord';
import { useRouter } from '@/i18n/navigation';
import { getImageUrl, numberColumn } from '@/lib/utils';
import { NewItemStatusEnum } from '@/types/enums';
import get from 'lodash.get';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import NewProductsFilter from './_components/NewProductsFilter';

const Page = () => {
  const t = useTranslations();
  const { list, meta } = useGetNewItemList();
  const { getWord } = useGetTranslatedWord();
  const router = useRouter();

  const columns: Column[] = [
    numberColumn(),
    {
      key: 'name',
      accessorKey: 'name',
      header: t('Название новинки'),
    },
    {
      key: 'newItems',
      accessorKey: 'newItems',
      header: t('Товар'),
      cell: (value) => (
        <div className="flex items-center gap-4">
          <div className="w-16 h-12 rounded-lg overflow-hidden">
            <Image
              src={getImageUrl(get(value, '[0].image'))}
              alt={value}
              width={64}
              height={48}
              className="rounded-lg w-16 h-12 object-cover border border-gray-200 overflow-hidden"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Typography variant="subtitle-sm-16">{getWord(get(value, '[0]'), 'title')}</Typography>
            <Typography variant="caption-rg-14" color="text-3">
              ID {get(value, '[0].id')}
            </Typography>
          </div>
        </div>
      ),
    },
    {
      key: 'begin_date',
      accessorKey: 'begin_date',
      header: t('Дата начала'),
      cell: Cell.DateCell,
    },
    {
      key: 'end_date',
      accessorKey: 'end_date',
      header: t('Дата окончания'),
      cell: Cell.DateCell,
    },
    {
      key: 'status',
      accessorKey: 'status',
      header: t('Статус'),
      cell: (status) => (
        <Tag variant={status === NewItemStatusEnum.STATUS_ACTIVE ? 'success' : 'danger'}>
          {status === NewItemStatusEnum.STATUS_ACTIVE ? t('Активный') : t('Не активный')}
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
                href={`/dashboard/new-products/${row.id}`}
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
      <PageHeader
        breadcrumbs={[{ label: t('Новинки'), href: '/dashboard/new-products' }]}
        create="/dashboard/new-products/create"
      />

      <Paper>
        <NewProductsFilter />
        <Table
          onRowClick={(row) => {
            router.push(`/dashboard/new-products/${row.id}`);
          }}
          data={list}
          columns={columns}
          meta={meta}
        />
      </Paper>
    </div>
  );
};

export default Page;
