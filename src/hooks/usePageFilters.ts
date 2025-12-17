/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from 'dayjs';
import { useCallback, useMemo } from 'react';
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

  const filters = useMemo(() => {
    const merged = { ...initialFilters, ...params };

    Object.keys(merged).forEach((key) => {
      const value = merged[key];

      if (typeof value === 'string' && value.match(/^\d{4}-\d{2}-\d{2}$/)) {
        merged[key] = dayjs(value);
      }
    });

    return merged;
  }, [initialFilters, params]);

  const handleFilterChange = useCallback(
    (key: string, value: any) => {
      const updates: Record<string, any> = {};

      let processedValue = value;
      if (dayjs.isDayjs(value)) {
        processedValue = value.format('YYYY-MM-DD');
      }

      updates[key] = isNil(processedValue) ? undefined : processedValue;

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

      Object.entries(updates).forEach(([key, value]) => {
        let processedValue = value;
        if (dayjs.isDayjs(value)) {
          processedValue = value.format('YYYY-MM-DD');
        }

        cleanUpdates[key] = isNil(processedValue) ? undefined : processedValue;
      });

      const hasNonPageLimitChanges = Object.keys(cleanUpdates).some(
        (key) => key !== 'currentPage' && key !== 'perPage'
      );

      if (hasNonPageLimitChanges) {
        cleanUpdates.currentPage = '1';
      }

      setParams(cleanUpdates);
    },
    [setParams]
  );

  return {
    filters,
    handleFilterChange,
    handleSetFilters,
    resetFilters: resetParams,
  };
};

export default usePageFilters;
