'use client';
import { PencilIcon, PlusIcon, TrashIcon } from '@/components/icons';
import PageHeader from '@/components/landing/PageHeader';
import { categoryApi } from '@/data/category/category.api';
import { CategoryStatusEnum, ResCategoryOne } from '@/data/category/category.types';
import useGetTranslatedWord from '@/hooks/useGetTranslatedWord';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Modal, Table, Tag, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

export default function CategoriesPage() {
  const t = useTranslations();
  const getWord = useGetTranslatedWord();
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: categoryApi.getAll,
  });

  const deleteMutation = useMutation({
    mutationFn: (uuid: string) => categoryApi.delete(uuid),
    onSuccess: () => {
      message.success(t('Category deleted successfully'));
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onError: () => {
      message.error(t('Failed to delete category'));
    },
  });

  const handleDelete = (uuid: string, name: string) => {
    Modal.confirm({
      title: t('Delete Category'),
      content: t('Are you sure you want to delete this category?', { name }),
      okText: t('Delete'),
      okType: 'danger',
      cancelText: t('Cancel'),
      okButtonProps: {
        loading: deleteMutation.isPending,
      },
      onOk: () => deleteMutation.mutate(uuid),
    });
  };

  const columns: ColumnsType<ResCategoryOne> = [
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
      render: (_: ResCategoryOne['name'], record: ResCategoryOne) => getWord(record, 'name'),
    },
    {
      title: t('Status'),
      dataIndex: 'status',
      key: 'status',
      width: 120,
      align: 'center',
      render: (status: CategoryStatusEnum) => (
        <Tag color={status === CategoryStatusEnum.ACTIVE ? 'green' : 'red'}>{status}</Tag>
      ),
      onFilter: (value, record) => record.status === value,
    },
    {
      title: t('Order'),
      dataIndex: 'orderNumber',
      key: 'orderNumber',
      width: 100,
      align: 'center',
    },
    {
      title: t('Percent'),
      dataIndex: 'percent',
      key: 'percent',
      width: 100,
      align: 'center',
      render: (percent: number) => `${percent}%`,
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
            onClick={() => router.push(`/management/catalog/categories/${record.uuid}`)}
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
        breadcrumbs={[{ label: 'Каталог' }, { label: 'Категории' }]}
        actions={
          <Button
            type="primary"
            icon={<PlusIcon className="w-4 h-4" />}
            onClick={() => router.push('/management/catalog/categories/create')}
          >
            {t('Add')}
          </Button>
        }
      />

      <div className="mt-4">
        <Table
          columns={columns}
          dataSource={categories}
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
    </div>
  );
}
