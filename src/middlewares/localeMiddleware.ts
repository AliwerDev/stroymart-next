import { defaultLocale, locales } from '@/i18n/routing';
import createMiddleware from 'next-intl/middleware';

export function localeMiddleware() {
  return createMiddleware({
    locales,
    defaultLocale: defaultLocale,
    localeDetection: false,
  });
}
