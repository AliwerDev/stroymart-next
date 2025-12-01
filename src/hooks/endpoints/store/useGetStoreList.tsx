/* eslint-disable @typescript-eslint/no-explicit-any */
import useTableData from '@/hooks/useTableData';

const useGetStoreList = (partnerId?: string, params?: any) => {
  const state = useTableData({
    endpoint: '/branch/index',
    filters: {
      partner_id: partnerId,
      ...params,
    },
  });

  const selectOptions = state.list?.map((item: any) => ({
    value: item.id,
    label: item.name,
  }));

  return {
    ...state,
    selectOptions,
  };
};
export default useGetStoreList;
