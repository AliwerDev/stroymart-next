/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Paper from '@/components/common/Paper/Paper';
import DotsIcon from '@/components/icons/DotsIcon';
import EyeIcon from '@/components/icons/EyeIcon';
import PencilIcon from '@/components/icons/PencilIcon';
import TrashIcon from '@/components/icons/TrashIcon';
import PageHeader from '@/components/layout/PageHeader';
import { Dropdown, DropdownItem } from '@/components/ui/Dropdown';
import Table, { Column } from '@/components/ui/Table';
import Cell from '@/components/ui/Table/components/Cell';
import Tag from '@/components/ui/Tag';
import Typography from '@/components/ui/Typography';
import useGetPromotionsList from '@/hooks/endpoints/promotion/useGetPromotionsList';
import { useConfirm } from '@/hooks/useConfirm';
import request from '@/lib/request';
import { getImageUrl, numberColumn } from '@/lib/utils';
import { PromotionStatusEnum } from '@/types/enums';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import PromotionsFilter from './_components/PromotionsFilter';

const Page = () => {
  const t = useTranslations();

  const { list, meta, isLoading, refetch } = useGetPromotionsList();

  const { confirmDelete } = useConfirm();

  const deleteGymMutation = useMutation({
    mutationFn: (id: number) => {
      return request.post(`/promotion/delete?id=${id}`);
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
        title: t('Удалить акцию?'),
        message: t('Вы действительно хотите удалить акцию?'),
      }
    );
  };

  const columns: Column[] = [
    numberColumn(),
    {
      key: 'name',
      accessorKey: 'name',
      header: t('Наименование товара'),
      width: 600,
      cell: (value, row) => (
        <div className="flex items-center gap-4">
          <div className="w-16 h-12 rounded-lg overflow-hidden">
            <Image
              src={getImageUrl(row.file)}
              alt={value}
              width={64}
              height={48}
              className="rounded-lg w-16 h-full object-cover border border-gray-200 overflow-hidden"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Typography variant="subtitle-sm-16">{value} </Typography>
            <Typography variant="caption-rg-14" color="text-3">
              ID {row.id}
            </Typography>
          </div>
        </div>
      ),
    },
    {
      key: 'begin_date',
      accessorKey: 'begin_date',
      header: t('Дата начала'),
      cell: Cell.DateTimeCell,
    },
    {
      key: 'end_date',
      accessorKey: 'end_date',
      header: t('Дата окончания'),
      cell: Cell.DateTimeCell,
    },
    {
      key: 'referral_link',
      accessorKey: 'referral_link',
      header: t('Ссылка'),
      cell: (value: any) => {
        if (!value) return '-';
        return (
          <Typography
            as={Link}
            variant="caption-rg-14"
            href={value}
            className="hover:!underline max-w-32 truncate"
          >
            {value}
          </Typography>
        );
      },
    },
    {
      key: 'status',
      accessorKey: 'status',
      header: t('Статус'),
      width: 100,
      cell: (status) => (
        <Tag variant={status === PromotionStatusEnum.STATUS_ACTIVE ? 'success' : 'danger'}>
          {status === PromotionStatusEnum.STATUS_ACTIVE ? t('Активный') : t('Не активный')}
        </Tag>
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
                href={`/dashboard/promotions/${row.id}`}
                icon={<EyeIcon className="w-6 h-6" />}
              >
                {t('Просмотр')}
              </DropdownItem>
              <DropdownItem
                href={`/dashboard/promotions/edit/${row.id}`}
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
        breadcrumbs={[{ label: t('Акции'), href: '/dashboard/promotions' }]}
        create="/dashboard/promotions/create"
      />

      <Paper>
        <PromotionsFilter />
        <Table data={list} columns={columns} meta={meta} loading={isLoading} />
      </Paper>
    </div>
  );
};

export default Page;
