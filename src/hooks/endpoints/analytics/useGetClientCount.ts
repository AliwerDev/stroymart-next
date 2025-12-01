import useGetOne from '@/hooks/useGetOne';

const useGetClientCount = () => {
  const state = useGetOne({
    endpoint: '/analytic/client-count',
  });

  return {
    ...state,
  };
};

export default useGetClientCount;
