'use client';

import Chat2Icon from '@/components/icons/Chat2Icon';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';

interface ChatInputProps {
  selectedUserId: number | null;
  onSendMessage?: (message: string) => void;
}

const ChatInput = ({ selectedUserId, onSendMessage }: ChatInputProps) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const t = useTranslations();
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim() && selectedUserId && onSendMessage) {
      onSendMessage(message.trim());
      setMessage('');
      if (inputRef.current) {
        inputRef.current.style.height = '24px';
      }
    }
  };

  return (
    <div className="border-t border-gray-200 p-4">
      <div className="flex items-center gap-3">
        <Chat2Icon className="w-5 h-5" />
        <textarea
          ref={inputRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t('Сообщение')}
          className="bg-transparent outline-none flex-1 placeholder:text-text-3 text-text-1 resize-none"
          rows={1}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = 'auto';
            target.style.height = target.scrollHeight + 'px';
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey && !e.altKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />
      </div>
    </div>
  );
};

export default ChatInput;
