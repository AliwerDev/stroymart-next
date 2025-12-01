'use client';

import Paper from '@/components/common/Paper/Paper';
import DotsIcon from '@/components/icons/DotsIcon';
import PencilIcon from '@/components/icons/PencilIcon';
import TrashIcon from '@/components/icons/TrashIcon';
import PageHeader from '@/components/layout/PageHeader';
import { Dropdown, DropdownItem } from '@/components/ui/Dropdown';
import Table, { Column } from '@/components/ui/Table';
import useGetFaqList from '@/hooks/endpoints/faq/useGetFaqList';
import { useConfirm } from '@/hooks/useConfirm';
import useGetTranslatedWord from '@/hooks/useGetTranslatedWord';
import { useRouter } from '@/i18n/navigation';
import request from '@/lib/request';
import { getErrorMessage, numberColumn } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import toast from 'react-hot-toast';
import FaqsFilter from './_components/FaqsFilter';

const Page = () => {
  const router = useRouter();
  const t = useTranslations();
  const { getWord } = useGetTranslatedWord();
  const { confirmDelete } = useConfirm();

  const { list, refetch } = useGetFaqList();

  const deleteMutation = useMutation({
    mutationFn: (id: number) => request.post(`/faq/delete?id=${id}`),
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
        await deleteMutation.mutateAsync(id);
      },
      {
        title: t('Удалить FAQ?'),
        message: t('Вы действительно хотите удалить FAQ?'),
      }
    );
  };

  const columns: Column[] = [
    numberColumn(),
    {
      key: 'question',
      accessorKey: 'question',
      header: t('Вопрос'),
      cell: (_, row) => getWord(row, 'title'),
    },
    {
      key: 'answer',
      accessorKey: 'answer',
      header: t('Ответ'),
      cell: (_, row) => (
        <span className="max-w-[500px] truncate">{getWord(row, 'description')}</span>
      ),
    },
    {
      header: t('Действия'),
      key: 'actions',
      width: 80,
      align: 'center',
      cell: (_, row) => (
        <div onClick={(e) => e.stopPropagation()}>
          <Dropdown renderButton={() => <DotsIcon />}>
            <DropdownItem
              icon={<PencilIcon className="w-6 h-6" />}
              onClick={() => router.push(`/dashboard/faqs/${row.id}`)}
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
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: t('FAQ'), href: '/dashboard/faqs' }]}
        create={'/dashboard/faqs/create'}
        addButtonText={t('Добавить')}
      />

      <Paper className="pb-[30px]">
        <FaqsFilter />
        <Table
          onRowClick={(row) => router.push(`/dashboard/faqs/${row.id}`)}
          data={list}
          columns={columns}
          hidePagination
        />
      </Paper>
    </div>
  );
};

export default Page;
