/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatDate, formatNumberWithSpaces, formatPhoneNumber, formatTime } from '@/lib/utils';
import {} from 'date-fns';
import { useTranslations } from 'next-intl';
import Typography from '../../Typography';
const Cell = (value: any, _: any, __: number) => {
  return <Typography>{value}</Typography>;
};

const MoneyCell = (value: any, _: any, __: number) => {
  if (!value) return '-';
  return <Typography variant="caption-rg-14">{formatNumberWithSpaces(value)} UZS</Typography>;
};

const ExpiredMoneyCell = (value: any, _: any, __: number) => {
  if (!value) return '-';
  return (
    <Typography variant="caption-rg-14" className="line-through">
      {formatNumberWithSpaces(value)} UZS
    </Typography>
  );
};

const DateCell = (value: any, _: any, __: number) => {
  if (!value) return '-';
  return <Typography variant="caption-rg-14">{value ? formatDate(value) : '-'}</Typography>;
};

const DateTimeCell = (value: any, _: any, __: number) => {
  if (!value) return '-';
  return (
    <Typography variant="caption-rg-14">
      {value ? `${formatDate(value)} ${formatTime(value)}` : '-'}
    </Typography>
  );
};

const PhoneNumberCell = (value: any, _: any, __: number) => {
  if (!value) return '-';
  return <Typography variant="caption-rg-14">{formatPhoneNumber(value)}</Typography>;
};

const DateRangeCell = (startDate: string, endDate: string) => {
  const t = useTranslations();
  return (
    <Typography variant="caption-rg-14">
      {t('с')} {formatDate(startDate)} {t('по')} {formatDate(endDate)}
    </Typography>
  );
};

Cell.MoneyCell = MoneyCell;
Cell.DateCell = DateCell;
Cell.DateRangeCell = DateRangeCell;
Cell.PhoneNumberCell = PhoneNumberCell;
Cell.ExpiredMoneyCell = ExpiredMoneyCell;
Cell.DateTimeCell = DateTimeCell;

export default Cell;
