'use client';

import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';

interface IntlErrorHandlingProviderProps {
  locale: string;
  children: ReactNode;
}

export default function IntlErrorHandlingProvider({
  children,
  locale,
}: IntlErrorHandlingProviderProps) {
  return (
    <NextIntlClientProvider
      locale={locale}
      onError={(error) => {
        if (error.code === 'MISSING_MESSAGE') {
          // faqat key yo‘q bo‘lsa log yozmang
          return;
        }
        console.error(error);
      }}
    >
      {children}
    </NextIntlClientProvider>
  );
}
