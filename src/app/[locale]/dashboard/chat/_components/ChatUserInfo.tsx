'use client';

import LocationIcon from '@/components/icons/LocationIcon';
import PhoneIcon from '@/components/icons/PhoneIcon';
import Typography from '@/components/ui/Typography';
import { ChatUser } from '@/types/chat';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

interface ChatUserListProps {
  user: ChatUser;
}

const ChatUserInfo = ({ user }: ChatUserListProps) => {
  const t = useTranslations();

  return (
    <div className="h-full w-[240px] max-w-[85vw] pt-10 border-l border-gray-200 bg-white">
      <div className={`flex flex-col items-center gap-4`}>
        <Image
          src="/images/avatar.png"
          alt="chat-user"
          width={64}
          height={64}
          className="rounded-full overflow-hidden object-cover"
        />
        <div className="flex flex-col gap-4 w-full px-3">
          <Typography variant="body-bl-20" color="text-1" className="text-center">
            {user.first_name} {user.last_name}
          </Typography>

          <Typography variant="caption-rg-14" color="text-1" className="flex items-center gap-2">
            <LocationIcon className="w-4 h-4" />
            {user.username || t('Нет username')}
          </Typography>
          <Typography variant="caption-rg-14" color="text-1" className="flex items-center gap-2">
            <PhoneIcon className="w-4 h-4" />
            {user.phone_number || t('Нет номера телефона')}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default ChatUserInfo;
