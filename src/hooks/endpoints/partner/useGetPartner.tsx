import useGetOneData from '@/hooks/useGetOne';

const useGetPartner = (id: string) => {
  const state = useGetOneData({
    endpoint: `/partner/view?id=${id}`,
    filters: {
      expand: 'branch_count,promotion_count',
    },
  });

  return state;
};
export default useGetPartner;
