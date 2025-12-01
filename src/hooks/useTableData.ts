/* eslint-disable @typescript-eslint/no-explicit-any */
import request from '@/lib/request';
import { IMeta } from '@/types/other';
import { UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import get from 'lodash.get';
import { usePagination } from './usePagination';
import { useUrlParams } from './useUrlParams';

interface UseTableDataProps<T> {
  endpoint: string;
  enabled?: boolean;
  filters?: Record<string, any>;
  options?: Partial<UseQueryOptions<any, AxiosError>>;
  select?: (data: any) => T[];
  filterParamKeys?: string[];
  pageSize?: number;
  setParamsToFilters?: boolean;
}

const useTableData = <T>({
  endpoint,
  enabled = true,
  filters,
  options,
  filterParamKeys,
  pageSize: defaultPageSize,
  setParamsToFilters = true,
}: UseTableDataProps<T>) => {
  const { currentPage, pageSize } = usePagination({ defaultPageSize });
  const queryClient = useQueryClient();

  const { params: queryParams } = useUrlParams<{ [key: string]: string }>({
    defaultValues: {},
    paramKeys: filterParamKeys,
  });

  const params = {
    currentPage,
    perPage: pageSize,
    ...filters,
    ...(setParamsToFilters ? queryParams : {}),
  };

  const queryKey = [endpoint, ...Object.values(params)];

  const { data, isLoading, error, ...rest } = useQuery<any, AxiosError>({
    queryKey,
    queryFn: async () => await request.get(endpoint, { params }),
    enabled: enabled,
    staleTime: 0,
    ...options,
  });

  const invalidateQuery = () => {
    queryClient.invalidateQueries({ queryKey });
  };

  return {
    list: (get(data, 'data.result.data', []) as T[]) ?? ([] as T[]),
    meta: get(data, 'data.result.meta', {}) as IMeta,
    queryKey,
    invalidateQuery,
    isLoading,
    error,
    data,
    ...rest,
  };
};

export default useTableData;
