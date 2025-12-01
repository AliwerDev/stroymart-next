'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

interface UseUrlParamsOptions<T extends Record<string, string>> {
  defaultValues?: Partial<T>;
  paramKeys?: (keyof T)[];
  onParamsChange?: (params: Partial<T>) => void;
}

export function useUrlParams<T extends Record<string, string>>({
  defaultValues = {},
  paramKeys,
  onParamsChange,
}: UseUrlParamsOptions<T> = {}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL paramlarini olish
  const params = useMemo(() => {
    const paramsObj: Partial<T> = {};

    // Faqat kerakli paramlarni olish
    searchParams?.forEach((value, key) => {
      const shouldInclude =
        !paramKeys || paramKeys.length === 0 || paramKeys.includes(key as keyof T);
      if (shouldInclude) {
        paramsObj[key as keyof T] = value as T[keyof T];
      }
    });

    // Default qiymatlarni qo‘shish
    Object.entries(defaultValues).forEach(([key, value]) => {
      if (paramsObj[key as keyof T] === undefined && value !== undefined && value !== null) {
        paramsObj[key as keyof T] = value as T[keyof T];
      }
    });

    return paramsObj;
  }, [searchParams, defaultValues, paramKeys]);

  // Paramlarni yangilash
  const setParams = useCallback(
    (newParams: Partial<T>) => {
      const updatedParams = new URLSearchParams(searchParams?.toString());
      let hasChanges = false;

      Object.entries(newParams).forEach(([key, value]) => {
        if (value === undefined || value === null || value === '') {
          if (updatedParams.has(key)) {
            updatedParams.delete(key);
            hasChanges = true;
          }
        } else {
          if (updatedParams.get(key) !== String(value)) {
            updatedParams.set(key, String(value));
            hasChanges = true;
          }
        }
      });

      if (hasChanges) {
        const queryString = updatedParams.toString();
        const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
        router.replace(newUrl, { scroll: false });
        onParamsChange?.({ ...params, ...newParams });
      }
    },
    [searchParams, pathname, router, params, onParamsChange]
  );

  // Hammasini reset qilish
  const resetParams = useCallback(() => {
    router.replace(pathname, { scroll: false });
    onParamsChange?.({});
  }, [pathname, router, onParamsChange]);

  return { params, setParams, resetParams };
}
