import { defineRouting } from 'next-intl/routing';

export const defaultLocale = 'uz';
export const locales = ['uz', 'ru', 'uzk'];

export const routing = defineRouting({
  locales,
  defaultLocale,
  localeDetection: false,
});
