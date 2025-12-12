'use client';

import { ConfirmModalProvider } from '@/components/common/ConfirmModal/ConfirmModalProvider';
import { SidebarProvider } from '@/context/SidebarContext';
import { useLocale } from 'next-intl';
import { ReactNode, Suspense } from 'react';
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
            <Suspense>
              <SidebarProvider>
                <ConfirmModalProvider>
                  <AntdProvider>{children}</AntdProvider>
                </ConfirmModalProvider>
              </SidebarProvider>
            </Suspense>
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
