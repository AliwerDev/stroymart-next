import Tag from '@/components/ui/Tag';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { ReactNode } from 'react';

interface InforCardNewProps {
  items: InforCardNewItem[];
  title?: string;
  className?: string;
  status?: number;
  statusType?: 'payment' | 'user';
}

interface InforCardNewItem {
  label: string;
  value?: string | number | undefined;
  children?: ReactNode;
}

const InforCardNew = ({
  items,
  title,
  className,
  status,
  statusType = 'user',
}: InforCardNewProps) => {
  const t = useTranslations();

  const renderStatus = () => {
    if (status === undefined) {
      return null;
    }

    if (statusType === 'user') {
      return (
        <div>
          {status === 300 ? (
            <Tag variant="success" label={t('Faol')} />
          ) : status === 400 ? (
            <Tag variant="danger" label={t('Faol emas')} />
          ) : (
            <Tag variant="info" label={t('Status topilmadi')} />
          )}
        </div>
      );
    }

    if (statusType === 'payment') {
      return (
        <Tag
          label={status === 300 ? t('Оплачено') : t('Оплачен')}
          variant={status === 300 ? 'success' : 'danger'}
        />
      );
    }

    return null;
  };

  return (
    <div className={cn(`p-5 bg-background-500 rounded-xl`, className)}>
      <div className="flex justify-between items-center">
        {title && <h3 className="pb-2.5">{title}</h3>}
        {renderStatus()}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-32 gap-3 mt-4">
        {items.map((item) => (
          <div
            key={item.label}
            className={cn(
              'flex items-center justify-between gap-2 border-b-2 border-bunker-100 border-dashed'
            )}
          >
            <p className="text-base leading-6 font-normal text-bunker-600 mb-2.5">{item.label}</p>
            {item.children ? (
              item.children
            ) : (
              <p className="text-base leading-6 font-medium text-bunker-950 whitespace-pre-wrap">
                {item.value}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InforCardNew;
