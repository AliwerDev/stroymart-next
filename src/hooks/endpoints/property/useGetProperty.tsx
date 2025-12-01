import useGetOne from '@/hooks/useGetOne';

const useGetProperty = (id: string) => {
  const state = useGetOne({
    endpoint: `/property-label/view?id=${id}`,
  });

  return {
    ...state,
  };
};

export default useGetProperty;
