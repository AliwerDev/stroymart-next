/* eslint-disable @typescript-eslint/no-explicit-any */
import useGetOneData from '@/hooks/useGetOne';

const useGetUnitList = (params?: Record<string, any>) => {
  const state = useGetOneData({
    endpoint: `/property-value/list?expand=parent`,
    filters: params,
  });

  const units = state?.entity?.length ? state?.entity : [];

  return {
    units,
    ...state,
  };
};

export default useGetUnitList;
