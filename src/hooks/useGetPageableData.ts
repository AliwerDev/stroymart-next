'use client';

import { PageableData, PaginationParams } from '@/types/pagination';
import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { TablePaginationConfig as AntdTablePaginationConfig } from 'antd';
import { useMemo } from 'react';
import { useUrlParams } from './useUrlParams';

interface PaginationUrlParams extends Record<string, string> {
  page: string;
  size: string;
}

interface UseGetPageableDataOptions<TData, TError = Error> {
  queryKey: (params: PaginationParams) => unknown[];
  queryFn: (params: PaginationParams) => Promise<PageableData<TData>>;
  initialPage?: number;
  initialPageSize?: number;
  enabled?: boolean;
  useUrlState?: boolean;
  queryOptions?: Omit<
    UseQueryOptions<PageableData<TData>, TError>,
    'queryKey' | 'queryFn' | 'enabled'
  >;
}

interface UseGetPageableDataReturn<TData, TError = Error> {
  data: TData[];
  pagination: PaginationParams;
  paginationData: PageableData<TData>['paginationData'] | undefined;
  isLoading: boolean;
  isFetching: boolean;
  error: TError | null;
  refetch: UseQueryResult<PageableData<TData>, TError>['refetch'];
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setPagination: (params: Partial<PaginationParams>) => void;
  tablePagination: AntdTablePaginationConfig;
}

export function useGetPageableData<TData = unknown, TError = Error>({
  queryKey,
  queryFn,
  initialPage = 0,
  initialPageSize = 10,
  enabled = true,
  useUrlState = true,
  queryOptions,
}: UseGetPageableDataOptions<TData, TError>): UseGetPageableDataReturn<TData, TError> {
  const { params: urlParams, setParams: setUrlParams } = useUrlParams<PaginationUrlParams>({
    defaultValues: {
      page: String(initialPage),
      size: String(initialPageSize),
    },
    paramKeys: ['page', 'size'],
  });

  const pagination: PaginationParams = useMemo(
    () => ({
      page: useUrlState ? parseInt(urlParams.page || String(initialPage), 10) : initialPage,
      size: useUrlState ? parseInt(urlParams.size || String(initialPageSize), 10) : initialPageSize,
    }),
    [useUrlState, urlParams.page, urlParams.size, initialPage, initialPageSize]
  );

  const query = useQuery<PageableData<TData>, TError>({
    queryKey: queryKey(pagination),
    queryFn: () => queryFn(pagination),
    enabled,
    ...queryOptions,
  });

  const setPage = (page: number) => {
    if (useUrlState) {
      setUrlParams({ page: String(page), size: urlParams.size || String(initialPageSize) });
    }
  };

  const setPageSize = (size: number) => {
    if (useUrlState) {
      setUrlParams({ page: '0', size: String(size) });
    }
  };

  const setPagination = (params: Partial<PaginationParams>) => {
    if (useUrlState) {
      const newParams: Partial<PaginationUrlParams> = {};
      if (params.page !== undefined) newParams.page = String(params.page);
      if (params.size !== undefined) newParams.size = String(params.size);
      setUrlParams(newParams);
    }
  };

  const tablePagination: AntdTablePaginationConfig = useMemo(
    () => ({
      current: (query.data?.paginationData?.currentPageNumber ?? 0) + 1,
      pageSize: query.data?.paginationData?.pageSize ?? initialPageSize,
      total: query.data?.paginationData?.totalElements ?? 0,
      showSizeChanger: true,
      pageSizeOptions: ['10', '20', '50', '100'],
      onChange: (_, pageSize) => {
        if (useUrlState) {
          setUrlParams({ page: '0', size: String(pageSize) });
        }
      },
      onShowSizeChange: (_, size) => {
        if (useUrlState) {
          setUrlParams({ page: '0', size: String(size) });
        }
      },
    }),
    [query.data?.paginationData, initialPageSize, useUrlState, setUrlParams]
  );

  return {
    data: query.data?.data ?? [],
    pagination,
    paginationData: query.data?.paginationData,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
    setPage,
    setPageSize,
    setPagination,
    tablePagination,
  };
}
