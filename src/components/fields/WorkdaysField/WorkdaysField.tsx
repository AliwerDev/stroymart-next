import { dayLabels } from '@/constants/other';
import { cn } from '@/lib/utils'; // adjust path to your cn function
import { useState } from 'react';

interface WorkdaysFieldProps {
  className?: string;
  value?: number[];
  disabledDays?: number[];
  onChange?: (days: number[]) => void;
  error?: boolean;
}

const WorkdaysField = ({
  className,
  value = [],
  onChange,
  disabledDays = [],
  error,
}: WorkdaysFieldProps) => {
  const [selected, setSelected] = useState<number[]>(value);

  const toggleDay = (dayNumber: number) => {
    const newSelected = selected.includes(dayNumber)
      ? selected.filter((d) => d !== dayNumber)
      : [...selected, dayNumber];
    setSelected(newSelected);
    onChange?.(newSelected);
  };

  const isSelected = (dayNumber: number) => {
    return selected.includes(dayNumber);
  };

  const isDisabled = (dayNumber: number) => {
    return disabledDays.includes(dayNumber);
  };

  return (
    <div
      className={cn(
        'flex w-full h-10 rounded-md bg-bunker-50 p-1 gap-1 text-bunker-900',
        error && 'bg-primary-50',
        className
      )}
    >
      {dayLabels.map((label, index) => {
        const dayNumber = index + 1; // 1-based
        return (
          <button
            key={dayNumber}
            type="button"
            onClick={() => !isDisabled(dayNumber) && toggleDay(dayNumber)}
            className={cn(
              'flex-1 rounded-md py-1 text-sm transition-colors cursor-pointer',
              isSelected(dayNumber)
                ? 'bg-primary-500 font-medium text-white'
                : 'bg-white text-bunker-500 hover:bg-bunker-100',
              isDisabled(dayNumber) && '!bg-white cursor-not-allowed text-bunker-200'
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default WorkdaysField;
