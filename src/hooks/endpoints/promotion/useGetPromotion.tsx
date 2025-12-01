import useGetOneData from '@/hooks/useGetOne';

const useGetPromotion = (id: string) => {
  const state = useGetOneData({
    endpoint: `/promotion/view?id=${id}&expand=regions`,
  });

  return {
    ...state,
  };
};
export default useGetPromotion;
