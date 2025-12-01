'use client';

import Paper from '@/components/common/Paper/Paper';
import DotsIcon from '@/components/icons/DotsIcon';
import PencilIcon from '@/components/icons/PencilIcon';
import TrashIcon from '@/components/icons/TrashIcon';
import PageHeader from '@/components/layout/PageHeader';
import { Dropdown, DropdownItem } from '@/components/ui/Dropdown';
import Table, { Column } from '@/components/ui/Table';
import useGetCategoryList from '@/hooks/endpoints/category/useGetCategoryList';
import { useConfirm } from '@/hooks/useConfirm';
import useGetTranslatedWord from '@/hooks/useGetTranslatedWord';
import { useRouter } from '@/i18n/navigation';
import request from '@/lib/request';
import { getErrorMessage, getImageUrl, numberColumn } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import toast from 'react-hot-toast';
import CategoriesFilter from './_components/CategoriesFilter';

const Page = () => {
  const router = useRouter();
  const t = useTranslations();
  const { getWord } = useGetTranslatedWord();
  const { confirmDelete } = useConfirm();

  const { list, meta, refetch } = useGetCategoryList();

  const deleteCategoryMutation = useMutation({
    mutationFn: (id: number) => {
      return request.post(`/category/delete?id=${id}`);
    },
    onSuccess: () => {
      toast.success(t('SUCCESSFULLY_DELETED'));
      refetch();
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  const handleDelete = async (id: number) => {
    await confirmDelete(
      async () => {
        await deleteCategoryMutation.mutateAsync(id);
      },
      {
        title: t('Удалить категорию?'),
        message: t('Вы действительно хотите удалить категорию?'),
      }
    );
  };

  const columns: Column[] = [
    numberColumn(),
    {
      key: 'photo',
      accessorKey: 'photo',
      header: t('Фото'),
      width: 120,
      cell: (value, row) => (
        <Image
          src={getImageUrl(row.file)}
          alt={value}
          width={64}
          height={56}
          className="rounded-lg w-16 h-14 object-cover border border-gray-200 overflow-hidden"
        />
      ),
    },
    {
      key: 'title',
      accessorKey: 'title',
      header: t('Название'),
      cell: (_, row) => getWord(row, 'title'),
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
                onClick={() => router.push(`/dashboard/categories/${row.id}`)}
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
        breadcrumbs={[{ label: t('Категории'), href: '/dashboard/categories' }]}
        create={'/dashboard/categories/create'}
        addButtonText={t('Добавить категорию')}
      />

      <Paper>
        <CategoriesFilter />
        <Table
          onRowClick={(row) => router.push(`/dashboard/categories/${row.id}`)}
          data={list}
          columns={columns}
          meta={meta}
        />
      </Paper>
    </div>
  );
};

export default Page;
