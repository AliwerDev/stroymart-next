/* eslint-disable @typescript-eslint/no-explicit-any */
import useGetOneData from '@/hooks/useGetOne';

const useGetFaq = (id?: string | number) => {
  const state = useGetOneData({
    endpoint: `/faq/view?id=${id}`,
    enabled: Boolean(id),
  });

  return {
    ...state,
    entity: state.entity,
  };
};
export default useGetFaq;
