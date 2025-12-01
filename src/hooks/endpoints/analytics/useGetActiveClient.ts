import useGetOne from '@/hooks/useGetOne';

const useGetActiveClient = (period: string) => {
  const state = useGetOne({
    endpoint: `/analytic/active-client?period=${period}`,
  });

  return {
    ...state,
  };
};

export default useGetActiveClient;
