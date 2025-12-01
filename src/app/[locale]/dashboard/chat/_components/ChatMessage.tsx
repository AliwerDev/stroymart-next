'use client';

import Typography from '@/components/ui/Typography';
import { formatTime } from '@/lib/utils';
import { ChatMessage as ChatMessageType } from '@/types/chat';
import Image from 'next/image';

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  if (message.message_type === 1) {
    return (
      <div className="flex items-start gap-3">
        <Image
          src={'/images/avatar.png'}
          alt="user-avatar"
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <Typography as="span" variant="footnote-rg-12" color="text-3">
              {formatTime(message.created_at)}
            </Typography>
          </div>
          <div className="bg-gray-100 rounded-2xl px-4 py-3 !max-w-md">
            <Typography as="p" variant="caption-rg-14" className="break-words" color="text-1">
              {message.message}
            </Typography>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-end">
      <div className="flex flex-col items-end max-w-md">
        <div className="flex items-center gap-2 mb-1">
          <Typography as="span" variant="footnote-rg-12" color="text-3">
            {formatTime(message.created_at)}
          </Typography>
        </div>
        <div className="!max-w-md">
          <div className="bg-pink-100 rounded-2xl px-4 py-3">
            <Typography as="p" variant="caption-rg-14" className="break-words" color="text-1">
              {message.message}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
