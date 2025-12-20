'use client';
import { PencilIcon, PlusIcon, TrashIcon } from '@/components/icons';
import PageHeader from '@/components/landing/PageHeader';
import { filterGroupApi } from '@/data/filter-group/filter-group.api';
import { filterApi } from '@/data/filter/filter.api';
import { ResFilterOne } from '@/data/filter/filter.types';
import useGetTranslatedWord from '@/hooks/useGetTranslatedWord';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Modal, Table, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import AddEditFilterModal from '../_components/AddEditFilterModal';

interface FiltersPageProps {
  params: {
    uuid: string;
  };
}

export default function FiltersPage({ params }: FiltersPageProps) {
  const t = useTranslations();
  const getWord = useGetTranslatedWord();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFilterUuid, setSelectedFilterUuid] = useState<string | undefined>();

  const { data: filterGroup } = useQuery({
    queryKey: ['filter-group', params.uuid],
    queryFn: () => filterGroupApi.getOne(params.uuid),
  });

  const { data: filters, isLoading } = useQuery({
    queryKey: ['filters', params.uuid],
    queryFn: () => filterApi.getAll(params.uuid),
  });

  const deleteMutation = useMutation({
    mutationFn: (uuid: string) => filterApi.delete(uuid),
    onSuccess: () => {
      message.success(t('Filter deleted successfully'));
      queryClient.invalidateQueries({ queryKey: ['filters', params.uuid] });
    },
    onError: () => {
      message.error(t('Failed to delete filter'));
    },
  });

  const handleOpenModal = (filterUuid?: string) => {
    setSelectedFilterUuid(filterUuid);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFilterUuid(undefined);
  };

  const handleDelete = (uuid: string, name: string) => {
    Modal.confirm({
      title: t('Delete Filter'),
      content: t('Are you sure you want to delete this filter?', { name }),
      okText: t('Delete'),
      okType: 'danger',
      cancelText: t('Cancel'),
      okButtonProps: {
        loading: deleteMutation.isPending,
      },
      onOk: () => deleteMutation.mutate(uuid),
    });
  };

  const columns: ColumnsType<ResFilterOne> = [
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
      render: (_: ResFilterOne['name'], record: ResFilterOne) => getWord(record, 'name'),
    },
    {
      title: t('Icon URL'),
      dataIndex: 'iconUrl',
      key: 'iconUrl',
      width: 150,
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
      width: 120,
      align: 'center',
      fixed: 'right',
      render: (_, record) => (
        <div className="flex gap-2 justify-center">
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
        breadcrumbs={[
          { label: t('Catalog') },
          { label: t('Filter Groups'), href: '/management/catalog/filter-groups' },
          { label: filterGroup ? getWord(filterGroup, 'name') : '...' },
        ]}
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
          dataSource={filters}
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

      <AddEditFilterModal
        open={isModalOpen}
        onClose={handleCloseModal}
        filterUuid={selectedFilterUuid}
        filterGroupUuid={params.uuid}
      />
    </div>
  );
}
