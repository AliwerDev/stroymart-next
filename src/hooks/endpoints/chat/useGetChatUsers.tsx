/* eslint-disable @typescript-eslint/no-explicit-any */
import request from '@/lib/request';
import { useQuery } from '@tanstack/react-query';
import get from 'lodash.get';

const useGetChatUsers = (params?: Record<string, unknown>) => {
  const queryKey = ['chat-users', params];

  const state = useQuery<any>({
    queryKey,
    queryFn: () => request.get('/bot-user/index', { params: { perPage: 1000000, ...params } }),
    refetchInterval: 5000, // Poll every 5 seconds
    refetchIntervalInBackground: false,
    staleTime: 0,
    select: (data) => (get(data, 'data.result.data')) as any[],
  });


  return {
    ...state,
    queryKey,
  };
};

export default useGetChatUsers;
