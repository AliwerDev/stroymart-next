'use client';
import { EyeIcon, PencilIcon, PlusIcon, TrashIcon } from '@/components/icons';
import PageHeader from '@/components/landing/PageHeader';
import { attributeGroupApi } from '@/data/attribute-group/attribute-group.api';
import { ResAttributeGroupOne } from '@/data/attribute-group/attribute-group.types';
import useGetTranslatedWord from '@/hooks/useGetTranslatedWord';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Modal, Table, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AddEditAttributeGroupModal from './_components/AddEditAttributeGroupModal';

export default function AttributeGroupsPage() {
  const t = useTranslations();
  const getWord = useGetTranslatedWord();
  const queryClient = useQueryClient();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAttributeGroupUuid, setSelectedAttributeGroupUuid] = useState<
    string | undefined
  >();

  const { data: attributeGroups, isLoading } = useQuery({
    queryKey: ['attribute-groups'],
    queryFn: attributeGroupApi.getAll,
  });

  const deleteMutation = useMutation({
    mutationFn: (uuid: string) => attributeGroupApi.delete(uuid),
    onSuccess: () => {
      message.success(t('Attribute group deleted successfully'));
      queryClient.invalidateQueries({ queryKey: ['attribute-groups'] });
    },
    onError: () => {
      message.error(t('Failed to delete attribute group'));
    },
  });

  const handleOpenModal = (attributeGroupUuid?: string) => {
    setSelectedAttributeGroupUuid(attributeGroupUuid);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAttributeGroupUuid(undefined);
  };

  const handleDelete = (uuid: string, name: string) => {
    Modal.confirm({
      title: t('Delete Attribute Group'),
      content: t('Are you sure you want to delete this attribute group?', { name }),
      okText: t('Delete'),
      okType: 'danger',
      cancelText: t('Cancel'),
      okButtonProps: {
        loading: deleteMutation.isPending,
      },
      onOk: () => deleteMutation.mutate(uuid),
    });
  };

  const columns: ColumnsType<ResAttributeGroupOne> = [
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
      render: (_: ResAttributeGroupOne['name'], record: ResAttributeGroupOne) =>
        getWord(record, 'name'),
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
            onClick={() => router.push(`/dashboard/catalog/attribute-groups/${record.uuid}`)}
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
        breadcrumbs={[{ label: t('Catalog') }, { label: t('Attribute Groups') }]}
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
          dataSource={attributeGroups?.data}
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

      <AddEditAttributeGroupModal
        open={isModalOpen}
        onClose={handleCloseModal}
        attributeGroupUuid={selectedAttributeGroupUuid}
      />
    </div>
  );
}
