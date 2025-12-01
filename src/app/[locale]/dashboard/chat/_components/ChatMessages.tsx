/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import Empty from '@/components/common/Empty';
import Typography from '@/components/ui/Typography';
import { cn } from '@/lib/utils';
import { ChatMessage as ChatMessageType } from '@/types/chat';
import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import DateSeparator from './DateSeparator';

interface ChatMessagesProps {
  groupedMessages: Record<string, ChatMessageType[]>;
  messages: ChatMessageType[];
  isLoading?: boolean;
  sendingMessage?: string | null;
}

const ChatMessages = ({
  groupedMessages = {},
  messages = [],
  isLoading = false,
  sendingMessage,
}: ChatMessagesProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const prevMessageCountRef = useRef(0);
  const t = useTranslations();

  // Calculate total message count
  const totalMessageCount = messages.length;

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (totalMessageCount > prevMessageCountRef.current && scrollRef.current) {
      scrollToBottom();
    }
    prevMessageCountRef.current = totalMessageCount;
  }, [totalMessageCount]);

  // Initial scroll to bottom
  useEffect(() => {
    if (scrollRef.current && totalMessageCount > 0) {
      scrollToBottom();
    }
  }, [totalMessageCount, scrollRef.current]);

  useEffect(() => {
    if (sendingMessage) {
      scrollToBottom();
    }
  }, [sendingMessage]);

  return (
    <>
      <div
        ref={scrollRef}
        className={cn(
          'flex-1 custom-scrollbar p-6 space-y-4 overflow-y-auto',
          isLoading && 'opacity-0 collapse'
        )}
      >
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <Empty text={t('Нет сообщений')} />
          </div>
        ) : (
          Object.entries(groupedMessages).map(([date, messages]) => (
            <div key={date} className="space-y-4">
              <DateSeparator date={date} />

              {messages.map((message) => (
                <div key={message.id} className="relative">
                  <ChatMessage message={message} />
                </div>
              ))}
              {sendingMessage && (
                <div className="flex justify-end opacity-50">
                  <div className="bg-pink-100 rounded-2xl px-4 py-3 max-w-md">
                    <Typography as="p" variant="caption-rg-14" color="text-1">
                      {sendingMessage}
                    </Typography>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
      {isLoading && (
        <div className="flex items-center justify-center h-full">
          <Typography as="p" variant="caption-rg-14" color="text-3">
            {t('Загрузка сообщений')}
          </Typography>
        </div>
      )}
    </>
  );
};

export default ChatMessages;
