'use client';

import { PencilIcon } from '@/components/icons';
import PageHeader from '@/components/landing/PageHeader';
import { sellerApi } from '@/data/seller/seller.api';
import { ResSellerOne, SellerStatusEnum } from '@/data/seller/seller.types';
import { useGetPageableData } from '@/hooks/useGetPageableData';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Modal, Table, Tag, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

export default function SellersPage() {
  const t = useTranslations();
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    data: sellers,
    isLoading,
    tablePagination,
  } = useGetPageableData<ResSellerOne>({
    queryKey: (params) => ['sellers', params],
    queryFn: (params) => sellerApi.getAll(params),
    initialPage: 0,
    initialPageSize: 10,
  });

  const updateMutation = useMutation({
    mutationFn: ({ uuid, data }: { uuid: string; data: Partial<ResSellerOne> }) =>
      sellerApi.update(uuid, data),
    onSuccess: () => {
      message.success(t('Seller updated successfully'));
      queryClient.invalidateQueries({ queryKey: ['sellers'] });
    },
    onError: () => {
      message.error(t('Failed to update seller'));
    },
  });

  const handleStatusChange = (uuid: string, currentStatus: SellerStatusEnum) => {
    const newStatus =
      currentStatus === SellerStatusEnum.ACTIVE
        ? SellerStatusEnum.INACTIVE
        : SellerStatusEnum.ACTIVE;

    Modal.confirm({
      title: t('Change Status'),
      content: t('Are you sure you want to change the status of this seller?'),
      okText: t('Confirm'),
      cancelText: t('Cancel'),
      okButtonProps: {
        loading: updateMutation.isPending,
      },
      onOk: () => {
        updateMutation.mutate({
          uuid,
          data: { userStatus: newStatus },
        });
      },
    });
  };

  const columns: ColumnsType<ResSellerOne> = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index',
      align: 'center',
      width: 80,
      render: (_, __, index) => index + 1,
    },
    {
      title: t('Company Name'),
      dataIndex: 'companyName',
      key: 'companyName',
      render: (companyName: string) => companyName || '-',
    },
    {
      title: t('Full Name'),
      dataIndex: 'fullName',
      key: 'fullName',
      render: (fullName: string) => fullName || '-',
    },
    {
      title: t('Phone'),
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: 150,
      render: (phone: string) => phone || '-',
    },
    {
      title: t('INN'),
      dataIndex: 'inn',
      key: 'inn',
      width: 120,
      render: (inn: string) => inn || '-',
    },
    {
      title: t('Status'),
      dataIndex: 'userStatus',
      key: 'userStatus',
      width: 120,
      align: 'center',
      render: (status: SellerStatusEnum) => {
        const colorMap = {
          [SellerStatusEnum.ACTIVE]: 'green',
          [SellerStatusEnum.INACTIVE]: 'orange',
          [SellerStatusEnum.BLOCKED]: 'red',
        };
        return <Tag color={colorMap[status]}>{status}</Tag>;
      },
    },
    {
      title: t('NDS'),
      dataIndex: 'nds',
      key: 'nds',
      width: 80,
      align: 'center',
      render: (nds: boolean) => (nds ? '✓' : '✗'),
    },
    {
      title: t('YATT'),
      dataIndex: 'yatt',
      key: 'yatt',
      width: 80,
      align: 'center',
      render: (yatt: boolean) => (yatt ? '✓' : '✗'),
    },
    {
      title: t('Actions'),
      key: 'action',
      width: 150,
      align: 'center',
      fixed: 'right',
      render: (_, record) => (
        <div className="flex gap-2 justify-center">
          <Button
            type="primary"
            icon={<PencilIcon className="w-4 h-4" />}
            size="small"
            onClick={() => router.push(`/dashboard/users/sellers/${record.uuid}`)}
          />
          <Button
            type={record.userStatus === SellerStatusEnum.ACTIVE ? 'default' : 'primary'}
            size="small"
            onClick={() => handleStatusChange(record.uuid, record.userStatus)}
            loading={updateMutation.isPending}
          >
            {record.userStatus === SellerStatusEnum.ACTIVE ? t('Deactivate') : t('Activate')}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: t('Users') }, { label: t('Sellers') }]} />

      <Table<ResSellerOne>
        columns={columns}
        dataSource={sellers}
        rowKey="uuid"
        loading={isLoading}
        pagination={tablePagination}
        bordered
        scroll={{ x: 1200 }}
      />
    </div>
  );
}
