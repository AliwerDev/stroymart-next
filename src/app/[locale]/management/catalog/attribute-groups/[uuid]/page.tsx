'use client';
import { PencilIcon, PlusIcon, TrashIcon } from '@/components/icons';
import PageHeader from '@/components/landing/PageHeader';
import { attributeGroupApi } from '@/data/attribute-group/attribute-group.api';
import { attributeApi } from '@/data/attribute/attribute.api';
import { ResAttributeOne } from '@/data/attribute/attribute.types';
import useGetTranslatedWord from '@/hooks/useGetTranslatedWord';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Modal, Table, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import AddEditAttributeModal from '../_components/AddEditAttributeModal';

interface AttributesPageProps {
  params: {
    uuid: string;
  };
}

export default function AttributesPage({ params }: AttributesPageProps) {
  const t = useTranslations();
  const getWord = useGetTranslatedWord();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAttributeUuid, setSelectedAttributeUuid] = useState<string | undefined>();

  const { data: attributeGroup } = useQuery({
    queryKey: ['attribute-group', params.uuid],
    queryFn: () => attributeGroupApi.getOne(params.uuid),
  });

  const { data: attributes, isLoading } = useQuery({
    queryKey: ['attributes-by-group', params.uuid],
    queryFn: () => attributeApi.getAllByGroup(params.uuid),
  });

  const deleteMutation = useMutation({
    mutationFn: (uuid: string) => attributeApi.delete(uuid),
    onSuccess: () => {
      message.success(t('Attribute deleted successfully'));
      queryClient.invalidateQueries({ queryKey: ['attributes-by-group', params.uuid] });
    },
    onError: () => {
      message.error(t('Failed to delete attribute'));
    },
  });

  const handleOpenModal = (attributeUuid?: string) => {
    setSelectedAttributeUuid(attributeUuid);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAttributeUuid(undefined);
  };

  const handleDelete = (uuid: string, name: string) => {
    Modal.confirm({
      title: t('Delete Attribute'),
      content: t('Are you sure you want to delete this attribute?', { name }),
      okText: t('Delete'),
      okType: 'danger',
      cancelText: t('Cancel'),
      okButtonProps: {
        loading: deleteMutation.isPending,
      },
      onOk: () => deleteMutation.mutate(uuid),
    });
  };

  const columns: ColumnsType<ResAttributeOne> = [
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
      render: (_: ResAttributeOne['name'], record: ResAttributeOne) => getWord(record, 'name'),
    },
    {
      title: t('Is Main'),
      dataIndex: 'isMain',
      key: 'isMain',
      width: 100,
      align: 'center',
      render: (isMain: boolean) => (isMain ? t('Yes') : t('No')),
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
          { label: t('Attribute Groups'), href: '/management/catalog/attribute-groups' },
          { label: attributeGroup ? getWord(attributeGroup, 'name') : '...' },
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
          dataSource={attributes}
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

      <AddEditAttributeModal
        open={isModalOpen}
        onClose={handleCloseModal}
        attributeUuid={selectedAttributeUuid}
        defaultAttributeGroupUuid={params.uuid}
      />
    </div>
  );
}
