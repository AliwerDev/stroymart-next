import useGetOneData from '@/hooks/useGetOne';
import useGetTranslatedWord from '@/hooks/useGetTranslatedWord';
import { useUrlParams } from '@/hooks/useUrlParams';
import { useMemo } from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */
const useGetFaqList = () => {
  const { params } = useUrlParams();
  const { getWord } = useGetTranslatedWord();
  const state = useGetOneData({
    endpoint: '/faq/index',
  });

  const list = state.entity?.length > 0 ? state.entity : [];
  const filteredList = useMemo(() => {
    const search = params?.search?.toLowerCase() || '';

    if (!search) return list;

    return list?.filter((item: any) => {
      return getWord(item, 'title')?.toLowerCase()?.includes(search) || getWord(item, 'description')?.toLowerCase()?.includes(search);
    });
  }, [list, params?.search]);

  return {
    ...state,
    list: filteredList,
  };
};
export default useGetFaqList;
