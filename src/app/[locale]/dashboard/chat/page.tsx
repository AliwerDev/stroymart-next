/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Paper from '@/components/common/Paper/Paper';
import Show from '@/components/common/Show';
import InfoIcon from '@/components/icons/InfoIcon';
import MenuIcon from '@/components/icons/MenuIcon';
import PageHeader from '@/components/layout/PageHeader';
import useGetChatMessages from '@/hooks/endpoints/chat/useGetChatMessages';
import useGetChatUsers from '@/hooks/endpoints/chat/useGetChatUsers';
import request from '@/lib/request';
import { cn } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ChatInput from './_components/ChatInput';
import ChatMessages from './_components/ChatMessages';
import ChatUserInfo from './_components/ChatUserInfo';
import ChatUserList from './_components/ChatUserList';
import EmptyChat from './_components/EmptyChat';

const Page = () => {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [sendingMessage, setSendingMessage] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);

  // Fetch users list
  const { data: users, isLoading: usersLoading } = useGetChatUsers({});

  // Fetch messages for selected user with polling every 3 seconds
  const {
    groupedMessages,
    messages = [],
    isLoading: messagesLoading,
    isRefetching: messagesRefetching,
    refetch: refetchMessages,
  } = useGetChatMessages({
    userId: selectedUser,
    enabled: !!selectedUser,
  });

  const sendMessageMutation = useMutation({
    mutationFn: (message: string) => {
      return request.post('/chat/send-message', { message, bot_user_id: selectedUser });
    },
    onSuccess: () => {
      refetchMessages();
    },
  });

  const setReadMessageMutation = useMutation({
    mutationFn: (messages: any[]) => {
      return request.post('/chat/set-read', { messages });
    },
  });

  const sendMessage = (message: string) => {
    setSendingMessage(message);
    sendMessageMutation.mutate(message);
  };

  const handleUserSelect = (userId: number) => {
    setSelectedUser(userId);
    setIsSidebarOpen(false); // Close sidebar on mobile after selecting user

    // Update URL with selected user ID
    const params = new URLSearchParams(searchParams.toString());
    params.set('userId', userId.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  // Find selected user data
  const selectedUserData = users?.find((user: any) => user.id === selectedUser);

  const setReadMessage = () => {
    const unreadMessages = messages
      .filter((message: any) => !message.is_read)
      .map((message: any) => ({ id: message.id, is_read: true }));

    if (unreadMessages.length > 0) {
      setReadMessageMutation.mutate(unreadMessages);
    }
  };

  useEffect(() => {
    if (!messagesRefetching) {
      setSendingMessage(null);
      setReadMessage();
    }
  }, [messagesRefetching]);

  useEffect(() => {
    if (!messagesLoading) {
      setSendingMessage(null);
      setReadMessage();
    }
  }, [messagesLoading]);

  // Initialize selected user from URL on mount
  useEffect(() => {
    const userIdParam = searchParams.get('userId');
    if (userIdParam) {
      const userId = parseInt(userIdParam, 10);
      if (!isNaN(userId)) {
        setSelectedUser(userId);
      }
    }
  }, []);

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: t('Чат поддержки'), href: '/dashboard/chat' }]} />

      <Paper className="h-[calc(100vh-140px)] md:h-[calc(100vh-180px)] flex overflow-hidden relative">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden absolute top-4 left-4 z-30 p-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors"
          aria-label="Toggle menu"
        >
          <MenuIcon className="w-5 h-5" />
        </button>

        <Show when={!!selectedUser && !!selectedUserData}>
          <button
            onClick={() => setIsUserInfoOpen(!isUserInfoOpen)}
            className="lg:hidden absolute top-4 right-4 z-30 p-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors"
            aria-label="Toggle user info"
          >
            <InfoIcon className="w-5 h-5" />
          </button>
        </Show>

        <div
          className={`
            absolute lg:relative
            top-0 left-0
            h-full
            z-50
            transition-transform duration-400
            lg:translate-x-0
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          <ChatUserList
            users={users}
            selectedUser={selectedUser}
            onUserSelect={handleUserSelect}
            isLoading={usersLoading}
          />
        </div>

        <div className="flex-1 flex flex-col min-w-0">
          <Show when={!!selectedUser}>
            <ChatMessages
              groupedMessages={groupedMessages}
              messages={messages}
              isLoading={messagesLoading}
              sendingMessage={sendingMessage}
            />
            <ChatInput onSendMessage={sendMessage} selectedUserId={selectedUser} />
          </Show>

          <Show when={!selectedUser}>
            <EmptyChat />
          </Show>
        </div>

        <Show when={!!selectedUser && !!selectedUserData}>
          <div
            className={`
              absolute lg:relative
              top-0 right-0
              h-full
              z-50
              transition-transform duration-400
              lg:translate-x-0
              ${isUserInfoOpen ? 'translate-x-0' : 'translate-x-full'}
            `}
          >
            <ChatUserInfo user={selectedUserData} />
          </div>
        </Show>

        <div
          className={cn(
            'lg:hidden absolute inset-0 bg-black/50 z-30 transition-opacity duration-400',
            isSidebarOpen || isUserInfoOpen ? 'visable opacity-100' : 'collapse opacity-0'
          )}
          onClick={() => {
            setIsSidebarOpen(false);
            setIsUserInfoOpen(false);
          }}
        />
      </Paper>
    </div>
  );
};

export default Page;
