'use client';
import PageSpinner from '@/components/common/PageSpinner/PageSpinner';
import AppHeader from '@/components/layout/AppHeader';
import AppSidebar from '@/components/layout/AppSidebar';
import useGetUserMe from '@/hooks/endpoints/admin/useGetUserMe';
import { useSidebar } from '@/hooks/useSidebar';
import { cn } from '@/lib/utils';
import { useSession } from 'next-auth/react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const { isExpanded, isMobile } = useSidebar();

  const { isPending, isLoading, isRefetching } = useGetUserMe();

  if (status === 'loading' || isPending || isLoading || isRefetching) {
    return <PageSpinner />;
  }

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <div
        className={cn(
          'flex-1 min-h-screen h-screen transition-all duration-300 ease-in-out',
          isExpanded ? 'ml-[248px]' : 'ml-[72px]',
          isMobile && 'ml-0'
        )}
      >
        <div id="main-wrapper" className="text-text-1 bg-light-gray-1 h-screen flex flex-col">
          <AppHeader />
          <div className="py-3 md:py-4 px-3 md:px-6 lg:px-[30px] overflow-y-auto custom-scrollbar min-h-[500px]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
