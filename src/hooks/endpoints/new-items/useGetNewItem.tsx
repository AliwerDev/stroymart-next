/* eslint-disable @typescript-eslint/no-explicit-any */

import useGetOneData from '@/hooks/useGetOne';

const useGetNewItem = (id: string, params?: Record<string, any>) => {
  const state = useGetOneData({
    endpoint: `/new-item/view?id=${id}&expand=newItems,analogs`,
    filters: params,
  });

  return state;
};
export default useGetNewItem;
