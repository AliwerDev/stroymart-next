import useGetOneData from '@/hooks/useGetOne';
import useGetTranslatedWord from '@/hooks/useGetTranslatedWord';
import { useMemo } from 'react';

const useGetRegions = () => {
  const { getWord } = useGetTranslatedWord();
  const state = useGetOneData({
    endpoint: '/region/index',
  });

  const selectOptions = useMemo(() => {
    return state.entity?.length > 0
      ? state.entity.map((region: { id: string; title: string }) => ({
          label: getWord(region, 'title'),
          value: String(region.id),
        }))
      : [];
  }, [state.entity, getWord]);

  return {
    regions: state.entity,
    selectOptions,
    ...state,
  };
};
export default useGetRegions;
