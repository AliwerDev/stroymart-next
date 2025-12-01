import useGetOneData from '@/hooks/useGetOne';

const useGetUserMe = () => {
  const state = useGetOneData({
    endpoint: `/user/me`,
  });

  return {
    ...state,
  };
};
export default useGetUserMe;
