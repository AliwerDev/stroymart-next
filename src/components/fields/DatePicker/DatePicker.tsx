'use client';

import Calendar2Icon from '@/components/icons/Calendar2Icon';
import ClockIcon from '@/components/icons/ClockIcon';
import { cn, isValidDate, isValidTime } from '@/lib/utils';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Input from '../Input';

dayjs.extend(customParseFormat);

interface DatePickerProps {
  className?: string;
  mode?: 'date' | 'time';
  placeholder?: string;
  label?: string;
  error?: boolean;
  required?: boolean;
  disabled?: boolean;
  onChange?: (date: string) => void;
  value?: string;
  inputProps?: React.ComponentProps<typeof Input>;
  iconRight?: boolean;
}

const formDateFormat = 'YYYY-MM-DD';
const displayDateFormat = 'DD.MM.YYYY';

export default function DatePicker({
  className,
  mode = 'date',
  error,
  onChange,
  value,
  inputProps,
  disabled,
  iconRight = true,
  placeholder,
  ...props
}: DatePickerProps) {
  const [textValue, setTextValue] = useState<string>('');

  const date =
    mode === 'date' && value && dayjs(value, formDateFormat).isValid()
      ? dayjs(value, formDateFormat)
      : null;

  const handleSelect = (date: Date | null) => {
    if (mode === 'date') {
      const dateString = dayjs(date).format(formDateFormat);
      const displayString = dayjs(date).format(displayDateFormat);

      if (value !== dateString) {
        setTextValue(displayString);
        onChange?.(dateString || '');
      }
    }
  };

  const handleTimeChange = (date: Date | null) => {
    if (mode === 'time') {
      const timeString = dayjs(date).format('HH:mm');
      onChange?.(timeString?.trim() || '');
    }
  };

  useEffect(() => {
    if (mode === 'date') {
      if (isValidDate(textValue)) {
        const [day, month, year] = textValue.split('.');
        onChange?.(`${year}-${month}-${day}`);
      } else if (value) {
        onChange?.('');
      }
    } else if (isValidTime(textValue)) {
      onChange?.(textValue?.trim() || '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textValue]);

  useEffect(() => {
    if (mode === 'date') {
      const displayValue = dayjs(value, formDateFormat).format(displayDateFormat);
      if (value && displayValue !== textValue) {
        setTextValue(displayValue);
      }
    } else if (mode === 'time' && value !== textValue) {
      setTextValue(value?.trim() || '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const icon =
    mode === 'time' ? (
      <ClockIcon
        className={cn('text-text-1 cursor-pointer', error ? 'text-primary-500' : '')}
        width={20}
      />
    ) : (
      <Calendar2Icon
        className={cn('text-text-1 cursor-pointer', error ? 'text-primary-500' : '')}
        width={20}
      />
    );

  const onBlur = () => {
    if (mode === 'date' && value !== textValue) {
      setTextValue(value ? dayjs(value, formDateFormat).format(displayDateFormat) : '');
    }
    if (mode === 'time' && value !== textValue) {
      setTextValue(value?.trim() || '');
    }
  };

  return (
    <div className="relative w-full [&>.react-datepicker-wrapper]:w-full">
      <ReactDatePicker
        selected={date ? date?.toDate() : null}
        onSelect={handleSelect}
        placeholderText={placeholder || (date ? 'Sanani tanlang' : 'Soatni tanlang')}
        shouldCloseOnSelect
        onChange={handleTimeChange}
        customInput={
          <div className="w-full">
            <Input
              {...inputProps}
              type={mode}
              className="w-full"
              onBlur={onBlur}
              placeholder={placeholder || (mode === 'date' ? 'DD.MM.YYYY' : 'Tanlang')}
              disabled={disabled}
              error={error}
              value={textValue}
              onChange={(v) => setTextValue(v as string)}
              startIcon={!iconRight ? icon : undefined}
              endIcon={iconRight ? icon : undefined}
            />
          </div>
        }
        popperPlacement="bottom-start"
        className={className}
        showTimeSelect={mode === 'time'}
        showTimeSelectOnly={mode === 'time'}
        timeIntervals={15}
        timeFormat="HH:mm"
        popperClassName="z-[9999999]"
        calendarClassName="fc-datepicker rounded-md border border-bunker-100 bg-white p-2 shadow text-sm"
        dayClassName={() => 'w-9 flex items-center justify-center rounded-md hover:bg-bunker-50'}
        {...props}
      />
    </div>
  );
}
