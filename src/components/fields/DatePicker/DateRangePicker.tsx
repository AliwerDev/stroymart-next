'use client';

import Calendar2Icon from '@/components/icons/Calendar2Icon';
import { cn, isValidDate } from '@/lib/utils';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Input from '../Input';

dayjs.extend(customParseFormat);

export interface DateRangeValue {
  startDate?: string; // YYYY-MM-DD
  endDate?: string; // YYYY-MM-DD
}

interface DateRangePickerProps {
  className?: string;
  disabled?: boolean;
  error?: boolean;
  value?: DateRangeValue;
  onChange?: (range: DateRangeValue) => void;
  inputProps?: React.ComponentProps<typeof Input>;
  placeholder?: { start?: string; end?: string };
}

const formDateFormat = 'YYYY-MM-DD';
const displayDateFormat = 'DD.MM.YYYY';

export default function DateRangePicker({
  className,
  disabled,
  error,
  value,
  onChange,
  inputProps,
  placeholder,
}: DateRangePickerProps) {
  const [startTextValue, setStartTextValue] = useState<string>('');
  const [endTextValue, setEndTextValue] = useState<string>('');
  const [activeInput, setActiveInput] = useState<'start' | 'end' | null>(null);

  const startDate =
    value?.startDate && dayjs(value.startDate, formDateFormat).isValid()
      ? dayjs(value.startDate, formDateFormat).toDate()
      : null;
  const endDate =
    value?.endDate && dayjs(value.endDate, formDateFormat).isValid()
      ? dayjs(value.endDate, formDateFormat).toDate()
      : null;

  const setRange = (start?: Date | null, end?: Date | null) => {
    const startString =
      start && dayjs(start).isValid() ? dayjs(start).format(formDateFormat) : undefined;
    const endString = end && dayjs(end).isValid() ? dayjs(end).format(formDateFormat) : undefined;

    const startDisplay =
      start && dayjs(start).isValid() ? dayjs(start).format(displayDateFormat) : '';
    const endDisplay = end && dayjs(end).isValid() ? dayjs(end).format(displayDateFormat) : '';

    setStartTextValue(startDisplay);
    setEndTextValue(endDisplay);

    onChange?.({ startDate: startString, endDate: endString });
  };

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;

    // If both selected, ensure end >= start
    if (start && end) {
      const s = dayjs(start);
      const e = dayjs(end);
      if (e.isBefore(s)) {
        setRange(end, start);
      } else {
        setRange(start, end);
      }
      setActiveInput(null);
      return;
    }

    // Only start selected
    if (start && !end) {
      setRange(start, null);
      setActiveInput('end');
      return;
    }

    // Cleared selection
    setRange(null, null);
  };

  // Manual typing support
  useEffect(() => {
    const bothValid = isValidDate(startTextValue) && isValidDate(endTextValue);
    const startValidOnly = isValidDate(startTextValue) && !endTextValue;

    if (bothValid) {
      const [sd, sm, sy] = startTextValue.split('.');
      const [ed, em, ey] = endTextValue.split('.');
      const s = dayjs(`${sy}-${sm}-${sd}`);
      const e = dayjs(`${ey}-${em}-${ed}`);

      if (!s.isValid() || !e.isValid()) return;

      if (e.isBefore(s)) {
        onChange?.({ startDate: e.format(formDateFormat), endDate: s.format(formDateFormat) });
        setStartTextValue(e.format(displayDateFormat));
        setEndTextValue(s.format(displayDateFormat));
      } else {
        onChange?.({ startDate: s.format(formDateFormat), endDate: e.format(formDateFormat) });
      }
    } else if (startValidOnly) {
      const [sd, sm, sy] = startTextValue.split('.');
      const s = dayjs(`${sy}-${sm}-${sd}`);
      if (s.isValid()) {
        onChange?.({ startDate: s.format(formDateFormat), endDate: undefined });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startTextValue, endTextValue]);

  // Sync external value to display
  useEffect(() => {
    const displayStart = value?.startDate
      ? dayjs(value.startDate, formDateFormat).format(displayDateFormat)
      : '';
    const displayEnd = value?.endDate
      ? dayjs(value.endDate, formDateFormat).format(displayDateFormat)
      : '';

    if (displayStart !== startTextValue) setStartTextValue(displayStart);
    if (displayEnd !== endTextValue) setEndTextValue(displayEnd);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value?.startDate, value?.endDate]);

  const icon = (
    <Calendar2Icon
      className={cn('text-text-1 cursor-pointer', error ? 'text-primary-500' : '')}
      width={20}
    />
  );

  const onStartBlur = () => {
    const formatted = value?.startDate
      ? dayjs(value.startDate, formDateFormat).format(displayDateFormat)
      : '';
    if (formatted !== startTextValue) setStartTextValue(formatted);
  };
  const onEndBlur = () => {
    const formatted = value?.endDate
      ? dayjs(value.endDate, formDateFormat).format(displayDateFormat)
      : '';
    if (formatted !== endTextValue) setEndTextValue(formatted);
  };

  const CustomInput = ({ onClick, which }: { onClick?: () => void; which: 'start' | 'end' }) => {
    const isStart = which === 'start';
    const textValue = isStart ? startTextValue : endTextValue;
    const setText = isStart ? setStartTextValue : setEndTextValue;
    const onBlur = isStart ? onStartBlur : onEndBlur;
    const ph = isStart
      ? placeholder?.start || displayDateFormat
      : placeholder?.end || displayDateFormat;

    return (
      <div className="w-full" onClick={onClick}>
        <Input
          {...inputProps}
          type="date"
          className="w-full"
          onBlur={onBlur}
          placeholder={ph}
          disabled={disabled}
          error={!!error}
          value={textValue}
          onChange={(v) => setText(v as string)}
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
          startDate={startDate}
          endDate={endDate}
          selectsRange
          onChange={handleDateChange}
          shouldCloseOnSelect={false}
          customInput={<CustomInput which="start" />}
          popperPlacement="bottom-start"
          calendarClassName="fc-datepicker rounded-md border border-bunker-100 bg-white p-2 shadow text-sm"
          dayClassName={() => 'w-9 flex items-center justify-center rounded-md hover:bg-bunker-50'}
          open={activeInput === 'start'}
          onClickOutside={() => setActiveInput(null)}
        />
      </div>
      <div className="flex-1 relative [&>.react-datepicker-wrapper]:w-full">
        <ReactDatePicker
          selected={endDate}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          onChange={handleDateChange}
          shouldCloseOnSelect
          customInput={<CustomInput which="end" />}
          popperPlacement="bottom-start"
          calendarClassName="fc-datepicker rounded-md border border-bunker-100 bg-white p-2 shadow text-sm"
          dayClassName={() => 'w-9 flex items-center justify-center rounded-md hover:bg-bunker-50'}
          open={activeInput === 'end'}
          onClickOutside={() => setActiveInput(null)}
        />
      </div>
    </div>
  );
}
