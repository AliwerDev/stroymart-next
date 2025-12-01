/* eslint-disable @typescript-eslint/no-explicit-any */
import useTableData from '@/hooks/useTableData';

const useGetAdminList = (params?: any, setParamsToFilters?: boolean) => {
  setParamsToFilters = setParamsToFilters ?? true;

  const state = useTableData({
    endpoint: '/user/index',
    setParamsToFilters,
    filters: params,
  });

  const selectOptions = state.list?.map((item: any) => ({
    label: item.fullname,
    value: String(item.id),
  }));

  return {
    ...state,
    selectOptions,
  };
};
export default useGetAdminList;
