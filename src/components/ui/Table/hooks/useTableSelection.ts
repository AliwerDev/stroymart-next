import { Table } from '@tanstack/react-table';
import { useEffect } from 'react';

interface UseTableSelectionProps<TData> {
  table: Table<TData>;
  onSelectionChange?: (selectedRows: TData[]) => void;
}

export const useTableSelection = <TData>({
  table,
  onSelectionChange,
}: UseTableSelectionProps<TData>) => {
  useEffect(() => {
    if (onSelectionChange) {
      const selectedRows = table.getFilteredSelectedRowModel().rows.map((row) => row.original);
      onSelectionChange(selectedRows);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table.getState().rowSelection, onSelectionChange, table]);
};
