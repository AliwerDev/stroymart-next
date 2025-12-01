/* eslint-disable @typescript-eslint/no-explicit-any */
import { RowSelectionState } from '@tanstack/react-table';
import React from 'react';

export interface Column<TData = any> {
  key: string;
  header: string | React.ReactNode;
  accessorKey?: keyof TData;
  cell?: (value: any, row: TData, index: number) => React.ReactNode;
  sortable?: boolean;
  width?: number | string;
  align?: 'left' | 'center' | 'right';
  sticky?: 'left' | 'right';
  type?: 'money' | 'date' | 'date-range';
}

// Pagination meta interface
export interface PaginationMeta {
  totalCount: number;
  pageCount: number;
  currentPage: number;
  perPage: number;
}

// Table component props interface
export interface TableProps<TData> {
  data: TData[];
  columns: Column<TData>[];
  className?: string;
  loading?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: TData) => void;
  selectable?: boolean;
  onSelectionChange?: (selectedRows: TData[]) => void;
  // Controlled selection props
  selectedRows?: RowSelectionState;
  setSelectedRows?: (selectedRows: RowSelectionState) => void;
  meta?: PaginationMeta;
  hidePagination?: boolean;
  pageSize?: number;
  headerClassName?: string;
  bodyClassName?: string;
  rowClassName?: string;
}
