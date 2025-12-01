import useGetOneData from '@/hooks/useGetOne';

const useGetProduct = (id: string) => {
  const state = useGetOneData({
    endpoint: `/product/view?id=${id}`,
  });

  return state;
};
export default useGetProduct;
