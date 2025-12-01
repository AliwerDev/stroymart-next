import { usePathname, useRouter } from '@/i18n/navigation';
import { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

const useAppNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryParams = useCallback(() => new URLSearchParams(window.location.search), []);

  const pushToRouter = useCallback(
    (params: URLSearchParams, options: NavigateOptions = {}) => {
      router.push(`${pathname}?${params.toString()}`, options);
    },
    [router, pathname]
  );

  const shallowPush = (params: URLSearchParams) => {
    window.history.pushState(null, '', `?${params.toString()}`);
  };

  return {
    router,
    pathname,
    searchParams,
    createQueryParams,
    pushToRouter,
    shallowPush,
  };
};

export default useAppNavigation;
