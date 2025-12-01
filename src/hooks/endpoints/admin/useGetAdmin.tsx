import useGetOneData from '@/hooks/useGetOne';

const useGetAdmin = (id: string) => {
  const state = useGetOneData({
    endpoint: `/user/view?id=${id}`,
  });

  return {
    ...state,
  };
};
export default useGetAdmin;
