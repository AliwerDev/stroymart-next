import Typography from '@/components/ui/Typography';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const EmptyChat = ({ message }: { message?: string }) => {
  const t = useTranslations();
  return (
    <div className="flex justify-center flex-col items-center h-full">
      <Image src={'/images/chat-empty-image.png'} alt="chat-empty-image" width={120} height={120} />
      <Typography variant="subtitle-rg-16" color="text-3" className="text-center max-w-[250px]">
        {message || t('Выберите чат, чтобы написать сообщение')}
      </Typography>
    </div>
  );
};

export default EmptyChat;
