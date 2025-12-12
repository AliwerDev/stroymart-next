import { cn } from '@/lib/utils';
import { flexRender, HeaderGroup } from '@tanstack/react-table';

interface TableHeaderProps<TData> {
  headerGroups: HeaderGroup<TData>[];
  className?: string;
}

export const TableHeader = <TData,>({ headerGroups, className }: TableHeaderProps<TData>) => {
  return (
    <thead className={cn('bg-gray-200 h-14', className)}>
      {headerGroups.map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th
              key={header.id}
              className={cn(
                'px-[20px] py-2 md:py-4 text-sm md:text-base font-bold leading-4 text-text-1 tracking-wider',
                header.column.getCanSort() && 'cursor-pointer select-none hover:bg-bunker-100',
                header.column.id === 'select' && 'w-12',
                (header.column.columnDef.meta as { align?: string })?.align === 'center' &&
                  'text-center',
                (header.column.columnDef.meta as { align?: string })?.align === 'right' &&
                  'text-right',
                (header.column.columnDef.meta as { align?: string })?.align === 'left' &&
                  'text-left',
                (header.column.columnDef.meta as { sticky?: string })?.sticky === 'left' &&
                  'sticky left-0 z-10 shadow-[2px_0_4px_rgba(0,0,0,0.1)]',
                (header.column.columnDef.meta as { sticky?: string })?.sticky === 'right' &&
                  'sticky right-0 z-10 shadow-[-2px_0_4px_rgba(0,0,0,0.1)]'
              )}
              onClick={header.column.getToggleSortingHandler()}
              style={{
                width: header.getSize() !== 150 ? header.getSize() : undefined,
                left:
                  (header.column.columnDef.meta as { sticky?: string })?.sticky === 'left'
                    ? header.column.getStart('left')
                    : undefined,
                right:
                  (header.column.columnDef.meta as { sticky?: string })?.sticky === 'right'
                    ? header.column.getStart('right')
                    : undefined,
              }}
            >
              {flexRender(header.column.columnDef.header, header.getContext())}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
};
