'use client';

import { SidebarProvider } from '@/context/SidebarContext';
import { useLocale } from 'next-intl';
import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import AntdProvider from './AntdProvider';
import IntlErrorHandlingProvider from './IntlErrorHandlingProvider';
import ReduxProvider from './ReduxProvider';
import SessionProvider from './SessionProvider';
import TanStackProvider from './TanStackProvider';

interface MainProviderProps {
  children: ReactNode;
}

const MainProvider = ({ children }: MainProviderProps) => {
  const locale = useLocale();
  return (
    <IntlErrorHandlingProvider locale={locale}>
      <ReduxProvider>
        <SessionProvider>
          <TanStackProvider>
            <SidebarProvider>
              <AntdProvider>{children}</AntdProvider>
            </SidebarProvider>
            <Toaster
              position="top-center"
              toastOptions={{ duration: 3000 }}
              reverseOrder={false}
              containerStyle={{ zIndex: 9999999 }}
              gutter={8}
            />
          </TanStackProvider>
        </SessionProvider>
      </ReduxProvider>
    </IntlErrorHandlingProvider>
  );
};

export default MainProvider;
