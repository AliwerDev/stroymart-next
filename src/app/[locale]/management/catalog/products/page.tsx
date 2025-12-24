'use client';
import { PencilIcon, PlusIcon, TrashIcon } from '@/components/icons';
import PageHeader from '@/components/landing/PageHeader';
import { productApi } from '@/data/product/product.api';
import { ResProductOne } from '@/data/product/product.types';
import { useGetPageableData } from '@/hooks/useGetPageableData';
import useGetTranslatedWord from '@/hooks/useGetTranslatedWord';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Input, Modal, Table, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ProductsPage() {
  const t = useTranslations();
  const getWord = useGetTranslatedWord();
  const queryClient = useQueryClient();
  const router = useRouter();

  const [search, setSearch] = useState('');

  const { data, isLoading, tablePagination, pagination } = useGetPageableData({
    queryKey: (params) => ['products', params.page, params.size, search],
    queryFn: (params) =>
      productApi.getAll({
        ...params,
        search: search || undefined,
      }),
    initialPage: 0,
    initialPageSize: 10,
  });

  const deleteMutation = useMutation({
    mutationFn: (uuid: string) => productApi.delete(uuid),
    onSuccess: () => {
      message.success(t('Product deleted successfully'));
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: () => {
      message.error(t('Failed to delete product'));
    },
  });

  const handleDelete = (uuid: string, name: string) => {
    Modal.confirm({
      title: t('Delete Product'),
      content: t('Are you sure you want to delete this product?', { name }),
      okText: t('Delete'),
      okType: 'danger',
      cancelText: t('Cancel'),
      okButtonProps: {
        loading: deleteMutation.isPending,
      },
      onOk: () => deleteMutation.mutate(uuid),
    });
  };

  const columns: ColumnsType<ResProductOne> = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index',
      align: 'center',
      width: 80,
      render: (_, __, index) => pagination.page * pagination.size + index + 1,
    },
    {
      title: t('Image'),
      dataIndex: 'images',
      key: 'images',
      width: 100,
      align: 'center',
      render: (images: string[]) =>
        images?.[0] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={images[0]} alt="Product" className="w-12 h-12 object-cover rounded" />
        ) : (
          <div className="w-12 h-12 bg-gray-200 rounded" />
        ),
    },
    {
      title: t('Name'),
      dataIndex: 'name',
      key: 'name',
      render: (_: ResProductOne['name'], record: ResProductOne) => getWord(record, 'name'),
    },
    {
      title: t('Model'),
      dataIndex: 'model',
      key: 'model',
      width: 150,
    },
    {
      title: t('SKU Code'),
      dataIndex: 'skuCode',
      key: 'skuCode',
      width: 150,
    },
    {
      title: t('Real Price'),
      dataIndex: 'realPrice',
      key: 'realPrice',
      width: 120,
      align: 'right',
      render: (price: number) => `${price?.toLocaleString()} UZS`,
    },
    {
      title: t('Custom Price'),
      dataIndex: 'customPrice',
      key: 'customPrice',
      width: 120,
      align: 'right',
      render: (price: number) => `${price?.toLocaleString()} UZS`,
    },
    {
      title: t('Quantity'),
      dataIndex: 'quantity',
      key: 'quantity',
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
            onClick={() => router.push(`/management/catalog/products/${record.uuid}`)}
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
        breadcrumbs={[{ label: 'Каталог' }, { label: 'Продукты' }]}
        actions={
          <Button
            type="primary"
            icon={<PlusIcon className="w-4 h-4" />}
            onClick={() => router.push('/management/catalog/products/create')}
          >
            {t('Add')}
          </Button>
        }
      />

      <div className="mt-4 mb-4 flex gap-4">
        <Input.Search
          placeholder={t('Search products...')}
          allowClear
          size="large"
          onSearch={setSearch}
          onChange={(e) => !e.target.value && setSearch('')}
          className="max-w-md"
        />
      </div>

      <div className="mt-4">
        <Table
          columns={columns}
          dataSource={data}
          rowKey="uuid"
          loading={isLoading}
          pagination={{
            ...tablePagination,
            showTotal: (total) => `${t('Total')}: ${total}`,
          }}
          bordered
          scroll={{ x: 1200 }}
        />
      </div>
    </div>
  );
}
