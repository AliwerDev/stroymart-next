import { SelectOption } from '@/components/fields/Select';

// Gender options
export const GENDER_OPTIONS: SelectOption<number>[] = [
  { label: 'Erkak', value: 1 },
  { label: 'Ayol', value: 2 },
];

// Gym status options
export const GYM_STATUS_OPTIONS: SelectOption<number>[] = [
  { label: 'Aktiv', value: 300 },
  { label: 'Aktiv emas', value: 400 },
];

// Payment types
export const PAYMENT_TYPES: SelectOption<number>[] = [
  { label: 'Click', value: 1 },
  { label: 'Payme', value: 2 },
  { label: 'Naqd', value: 3 },
] as const;

// Discount types
export const DISCOUNT_TYPES: SelectOption<number>[] = [
  { label: '%', value: 1 },
  { label: 'UZS', value: 2 },
] as const;

// Payment reasons
export const PAYMENT_REASONS: SelectOption<number>[] = [
  { label: 'Abonement', value: 1 },
  { label: "Mashg'ulot", value: 2 },
] as const;
