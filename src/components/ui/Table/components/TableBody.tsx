import Empty from '@/components/common/Empty';
import { cn } from '@/lib/utils';
import { flexRender, Table } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';

interface TableBodyProps<TData> {
  table: Table<TData>;
  onRowClick?: (row: TData) => void;
  emptyMessage?: string;
  className?: string;
  rowClassName?: string;
}

export const TableBody = <TData,>({
  table,
  onRowClick,
  emptyMessage,
  className,
  rowClassName,
}: TableBodyProps<TData>) => {
  const t = useTranslations();

  return (
    <tbody className={cn('bg-white', className)}>
      {table.getRowModel().rows.length > 0 ? (
        table.getRowModel().rows.map((row) => (
          <tr
            key={row.id}
            className={cn(
              'hover:bg-light-gray-1 transition-colors border-b border-dashed border-mid-gray-1',
              onRowClick && 'cursor-pointer',
              rowClassName
            )}
            onClick={() => onRowClick?.(row.original)}
          >
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                className={cn(
                  'px-[20px] py-2 md:py-4 text-sm md:text-base text-text-1',
                  cell.column.id === 'select' && 'text-left',
                  (cell.column.columnDef.meta as { align?: string })?.align === 'center' &&
                  'text-center',
                  (cell.column.columnDef.meta as { align?: string })?.align === 'right' &&
                  'text-right',
                  (cell.column.columnDef.meta as { align?: string })?.align === 'left' &&
                  'text-left',
                  (cell.column.columnDef.meta as { sticky?: string })?.sticky === 'left' &&
                  'sticky left-0 z-10 bg-white shadow-[2px_0_4px_rgba(0,0,0,0.1)]',
                  (cell.column.columnDef.meta as { sticky?: string })?.sticky === 'right' &&
                  'sticky right-0 z-10 bg-white shadow-[-2px_0_4px_rgba(0,0,0,0.1)]'
                )}
                style={{
                  // minWidth: cell.column.getSize() !== 150 ? cell.column.getSize() : '150px',
                  // maxWidth: cell.column.getSize() !== 150 ? cell.column.getSize() : '150px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  left:
                    (cell.column.columnDef.meta as { sticky?: string })?.sticky === 'left'
                      ? cell.column.getStart('left')
                      : undefined,
                  right:
                    (cell.column.columnDef.meta as { sticky?: string })?.sticky === 'right'
                      ? cell.column.getStart('right')
                      : undefined,
                }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))
      ) : (
        <tr>
          <td
            colSpan={table.getAllColumns().length}
            className="px-6 py-12 text-center text-sm text-text-3"
          >
            <Empty height={200} text={emptyMessage || t('No data found')} />
          </td>
        </tr>
      )}
    </tbody>
  );
};
