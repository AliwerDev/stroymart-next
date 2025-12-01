/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { cn } from '@/lib/utils';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo } from 'react';

// Import hooks
import { useTableSelection, useTableState } from './hooks';

// Import components
import { TableBody, TableHeader, TableLoading, TablePagination } from './components';

// Import types and utilities
import Hide from '@/components/common/Hide';
import { usePagination } from '@/hooks/usePagination';
import { TableProps } from './types';
import { convertColumnsToTanStack } from './utils/columnUtils';

/**
 * Table component with support for both controlled and uncontrolled row selection
 *
 * @example
 * // Uncontrolled selection (current behavior)
 * <Table
 *   data={data}
 *   columns={columns}
 *   selectable
 *   onSelectionChange={(selectedRows) => console.log(selectedRows)}
 * />
 *
 * @example
 * // Controlled selection (new feature)
 * const [selectedRows, setSelectedRows] = useState({});
 *
 * <Table
 *   data={data}
 *   columns={columns}
 *   selectable
 *   selectedRows={selectedRows}
 *   onSelectedRowsChange={setSelectedRows}
 *   onSelectionChange={(selectedRows) => console.log(selectedRows)}
 * />
 */
const Table = <TData extends Record<string, any>>({
  data,
  columns,
  className,
  headerClassName,
  bodyClassName,
  loading = false,
  emptyMessage,
  rowClassName,
  onRowClick,
  selectable = false,
  onSelectionChange,
  // Controlled selection props
  selectedRows,
  setSelectedRows,
  meta,
  hidePagination = false,
}: TableProps<TData>) => {
  const { setPage, setPageSize } = usePagination();

  // Use custom hooks for state management
  const {
    sorting,
    setSorting,
    columnFilters,
    setColumnFilters,
    globalFilter,
    setGlobalFilter,
    rowSelection,
    setRowSelection,
  } = useTableState({
    rowSelection: selectedRows,
    onRowSelectionChange: setSelectedRows,
  });

  // Convert columns to TanStack format
  const tableColumns = useMemo(
    () => convertColumnsToTanStack(columns, selectable),
    [columns, selectable]
  );

  // Initialize TanStack table
  const table = useReactTable({
    data,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: (updaterOrValue) => {
      if (typeof updaterOrValue === 'function') {
        setRowSelection(updaterOrValue(rowSelection));
      } else {
        setRowSelection(updaterOrValue);
      }
    },
    state: {
      sorting,
      columnFilters,
      globalFilter,
      pagination: {
        pageIndex: meta?.currentPage || 0,
        pageSize: meta?.perPage || 10,
      },
      rowSelection,
    },
  });

  // Handle selection change
  useTableSelection({ table, onSelectionChange });

  return (
    <div className={cn('w-full', className)}>
      {/* Table */}
      <div className="bg-white overflow-hidden">
        <div className="overflow-x-auto relative">
          <table className="w-full">
            <TableHeader className={headerClassName} headerGroups={table.getHeaderGroups()} />
            {loading ? (
              <TableLoading className={className} columnCount={tableColumns.length} />
            ) : (
              <TableBody
                className={bodyClassName}
                table={table}
                onRowClick={onRowClick}
                emptyMessage={emptyMessage}
                rowClassName={rowClassName}
              />
            )}
          </table>
        </div>
      </div>

      {/* Pagination */}
      <Hide when={hidePagination}>
        <TablePagination meta={meta} onPageChange={setPage} onPerPageChange={setPageSize} />
      </Hide>
    </div>
  );
};

export default Table;
