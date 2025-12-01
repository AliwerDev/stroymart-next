/* eslint-disable @typescript-eslint/no-explicit-any */
import useGetTranslatedWord from '@/hooks/useGetTranslatedWord';
import useTableData from '@/hooks/useTableData';

const useGetCategoryList = (params?: Record<string, any>, setParamsToFilters = true) => {
  const { getWord } = useGetTranslatedWord();
  const state = useTableData({
    endpoint: '/category/index',
    setParamsToFilters,
    filters: params,
  });

  const selectOptions = state.list?.map((item: any) => ({
    label: getWord(item, 'title'),
    value: String(item.id),
  }));

  return {
    ...state,
    selectOptions,
  };
};
export default useGetCategoryList;
