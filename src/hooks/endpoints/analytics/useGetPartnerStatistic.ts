import useGetOne from '@/hooks/useGetOne';

const useGetPartnerStatistic = (period: string) => {
  const state = useGetOne({
    endpoint: `/analytic/partner-statistic?period=${period}`,
  });

  return {
    ...state,
  };
};

export default useGetPartnerStatistic;
