import useGetOneData from '@/hooks/useGetOne';

const useGetNotification = (id: string) => {
  const state = useGetOneData({
    endpoint: `/notification/view?id=${id}`,
    filters: {
      expand: 'buttons',
    },
  });

  return {
    ...state,
  };
};
export default useGetNotification;
