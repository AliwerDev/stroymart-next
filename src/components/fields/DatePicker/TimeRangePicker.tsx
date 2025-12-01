'use client';

import ClockIcon from '@/components/icons/ClockIcon';
import { cn, isValidTime } from '@/lib/utils';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Input from '../Input';

export interface TimeRangeValue {
  startTime?: string; // HH:mm
  endTime?: string; // HH:mm
}

interface TimeRangePickerProps {
  className?: string;
  disabled?: boolean;
  error?: boolean;
  value?: TimeRangeValue;
  onChange?: (range: TimeRangeValue) => void;
  inputProps?: React.ComponentProps<typeof Input>;
  placeholder?: { start?: string; end?: string };
  timeIntervals?: number; // minutes step
}

const TIME_FORMAT = 'HH:mm';

export default function TimeRangePicker({
  className,
  disabled,
  error,
  value,
  onChange,
  inputProps,
  placeholder,
  timeIntervals = 15,
}: TimeRangePickerProps) {
  const [startTextValue, setStartTextValue] = useState<string>('');
  const [endTextValue, setEndTextValue] = useState<string>('');
  const [activeInput, setActiveInput] = useState<'start' | 'end' | null>(null);

  const today = useMemo(() => dayjs().startOf('day'), []);

  const parseTimeToDate = (time?: string): Date | null => {
    if (!time || !isValidTime(time)) return null;
    const [h, m] = time.split(':');
    return today.hour(Number(h)).minute(Number(m)).toDate();
  };

  const formatDateToTime = (date: Date | null | undefined): string => {
    return date ? dayjs(date).format(TIME_FORMAT) : '';
  };

  const startDate = parseTimeToDate(value?.startTime);
  const endDate = parseTimeToDate(value?.endTime);

  const minutesOf = (t: string) => {
    const [h, m] = t.split(':');
    return Number(h) * 60 + Number(m);
  };

  const ensureOrdered = (a?: string, b?: string): [string | undefined, string | undefined] => {
    if (a && b && minutesOf(b) < minutesOf(a)) return [b, a];
    return [a, b];
  };

  const setRange = (start?: string, end?: string) => {
    const [s, e] = ensureOrdered(start, end);
    setStartTextValue(s || '');
    setEndTextValue(e || '');
    onChange?.({ startTime: s, endTime: e });
  };

  const handleStartChange = (date: Date | null) => {
    const t = formatDateToTime(date);
    if (!t) {
      setRange(undefined, value?.endTime);
      return;
    }
    setRange(t, value?.endTime);
    setActiveInput('end');
  };

  const handleEndChange = (date: Date | null) => {
    const t = formatDateToTime(date);
    if (!t) {
      setRange(value?.startTime, undefined);
      return;
    }
    setRange(value?.startTime, t);
    setActiveInput(null);
  };

  // Manual typing support
  useEffect(() => {
    const bothValid = isValidTime(startTextValue) && isValidTime(endTextValue);
    const startValidOnly = isValidTime(startTextValue) && !endTextValue;

    if (bothValid) {
      const [s, e] = ensureOrdered(startTextValue, endTextValue);
      if (s !== value?.startTime || e !== value?.endTime) {
        onChange?.({ startTime: s, endTime: e });
        setStartTextValue(s || '');
        setEndTextValue(e || '');
      }
    } else if (startValidOnly) {
      if (startTextValue !== value?.startTime) {
        onChange?.({ startTime: startTextValue, endTime: undefined });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startTextValue, endTextValue]);

  // Sync external value to display
  useEffect(() => {
    if ((value?.startTime || '') !== startTextValue) setStartTextValue(value?.startTime || '');
    if ((value?.endTime || '') !== endTextValue) setEndTextValue(value?.endTime || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value?.startTime, value?.endTime]);

  const icon = (
    <ClockIcon
      className={cn('text-text-1 cursor-pointer', error ? 'text-primary-500' : '')}
      width={20}
    />
  );

  const onStartBlur = () => {
    const formatted = value?.startTime || '';
    if (formatted !== startTextValue) setStartTextValue(formatted);
  };
  const onEndBlur = () => {
    const formatted = value?.endTime || '';
    if (formatted !== endTextValue) setEndTextValue(formatted);
  };

  const CustomInput = ({ onClick, which }: { onClick?: () => void; which: 'start' | 'end' }) => {
    const isStart = which === 'start';
    const textValue = isStart ? startTextValue : endTextValue;
    const setText = isStart ? setStartTextValue : setEndTextValue;
    const onBlur = isStart ? onStartBlur : onEndBlur;
    const ph = isStart ? placeholder?.start || TIME_FORMAT : placeholder?.end || TIME_FORMAT;

    return (
      <div className="w-full" onClick={onClick}>
        <Input
          {...inputProps}
          type="time"
          className="w-full"
          onBlur={onBlur}
          placeholder={ph}
          disabled={disabled}
          error={!!error}
          value={textValue}
          onChange={(v) => setText((v as string)?.trim())}
          onFocus={() => setActiveInput(which)}
          startIcon={(which === 'start' ? 'с' : 'по') + ':'}
          endIcon={icon}
        />
      </div>
    );
  };

  return (
    <div className={cn('flex gap-4 w-full', className)}>
      <div className="flex-1 relative [&>.react-datepicker-wrapper]:w-full">
        <ReactDatePicker
          selected={startDate}
          onChange={handleStartChange}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={timeIntervals}
          timeFormat={TIME_FORMAT}
          shouldCloseOnSelect
          customInput={<CustomInput which="start" />}
          popperPlacement="bottom-start"
          className={className}
          calendarClassName="fc-datepicker rounded-md border border-bunker-100 bg-white p-2 shadow text-sm"
          open={activeInput === 'start'}
          onClickOutside={() => setActiveInput(null)}
        />
      </div>
      <div className="flex-1 relative [&>.react-datepicker-wrapper]:w-full">
        <ReactDatePicker
          selected={endDate}
          onChange={handleEndChange}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={timeIntervals}
          timeFormat={TIME_FORMAT}
          shouldCloseOnSelect
          customInput={<CustomInput which="end" />}
          popperPlacement="bottom-start"
          className={className}
          calendarClassName="fc-datepicker rounded-md border border-bunker-100 bg-white p-2 shadow text-sm"
          open={activeInput === 'end'}
          onClickOutside={() => setActiveInput(null)}
        />
      </div>
    </div>
  );
}
