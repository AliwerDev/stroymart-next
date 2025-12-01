import useTableData from '@/hooks/useTableData';

const useGetPromotionsList = () => {
  const state = useTableData({
    endpoint: '/promotion/index',
  });

  return {
    ...state,
  };
};
export default useGetPromotionsList;
