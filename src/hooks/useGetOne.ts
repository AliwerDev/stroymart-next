/* eslint-disable @typescript-eslint/no-explicit-any */
import request from '@/lib/request';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import get from 'lodash.get';

interface UseGetOneDataProps<T> {
  endpoint: string;
  enabled?: boolean;
  filters?: Record<string, any>;
  options?: Partial<UseQueryOptions<any, AxiosError>>;
  select?: (data: any) => T;
}

const useGetOneData = <T = any>({
  endpoint,
  enabled = true,
  filters,
  options,
  select,
}: UseGetOneDataProps<T>) => {
  const queryKey = [endpoint, ...Object.values(filters ?? {})];
  const { data, isLoading, error, ...rest } = useQuery<any, AxiosError>({
    queryKey,
    queryFn: async () => await request.get(endpoint, { params: { ...filters } }),
    enabled,
    ...options,
  });

  return {
    entity: select ? select(data) : (get(data, 'data.result', {}) as T),
    data,
    isLoading,
    error,
    queryKey,
    ...rest,
  };
};

export default useGetOneData;
