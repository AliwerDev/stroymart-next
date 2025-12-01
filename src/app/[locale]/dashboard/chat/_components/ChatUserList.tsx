'use client';

import Empty from '@/components/common/Empty';
import Show from '@/components/common/Show';
import Typography from '@/components/ui/Typography';
import { formatTime } from '@/lib/utils';
import { ChatUser } from '@/types/chat';
import get from 'lodash.get';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
interface ChatUserListProps {
  users: ChatUser[];
  selectedUser: number | null;
  onUserSelect: (userId: number) => void;
  isLoading?: boolean;
}

const ChatUserList = ({
  users = [],
  selectedUser,
  onUserSelect,
  isLoading = false,
}: ChatUserListProps) => {
  const t = useTranslations();

  return (
    <div
      className="chat-users custom-scrollbar h-full w-[350px] max-w-[85vw] overflow-y-auto bg-white"
      style={{
        borderRight: '1px solid #919EAB33',
      }}
    >
      {isLoading ? (
        <div className="flex items-center justify-center h-32">
          <Typography as="p" variant="caption-rg-14" color="text-3">
            {t('Загрузка пользователей')}
          </Typography>
        </div>
      ) : users.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <Empty text={t('Пользователи не найдены')} />
        </div>
      ) : (
        users.map((user) => (
          <div
            key={user.id}
            className={`md:py-3 py-2 md:px-5 px-3 flex items-center gap-4 max-w-full hover:bg-warm-gray cursor-pointer transition-all duration-300 ${
              selectedUser === user.id ? 'bg-warm-gray' : ''
            }`}
            onClick={() => onUserSelect(user.id)}
          >
            <div className="relative">
              <Image
                src="/images/avatar.png"
                alt="chat-user"
                width={48}
                height={48}
                className="rounded-full overflow-hidden object-cover min-h-10 min-w-10 md:min-h-12 md:min-w-12"
              />
            </div>
            <div className="w-[calc(100%-48px-16px)]">
              <div className="flex items-center justify-between gap-1">
                <Typography
                  as="p"
                  variant="caption-sm-14"
                  color="text-1"
                  className="flex-1 truncate break-all"
                >
                  {user.first_name} {user.last_name}
                </Typography>
                <Typography as="p" variant="caption-rg-14" color="text-3">
                  {formatTime(get(user, 'last_message.created_at', ''))}
                </Typography>
              </div>
              <div className="flex gap-1 items-center">
                <Typography
                  as="p"
                  variant="caption-rg-14"
                  color="text-3"
                  className="truncate break-all flex-1"
                >
                  {get(user, 'last_message.message', '') || t('Нет сообщений')}
                </Typography>
                <Show when={user.has_unread_messages}>
                  <div className="w-[10px] h-[10px] bg-primary-500 rounded-full"></div>
                </Show>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ChatUserList;
