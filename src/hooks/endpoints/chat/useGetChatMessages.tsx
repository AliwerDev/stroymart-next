/* eslint-disable @typescript-eslint/no-explicit-any */
import request from '@/lib/request';
import { formatDate } from '@/lib/utils';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import get from 'lodash.get';

interface UseGetChatMessagesProps {
  userId: number | null;
  enabled?: boolean;
  options?: Partial<UseQueryOptions<any, AxiosError>>;
}

const useGetChatMessages = ({ userId, enabled = true, options }: UseGetChatMessagesProps) => {
  const queryKey = ['chat-messages', userId];

  const { data, isLoading, error, ...rest } = useQuery<any, AxiosError>({
    queryKey,
    queryFn: () =>
      request.get('/chat/index', {
        params: { bot_user_id: userId, perPage: 1000000, expand: 'user,bot_user' },
      }),
    enabled: enabled && !!userId,
    refetchInterval: 5000, // Poll every 5 seconds
    refetchIntervalInBackground: false,
    staleTime: 0,
    select: (data) => (get(data, 'data.result.data')) as any[],
    ...options,
  });

  const groupByDate = (messages: any[]): Record<string, any[]> => {
    return (
      messages?.reduceRight((acc, message) => {
        const date = formatDate(message.created_at);
        acc[date] = acc[date] || [];
        acc[date].push(message);
        return acc;
      }, {}) || []
    );
  };

  return {
    groupedMessages: groupByDate(data as any[]),
    messages: data as any[],
    data,
    isLoading,
    error,
    queryKey,
    ...rest,
  };
};

export default useGetChatMessages;
