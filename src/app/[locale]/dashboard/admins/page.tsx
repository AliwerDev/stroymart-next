'use client';

import Paper from '@/components/common/Paper/Paper';
import DotsIcon from '@/components/icons/DotsIcon';
import PencilIcon from '@/components/icons/PencilIcon';
import TrashIcon from '@/components/icons/TrashIcon';
import PageHeader from '@/components/layout/PageHeader';
import { Dropdown, DropdownItem } from '@/components/ui/Dropdown';
import Table, { Column } from '@/components/ui/Table';
import Cell from '@/components/ui/Table/components/Cell';
import Tag from '@/components/ui/Tag';
import Typography from '@/components/ui/Typography';
import useGetAdminList from '@/hooks/endpoints/admin/useGetAdminList';
import { useConfirm } from '@/hooks/useConfirm';
import request from '@/lib/request';
import { UserStatusEnum } from '@/types/enums';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import toast from 'react-hot-toast';
import AdminsFilter from '../admins/_components/AdminsFilter';

const Page = () => {
  const t = useTranslations();
  const { confirmDelete } = useConfirm();
  const { list, meta, refetch } = useGetAdminList();

  const deleteGymMutation = useMutation({
    mutationFn: (id: number) => {
      return request.post(`/user/delete?id=${id}`);
    },
    onSuccess: () => {
      toast.success(t('SUCCESSFULLY_DELETED'));
      refetch();
    },
  });

  const handleDelete = async (id: number) => {
    await confirmDelete(
      async () => {
        await deleteGymMutation.mutateAsync(id);
      },
      {
        title: t('Удалить админа?'),
        message: t('Вы действительно хотите удалить админа?'),
      }
    );
  };

  const columns: Column[] = [
    {
      key: 'fullname',
      accessorKey: 'fullname',
      header: t('Админ'),
      cell: (value, row) => (
        <div className="flex flex-col gap-1">
          <Typography variant="subtitle-sm-16">{value} </Typography>
          <Typography variant="caption-rg-14" color="text-3">
            ID {row.id}{' '}
          </Typography>
        </div>
      ),
    },
    {
      key: 'phone_number',
      accessorKey: 'phone_number',
      header: t('Номер телефона'),
      cell: Cell.PhoneNumberCell,
    },
    {
      key: 'username',
      accessorKey: 'username',
      header: t('Логин/Эл-почта'),
      cell: (value, row) => (
        <div className="flex flex-col gap-1">
          <Typography variant="caption-rg-14">{value || '-'}</Typography>
          <Typography variant="caption-rg-14">{row.email || '-'}</Typography>
        </div>
      ),
    },
    {
      key: 'role',
      accessorKey: 'role',
      header: t('Доступ'),
      cell: (value: string) => (
        <Typography className="capitalize" variant="caption-rg-14">
          {value}
        </Typography>
      ),
    },
    {
      key: 'register_date',
      accessorKey: 'register_date',
      header: t('Дата регистрации'),
      cell: Cell.DateCell,
    },
    {
      key: 'status',
      accessorKey: 'status',
      header: t('Статус'),
      width: 120,
      cell: (status: UserStatusEnum) => (
        <Tag variant={status === UserStatusEnum.STATUS_ACTIVE ? 'success' : 'danger'}>
          {status === UserStatusEnum.STATUS_ACTIVE ? t('Активный') : t('Неактивный')}
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
                href={`/dashboard/admins/${row.id}`}
                icon={<PencilIcon className="w-6 h-6" />}
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
        breadcrumbs={[{ label: t('Админы'), href: '/dashboard/admins' }]}
        create="/dashboard/admins/create"
      />

      <Paper>
        <AdminsFilter />
        <Table data={list} columns={columns} meta={meta} />
      </Paper>
    </div>
  );
};

export default Page;
