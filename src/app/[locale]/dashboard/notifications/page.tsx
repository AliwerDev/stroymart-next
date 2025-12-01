/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Paper from '@/components/common/Paper/Paper';
import Show from '@/components/common/Show';
import DotsIcon from '@/components/icons/DotsIcon';
import EyeIcon from '@/components/icons/EyeIcon';
import PencilIcon from '@/components/icons/PencilIcon';
import TrashIcon from '@/components/icons/TrashIcon';
import PageHeader from '@/components/layout/PageHeader';
import { Dropdown, DropdownItem } from '@/components/ui/Dropdown';
import Table, { Column } from '@/components/ui/Table';
import Cell from '@/components/ui/Table/components/Cell';
import Tag from '@/components/ui/Tag';
import useGetNotificationList from '@/hooks/endpoints/notification/useGetNotificationList';
import { useConfirm } from '@/hooks/useConfirm';
import request from '@/lib/request';
import { numberColumn } from '@/lib/utils';
import { NotificationStatusEnum } from '@/types/enums';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import toast from 'react-hot-toast';
import NotificationsFilter from './_components/NotificationsFilter';

const Page = () => {
  const t = useTranslations();
  const { confirmDelete } = useConfirm();
  const { list, meta, refetch } = useGetNotificationList();

  const deleteGymMutation = useMutation({
    mutationFn: (id: number) => {
      return request.post(`/notification/delete?id=${id}`);
    },
    onSuccess: () => {
      toast.success(t('SUCCESSFULLY_DELETED'));
      refetch();
    },
  });

  const statusMap: any = {
    [NotificationStatusEnum.STATUS_ACTIVE]: {
      variant: 'info',
      label: t('Активный'),
    },
    [NotificationStatusEnum.STATUS_SENT]: {
      variant: 'success',
      label: t('Отправлено'),
    },
    [NotificationStatusEnum.STATUS_SENDING]: {
      variant: 'warning',
      label: t('Отправляется'),
    },
    [NotificationStatusEnum.STATUS_FAILED]: {
      variant: 'danger',
      label: t('Неактивный'),
    },
  };

  const handleDelete = async (id: number) => {
    await confirmDelete(
      async () => {
        await deleteGymMutation.mutateAsync(id);
      },
      {
        title: t('Удалить уведомление?'),
        message: t('Вы действительно хотите удалить уведомление?'),
      }
    );
  };

  const columns: Column[] = [
    numberColumn(),
    {
      key: 'name',
      accessorKey: 'name',
      header: t('Название уведомления'),
    },
    {
      key: 'send_at',
      accessorKey: 'send_at',
      header: t('Дата и время отправления'),
      cell: Cell.DateTimeCell,
    },
    {
      key: 'user',
      accessorKey: 'user',
      header: t('Отправитель'),
      cell: (value) => {
        return value?.fullname;
      },
    },
    {
      key: 'status',
      accessorKey: 'status',
      header: t('Статус'),
      width: 120,
      cell: (status: NotificationStatusEnum) => (
        <Tag variant={statusMap[status]?.variant}>{statusMap[status]?.label}</Tag>
      ),
    },
    {
      header: t('Actions'),
      key: 'actions',
      width: 80,
      align: 'center',
      cell: (_, row) => {
        return (
          <div onClick={(e) => e.stopPropagation()}>
            <Dropdown renderButton={() => <DotsIcon />}>
              <DropdownItem
                href={`/dashboard/notifications/${row.id}`}
                icon={<EyeIcon className="w-6 h-6" />}
              >
                {t('Просмотр')}
              </DropdownItem>
              <Show when={row.status === NotificationStatusEnum.STATUS_ACTIVE}>
                <DropdownItem
                  href={`/dashboard/notifications/edit/${row.id}`}
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
              </Show>
            </Dropdown>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: t('Уведомления'), href: '/dashboard/notifications' }]}
        create="/dashboard/notifications/create"
      />

      <Paper>
        <NotificationsFilter />
        <Table data={list} columns={columns} meta={meta} />
      </Paper>
    </div>
  );
};

export default Page;
