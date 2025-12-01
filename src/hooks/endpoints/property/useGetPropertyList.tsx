/* eslint-disable @typescript-eslint/no-explicit-any */
import useGetTranslatedWord from '@/hooks/useGetTranslatedWord';
import useTableData from '@/hooks/useTableData';

const useGetPropertyList = (
  params?: Record<string, any>,
  options?: { setParamsToFilters?: boolean; enabled?: boolean }
) => {
  const { enabled = true, setParamsToFilters = true } = options || {};
  const { getWord } = useGetTranslatedWord();
  const state = useTableData({
    endpoint: `/property-label/index`,
    filters: params,
    setParamsToFilters,
    enabled,
  });

  const selectOptions = state.list?.map((item: any) => ({
    label: getWord(item, 'label'),
    value: String(item.id),
  }));

  return {
    ...state,
    selectOptions,
  };
};

export default useGetPropertyList;
