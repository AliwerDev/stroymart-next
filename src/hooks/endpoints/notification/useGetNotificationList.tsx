import useTableData from '@/hooks/useTableData';

const useGetNotificationList = () => {
  const state = useTableData({
    endpoint: '/notification/index',
  });

  return {
    ...state,
  };
};
export default useGetNotificationList;
