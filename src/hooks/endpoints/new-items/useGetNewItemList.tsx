/* eslint-disable @typescript-eslint/no-explicit-any */

import useTableData from '@/hooks/useTableData';

const useGetNewItemList = (params?: Record<string, any>) => {
  const state = useTableData({
    endpoint: '/new-item/index?expand=newItems',
    filters: params,
  });

  return state;
};
export default useGetNewItemList;
