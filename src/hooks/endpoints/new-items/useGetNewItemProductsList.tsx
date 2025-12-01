/* eslint-disable @typescript-eslint/no-explicit-any */
import useGetOneData from '@/hooks/useGetOne';

const useGetNewItemProductsList = (params?: Record<string, any>) => {
  const state = useGetOneData({
    endpoint: '/new-item/product-filter',
    filters: params,
  });

  return {
    list: state?.entity?.length ? state?.entity : [],
    ...state,
  };
};
export default useGetNewItemProductsList;
