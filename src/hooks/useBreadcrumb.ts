/* eslint-disable react-hooks/exhaustive-deps */
import { useAppDispatch } from '@/store';
import {
  addBreadcrumb,
  clearBreadcrumbs,
  removeBreadcrumb,
  setBreadcrumbLoading,
  setBreadcrumbs,
} from '@/store/slices/breadcrumbSlice';
import { BreadcrumbItem } from '@/types/other';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export const useBreadcrumb = (defaultBreadcrumbs: BreadcrumbItem[] = []) => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const setBreadcrumbsList = (items: BreadcrumbItem[]) => {
    dispatch(setBreadcrumbs(items));
  };

  const addBreadcrumbItem = (item: BreadcrumbItem) => {
    dispatch(addBreadcrumb(item));
  };

  const removeBreadcrumbItem = (index: number) => {
    dispatch(removeBreadcrumb(index));
  };

  const clearBreadcrumbsList = () => {
    dispatch(clearBreadcrumbs());
  };

  const setLoading = (loading: boolean) => {
    dispatch(setBreadcrumbLoading(loading));
  };

  useEffect(() => {
    if (defaultBreadcrumbs.length > 0) {
      setBreadcrumbsList(defaultBreadcrumbs);
    }
  }, [pathname]);

  return {
    setBreadcrumbs: setBreadcrumbsList,
    addBreadcrumb: addBreadcrumbItem,
    removeBreadcrumb: removeBreadcrumbItem,
    clearBreadcrumbs: clearBreadcrumbsList,
    setLoading,
  };
};
