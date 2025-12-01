/* eslint-disable @typescript-eslint/no-explicit-any */
import useTableData from '@/hooks/useTableData';

const useGetProductList = (params?: Record<string, any>) => {
  const state = useTableData({
    endpoint: '/product/index',
    filters: params,
  });

  return {
    ...state,
  };
};
export default useGetProductList;
