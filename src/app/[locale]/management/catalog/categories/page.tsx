'use client';

import { PencilIcon, PlusIcon, TrashIcon } from '@/components/icons';
import PageHeader from '@/components/landing/PageHeader';
import { Button, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface Category {
  id: number;
  name: string;
  sortOrder: number;
}

const mockData: Category[] = [
  { id: 20, name: 'Выбрать модель', sortOrder: 0 },
  { id: 13, name: 'Выберите цвет', sortOrder: 0 },
  { id: 22, name: 'Выберите тип накопителя', sortOrder: 7 },
  { id: 15, name: 'Выберите процессор', sortOrder: 1 },
  { id: 21, name: 'Выберите площадь обслуживания', sortOrder: 0 },
  { id: 14, name: 'Выберите объём памяти', sortOrder: 2 },
  { id: 17, name: 'Выберите комплектацию', sortOrder: 4 },
  { id: 16, name: 'Выберите внутреннюю память', sortOrder: 3 },
  { id: 18, name: 'Выберите ОЗУ', sortOrder: 6 },
];

export default function CategoriesPage() {
  const columns: ColumnsType<Category> = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Опция',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Порядок сортировки',
      dataIndex: 'sortOrder',
      key: 'sortOrder',
      width: 200,
      align: 'center',
      sorter: (a, b) => a.sortOrder - b.sortOrder,
    },
    {
      title: 'Действие',
      key: 'action',
      width: 120,
      align: 'center',
      render: (_, record) => (
        <div className="flex gap-2 justify-center">
          <Button
            type="primary"
            icon={<PencilIcon className="w-4 h-4" />}
            size="small"
            onClick={() => console.log('Edit', record.id)}
          />
          <Button
            danger
            icon={<TrashIcon className="w-4 h-4" />}
            size="small"
            onClick={() => console.log('Delete', record.id)}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'Каталог', href: '/management/catalog' }, { label: 'Категории' }]}
        actions={
          <Button
            type="primary"
            icon={<PlusIcon className="w-4 h-4" />}
            onClick={() => console.log('Create new category')}
          >
            Добавить
          </Button>
        }
      />
      <div className="mt-4">
        <Table
          columns={columns}
          dataSource={mockData}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Всего: ${total}`,
          }}
          bordered
        />
      </div>
    </div>
  );
}
