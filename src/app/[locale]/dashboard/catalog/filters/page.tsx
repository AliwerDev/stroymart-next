'use client';
import { EyeIcon, PencilIcon, PlusIcon, TrashIcon } from '@/components/icons';
import PageHeader from '@/components/landing/PageHeader';
import { filterGroupApi } from '@/data/filter-group/filter-group.api';
import { ResFilterGroupOne } from '@/data/filter-group/filter-group.types';
import useGetTranslatedWord from '@/hooks/useGetTranslatedWord';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Modal, Table, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AddEditFilterGroupModal from './_components/AddEditFilterGroupModal';

export default function FilterGroupsPage() {
  const t = useTranslations();
  const getWord = useGetTranslatedWord();
  const queryClient = useQueryClient();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFilterGroupUuid, setSelectedFilterGroupUuid] = useState<string | undefined>();

  const { data: filterGroups, isLoading } = useQuery({
    queryKey: ['filter-groups'],
    queryFn: filterGroupApi.getAll,
  });

  const deleteMutation = useMutation({
    mutationFn: (uuid: string) => filterGroupApi.delete(uuid),
    onSuccess: () => {
      message.success(t('Filter group deleted successfully'));
      queryClient.invalidateQueries({ queryKey: ['filter-groups'] });
    },
    onError: () => {
      message.error(t('Failed to delete filter group'));
    },
  });

  const handleOpenModal = (filterGroupUuid?: string) => {
    setSelectedFilterGroupUuid(filterGroupUuid);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFilterGroupUuid(undefined);
  };

  const handleDelete = (uuid: string, name: string) => {
    Modal.confirm({
      title: t('Delete Filter Group'),
      content: t('Are you sure you want to delete this filter group?', { name }),
      okText: t('Delete'),
      okType: 'danger',
      cancelText: t('Cancel'),
      okButtonProps: {
        loading: deleteMutation.isPending,
      },
      onOk: () => deleteMutation.mutate(uuid),
    });
  };

  const columns: ColumnsType<ResFilterGroupOne> = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index',
      align: 'center',
      width: 80,
      render: (_, __, index) => index + 1,
    },
    {
      title: t('Name'),
      dataIndex: 'name',
      key: 'name',
      render: (_: ResFilterGroupOne['name'], record: ResFilterGroupOne) => getWord(record, 'name'),
    },
    {
      title: t('Order'),
      dataIndex: 'orderNumber',
      key: 'orderNumber',
      width: 100,
      align: 'center',
    },
    {
      title: t('Actions'),
      key: 'action',
      width: 180,
      align: 'center',
      fixed: 'right',
      render: (_, record) => (
        <div className="flex gap-2 justify-center">
          <Button
            icon={<EyeIcon className="w-4 h-4" />}
            size="small"
            onClick={() => router.push(`/dashboard/catalog/filters/${record.uuid}`)}
          />
          <Button
            type="primary"
            icon={<PencilIcon className="w-4 h-4" />}
            size="small"
            onClick={() => handleOpenModal(record.uuid)}
          />
          <Button
            danger
            icon={<TrashIcon className="w-4 h-4" />}
            size="small"
            onClick={() => handleDelete(record.uuid, getWord(record, 'name'))}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: t('Catalog') }, { label: t('Filter Groups') }]}
        actions={
          <Button
            type="primary"
            icon={<PlusIcon className="w-4 h-4" />}
            onClick={() => handleOpenModal()}
          >
            {t('Add')}
          </Button>
        }
      />
      <div className="mt-4">
        <Table
          columns={columns}
          dataSource={filterGroups?.data}
          rowKey="uuid"
          loading={isLoading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `${t('Total')}: ${total}`,
          }}
          bordered
          scroll={{ x: 1000 }}
        />
      </div>

      <AddEditFilterGroupModal
        open={isModalOpen}
        onClose={handleCloseModal}
        filterGroupUuid={selectedFilterGroupUuid}
      />
    </div>
  );
}
