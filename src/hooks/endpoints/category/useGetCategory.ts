import useGetOne from '@/hooks/useGetOne';

const useGetCategory = (id: string) => {
  const state = useGetOne({
    endpoint: `/category/view?id=${id}`,
  });

  return {
    ...state,
  };
};

export default useGetCategory;
