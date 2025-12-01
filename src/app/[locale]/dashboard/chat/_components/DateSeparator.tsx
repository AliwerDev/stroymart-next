'use client';

import Typography from '@/components/ui/Typography';
import { MONTHS } from '@/constants/other';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useLocale } from 'next-intl';

dayjs.extend(customParseFormat);

interface DateSeparatorProps {
  date: string;
}

const DateSeparator = ({ date }: DateSeparatorProps) => {
  const locale = useLocale() as keyof typeof MONTHS;

  const parsedDate = dayjs(date, 'DD.MM.YYYY');
  const day = parsedDate.format('DD');
  const monthIndex = parsedDate.month();

  const monthName = MONTHS[locale]?.[monthIndex] || MONTHS.uz[monthIndex];
  const formattedDate = `${day} ${monthName}`;

  return (
    <div className="flex justify-center">
      <div className="bg-gray-100 text-text-3 px-4 py-2 rounded-full text-sm">
        <Typography as="span" variant="caption-rg-14" color="text-3">
          {formattedDate}
        </Typography>
      </div>
    </div>
  );
};

export default DateSeparator;