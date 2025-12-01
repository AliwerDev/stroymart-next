import useTableData from '@/hooks/useTableData';

const useGetPartnerList = () => {
  const state = useTableData({
    endpoint: '/partner/index',
  });

  return {
    ...state,
  };
};
export default useGetPartnerList;
