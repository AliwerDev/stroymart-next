/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Paper from '@/components/common/Paper/Paper';
import DotsIcon from '@/components/icons/DotsIcon';
import PencilIcon from '@/components/icons/PencilIcon';
import TrashIcon from '@/components/icons/TrashIcon';
import PageHeader from '@/components/layout/PageHeader';
import { Dropdown, DropdownItem } from '@/components/ui/Dropdown';
import Table, { Column } from '@/components/ui/Table';
import useGetPropertyList from '@/hooks/endpoints/property/useGetPropertyList';
import { useConfirm } from '@/hooks/useConfirm';
import useGetTranslatedWord from '@/hooks/useGetTranslatedWord';
import { Link } from '@/i18n/navigation';
import request from '@/lib/request';
import { getErrorMessage, numberColumn } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import toast from 'react-hot-toast';
import PropertiesFilter from './_components/PropertiesFilter';
import PropertyModal from './_components/PropertyModal';

interface Property {
  id: number;
  title: string;
  code: string;
}

const Page = () => {
  const t = useTranslations();
  const { getWord } = useGetTranslatedWord();
  const { confirmDelete } = useConfirm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  const { list, meta, refetch, isLoading, isRefetching, isFetching } = useGetPropertyList();

  const saveCategoryMutation = useMutation({
    mutationFn: (data: any) => {
      if (editingProperty) {
        return request.post(`/property-label/update?id=${editingProperty.id}`, data);
      } else {
        return request.post('/property-label/create', data);
      }
    },
    onSuccess: () => {
      toast.success(editingProperty ? t('SUCCESSFULLY_UPDATED') : t('SUCCESSFULLY_CREATED'));
      refetch();
      handleCloseModal();
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: (id: number) => {
      return request.post(`/property-label/delete?id=${id}`);
    },
    onSuccess: () => {
      toast.success(t('SUCCESSFULLY_DELETED'));
      refetch();
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  const handleOpenModal = (property?: Property) => {
    setEditingProperty(property || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProperty(null);
  };

  const handleSubmit = (data: any) => {
    saveCategoryMutation.mutate(data);
  };

  const handleDelete = async (id: number) => {
    await confirmDelete(
      async () => {
        await deleteCategoryMutation.mutateAsync(id);
      },
      {
        title: t('Удалить характеристику?'),
        message: t('Вы действительно хотите удалить характеристику?'),
      }
    );
  };

  const columns: Column[] = [
    numberColumn(),
    {
      key: 'label',
      accessorKey: 'label',
      header: t('Название'),
      cell: (_, row) => (
        <Link className="underline text-primary-500" href={`/dashboard/properties/${row.id}`}>
          {getWord(row, 'label')}
        </Link>
      ),
    },
    {
      key: 'code',
      accessorKey: 'code',
      header: t('Код'),
    },
    {
      key: 'category',
      accessorKey: 'category',
      header: t('Категория'),
      cell: (value) => getWord(value, 'title'),
    },
    {
      key: 'parent',
      accessorKey: 'parent',
      header: t('Родительская характеристика'),
      cell: (value) => getWord(value, 'label') || '-',
    },
    {
      key: 'count',
      accessorKey: 'count',
      header: t('Количество значений'),
      cell: (value) => value || '0',
    },
    {
      header: t('Действия'),
      key: 'actions',
      width: 80,
      align: 'center',
      cell: (_, row) => {
        return (
          <div onClick={(e) => e.stopPropagation()}>
            <Dropdown renderButton={() => <DotsIcon />}>
              <DropdownItem
                icon={<PencilIcon className="w-6 h-6" />}
                onClick={() => handleOpenModal(row)}
              >
                {t('Редактировать')}
              </DropdownItem>
              <DropdownItem
                variant="danger"
                icon={<TrashIcon className="w-6 h-6" />}
                onClick={() => handleDelete(row.id)}
              >
                {t('Удалить')}
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
        breadcrumbs={[{ label: t('Характеристики'), href: '/dashboard/properties' }]}
        create={() => handleOpenModal()}
        addButtonText={t('Добавить')}
      />

      <Paper>
        <PropertiesFilter />
        <Table
          data={list}
          columns={columns}
          meta={meta}
          loading={isLoading || isRefetching || isFetching}
          emptyMessage={t('Характеристики не найдены')}
        />
      </Paper>

      {isModalOpen && (
        <PropertyModal
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          isLoading={saveCategoryMutation.isPending}
          editingProperty={editingProperty}
        />
      )}
    </div>
  );
};

export default Page;
