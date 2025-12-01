/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from 'react';
import { useUrlParams } from './useUrlParams';

interface UsePageFiltersProps {
  initialFilters?: Record<string, any>;
  onFilterChange?: (filters: Record<string, any>) => void;
  paramKeys?: string[];
}

const usePageFilters = ({
  initialFilters = {},
  onFilterChange,
  paramKeys,
}: UsePageFiltersProps = {}) => {
  const { params, setParams, resetParams } = useUrlParams({
    paramKeys,
    onParamsChange: onFilterChange,
  });

  const isNil = (value: any) =>
    value === null ||
    value === undefined ||
    value === '' ||
    value === 'null' ||
    value === 'undefined';

  const handleFilterChange = useCallback(
    (key: string, value: any) => {
      const updates: Record<string, any> = {};

      // If value is null/undefined, clear the filter by setting it to undefined
      updates[key] = isNil(value) ? undefined : value;

      // Reset to first page when filter changes
      if (key !== 'currentPage' && key !== 'perPage') {
        updates.currentPage = '1';
      }

      setParams(updates);
    },
    [setParams]
  );

  const handleSetFilters = useCallback(
    (updates: Record<string, any>) => {
      const cleanUpdates: Record<string, any> = {};

      // Clear null/undefined values by setting them to undefined
      Object.entries(updates).forEach(([key, value]) => {
        cleanUpdates[key] = isNil(value) ? undefined : value;
      });

      // Check if any non-page/limit filters are being changed
      const hasNonPageLimitChanges = Object.keys(cleanUpdates).some(
        (key) => key !== 'currentPage' && key !== 'perPage'
      );

      // Reset to first page if non-page/limit filters are changing
      if (hasNonPageLimitChanges) {
        cleanUpdates.currentPage = '0';
      }

      setParams(cleanUpdates);
    },
    [setParams]
  );

  return {
    filters: { ...initialFilters, ...params },
    handleFilterChange,
    handleSetFilters,
    resetFilters: resetParams,
  };
};

export default usePageFilters;
