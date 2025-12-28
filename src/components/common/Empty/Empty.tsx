import { Typography } from 'antd';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

type EmptyProps = {
  text?: string;
  height?: number;
  hideText?: boolean;
};

const Empty = ({ text, height = 280, hideText = false }: EmptyProps) => {
  const t = useTranslations();
  return (
    <div className="flex flex-col items-center justify-center" style={{ height: `${height}px` }}>
      <div className="w-[200px] h-[150px] flex items-center justify-center mb-2">
        <Image
          src="/images/empty.png"
          alt="empty"
          width={200}
          height={150}
          className="w-auto h-[100px]"
        />
      </div>
      {!hideText && (
        <Typography className="max-w-[300px] text-center text-text3">
          {text || t('Data not found')}
        </Typography>
      )}
    </div>
  );
};

export default Empty;
