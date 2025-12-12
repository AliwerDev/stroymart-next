import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

interface StatusProps {
  onChange?: (status: number) => void;
  value?: number;
}

const Status = ({ onChange, value }: StatusProps) => {
  const t = useTranslations();

  const toggle = (isActive: boolean) => {
    if (onChange) {
      onChange(isActive ? 10 : 9);
    }
  };

  return (
    <div className="flex w-[300px] p-1 text-white rounded-lg border border-gray-200">
      <button
        type="button"
        className={cn(
          'w-full py-1.5 rounded-lg cursor-pointer',
          value === 10 ? 'bg-green-700' : 'bg-transparent text-text-1'
        )}
        onClick={() => toggle(true)}
      >
        {t('Faol')}
      </button>
      <button
        type="button"
        className={cn(
          'w-full py-1.5 rounded-lg cursor-pointer',
          value === 9 ? 'bg-red-700' : 'bg-transparent text-text-1'
        )}
        onClick={() => toggle(false)}
      >
        {t('Faol emas')}
      </button>
    </div>
  );
};

export default Status;
