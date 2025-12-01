import useGetOneData from '@/hooks/useGetOne';

const useGetNewItemPropertyFilter = (categoryId?: string) => {
  const state = useGetOneData({
    endpoint: `/new-item/product-unit-filter?category_id=${categoryId}`,
    enabled: !!categoryId,
  });

  return {
    list: state?.entity?.length ? state?.entity : [],
    ...state,
  };
};
export default useGetNewItemPropertyFilter;
