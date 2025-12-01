/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Paper from '@/components/common/Paper/Paper';
import CheckMarkIcon from '@/components/icons/CheckMarkIcon';
import PageHeader from '@/components/layout/PageHeader';
import Table, { Column } from '@/components/ui/Table';
import useGetProperty from '@/hooks/endpoints/property/useGetProperty';
import useGetUnitList from '@/hooks/endpoints/property/useGetUnitList';
import useGetTranslatedWord from '@/hooks/useGetTranslatedWord';
import { isEmpty, numberColumn } from '@/lib/utils';
import { RowSelectionState } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import PropertyValuesFilter from '../_components/UnitFilter';

const SetMainModal = dynamic(() => import('../_components/SetMainModal'), {
  ssr: false,
});

const Page = () => {
  const { id: propertyId } = useParams();
  const t = useTranslations();
  const { getWord } = useGetTranslatedWord();
  const [isOpenSetMainModal, setIsOpenSetMainModal] = useState(false);
  const [selectedRows, setSelectedRows] = useState<RowSelectionState>({});

  const { units, refetch } = useGetUnitList({ property_label_id: propertyId });
  const { entity: property } = useGetProperty(propertyId as string);

  const columns: Column[] = [
    numberColumn(),
    {
      key: 'id',
      accessorKey: 'id',
      header: t('ID'),
    },
    {
      key: 'value',
      accessorKey: 'value',
      header: t('Название'),
    },
    {
      key: 'parent',
      accessorKey: 'parent',
      header: t('Oсновное'),
      cell: (parent) => parent?.value || '-',
    },
  ];

  return (
    <div>
      <PageHeader
        breadcrumbs={[
          { label: t('Характеристики'), href: '/dashboard/properties' },
          {
            label: getWord(property, 'label'),
            href: `/dashboard/properties/${propertyId}`,
          },
        ]}
        create={() => setIsOpenSetMainModal(true)}
        addButtonProps={{
          variant: 'outlined',
          disabled: isEmpty(selectedRows),
          icon: <CheckMarkIcon />,
        }}
        addButtonText={t('Выбрать основное')}
      />

      <Paper className='pb-4'>
        <PropertyValuesFilter />
        <Table
          data={units}
          selectable
          columns={columns}
          hidePagination
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          emptyMessage={t('Значения характеристики не найдены')}
        />
      </Paper>

      {isOpenSetMainModal && (
        <SetMainModal
          onClose={() => setIsOpenSetMainModal(false)}
          onSuccess={() => {
            refetch();
            setSelectedRows({});
          }}
          units={units?.filter((_: any, index: number) => selectedRows[index])}
        />
      )}
    </div>
  );
};

export default Page;
