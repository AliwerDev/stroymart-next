import { Metadata } from 'next';
import { Inter } from 'next/font/google';
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className={inter.variable}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
