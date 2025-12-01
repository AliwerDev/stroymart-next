import useGetOne from '@/hooks/useGetOne';

const useGetCientEngagement = (period: string) => {
  const state = useGetOne({
    endpoint: `/analytic/client-engagement?period=${period}`,
  });

  return {
    ...state,
  };
};

export default useGetCientEngagement;
