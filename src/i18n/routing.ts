import { defineRouting } from 'next-intl/routing';

export const defaultLocale = 'uz';
export const locales = ['uz', 'ru', 'uzk', 'en'];

export const routing = defineRouting({
  locales,
  defaultLocale,
  localeDetection: false,
});
