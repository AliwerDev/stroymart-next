import { routing } from '@/i18n/routing';
import { Metadata } from 'next';
import { Locale, NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import './global.css';

export const metadata: Metadata = {
  title: 'Stroymart',
  description:
    'Stroymart - construction materials marketplace for builders and contractors across Uzbekistan',
};

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

type Props = {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  const messages = await getMessages();

  return (
    <html lang="uz" className={inter.variable}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
