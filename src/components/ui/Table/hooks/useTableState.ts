import { ColumnFiltersState, RowSelectionState, SortingState } from '@tanstack/react-table';
import { useState } from 'react';

interface UseTableStateProps {
  rowSelection?: RowSelectionState;
  onRowSelectionChange?: (rowSelection: RowSelectionState) => void;
}

export const useTableState = ({
  rowSelection: externalRowSelection,
  onRowSelectionChange,
}: UseTableStateProps = {}) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  // Internal row selection state (used when not controlled)
  const [internalRowSelection, setInternalRowSelection] = useState<RowSelectionState>({});

  // Use external rowSelection if provided, otherwise use internal state
  const rowSelection =
    externalRowSelection !== undefined ? externalRowSelection : internalRowSelection;

  // Use external handler if provided, otherwise use internal setter
  const setRowSelection = onRowSelectionChange || setInternalRowSelection;

  return {
    sorting,
    setSorting,
    columnFilters,
    setColumnFilters,
    globalFilter,
    setGlobalFilter,
    rowSelection,
    setRowSelection,
  };
};
