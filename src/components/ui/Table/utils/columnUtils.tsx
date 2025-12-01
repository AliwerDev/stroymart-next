/* eslint-disable @typescript-eslint/no-explicit-any */
import CheckMarkIcon from '@/components/icons/CheckMarkIcon';
import ChevronDownIcon from '@/components/icons/ChevronDownIcon';
import { cn } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { Column } from '../types';

const getAlignmentClass = (align?: Column<any>['align']) => {
  switch (align) {
    case 'center':
      return 'justify-center';
    case 'right':
      return 'justify-end';
    default:
      return 'justify-start';
  }
};

export const createSelectionColumn = <TData extends Record<string, unknown>>(): ColumnDef<
  TData,
  unknown
> => ({
  id: 'select',
  meta: {
    sticky: 'left',
  },
  header: ({ table }) => {
    const isAllSelected = table.getIsAllPageRowsSelected();
    const toggleAll = table.getToggleAllPageRowsSelectedHandler();

    return (
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          aria-label="Select all"
          checked={isAllSelected}
          onChange={toggleAll}
          onClick={(e) => e.stopPropagation()}
          className="sr-only"
        />
        <div
          className={cn(
            'w-[18px] h-[18px] border-2 rounded transition-all duration-200 flex items-center justify-center',
            isAllSelected
              ? 'bg-primary-500 border-primary-500'
              : 'bg-white border-text-4 hover:border-primary-500'
          )}
        >
          <CheckMarkIcon className="w-3 h-3 text-white" />
        </div>
      </label>
    );
  },
  cell: ({ row }) => {
    const isSelected = row.getIsSelected();
    const toggle = row.getToggleSelectedHandler();

    return (
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          aria-label="Select row"
          checked={isSelected}
          onChange={toggle}
          onClick={(e) => e.stopPropagation()}
          className="sr-only"
        />
        <div
          className={cn(
            'w-[18px] h-[18px] border-2 rounded transition-all duration-200 flex items-center justify-center',
            isSelected
              ? 'bg-primary-500 border-primary-500'
              : 'bg-white border-text-4 hover:border-primary-500'
          )}
        >
          <CheckMarkIcon className="w-3 h-3 text-white" />
        </div>
      </label>
    );
  },
  enableSorting: false,
  enableHiding: false,
  size: 48,
});

export const convertColumnToTanStack = <TData extends Record<string, unknown>>(
  column: Column<TData>
): ColumnDef<TData, unknown> => ({
  id: column.key,
  accessorKey: column.accessorKey as string,
  header: ({ column: col }) => (
    <div className={cn('flex items-center gap-2', getAlignmentClass(column.align))}>
      {column.header}
      {column.sortable && (
        <div className="flex flex-col">
          <ChevronDownIcon
            className={cn(
              'w-3 h-3 transition-transform',
              col.getIsSorted() === 'asc' && 'rotate-180',
              col.getIsSorted() === 'desc' && 'rotate-0 text-brand-500',
              col.getIsSorted() === false && 'opacity-30'
            )}
          />
        </div>
      )}
    </div>
  ),
  cell: ({ getValue, row }) => {
    const value = getValue();

    if (column.cell) {
      return (
        <div className={cn('w-full', 'flex', getAlignmentClass(column.align))}>
          {column.cell(value, row.original, row.index)}
        </div>
      );
    }

    return value !== undefined && value !== null ? String(value) : '';
  },
  enableSorting: column.sortable ?? false,
  size: column.width
    ? typeof column.width === 'number'
      ? column.width
      : parseInt(column.width, 10)
    : undefined,
  meta: {
    align: column.align || 'left',
    sticky: column.sticky,
  },
});

export const convertColumnsToTanStack = <TData extends Record<string, unknown>>(
  columns: Column<TData>[],
  selectable = false
): ColumnDef<TData, unknown>[] => {
  const result: ColumnDef<TData, unknown>[] = [];

  if (selectable) {
    result.push(createSelectionColumn<TData>());
  }

  result.push(...columns.map(convertColumnToTanStack));

  return result;
};
