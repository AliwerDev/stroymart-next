import { useAppDispatch, useAppSelector } from '@/store';
import {
  selectIsMobile,
  selectIsMobileOpen,
  selectSidebarActiveItem,
  selectSidebarExpanded,
  selectSidebarOpenSubmenu,
  setIsMobile,
  setSidebarActiveItem,
  toggleSidebarExpanded,
  toggleSidebarMobileOpen,
  toggleSidebarSubmenu,
} from '@/store/slices/uiSlice';
import { useCallback, useEffect } from 'react';

export const useSidebar = () => {
  const dispatch = useAppDispatch();

  const isExpanded = useAppSelector(selectSidebarExpanded);
  const activeItem = useAppSelector(selectSidebarActiveItem);
  const openSubmenu = useAppSelector(selectSidebarOpenSubmenu);
  const isMobile = useAppSelector(selectIsMobile);
  const isMobileOpen = useAppSelector(selectIsMobileOpen);

  const toggleSidebar = useCallback(() => {
    dispatch(toggleSidebarExpanded());
  }, [dispatch]);

  const toggleSidebarMobile = useCallback(() => {
    dispatch(toggleSidebarMobileOpen());
  }, [dispatch]);

  const setActiveItem = useCallback(
    (item: string | null) => {
      dispatch(setSidebarActiveItem(item));
    },
    [dispatch]
  );

  const toggleSubmenu = useCallback(
    (item: string) => {
      dispatch(toggleSidebarSubmenu(item));
    },
    [dispatch]
  );

  useEffect(() => {
    const handleResize = () => {
      dispatch(setIsMobile(window.innerWidth < 768));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [toggleSidebarMobile, isExpanded, dispatch]);

  return {
    isExpanded,
    activeItem,
    openSubmenu,
    isMobile,
    isMobileOpen,
    toggleSidebar,
    toggleSidebarMobile,
    setActiveItem,
    toggleSubmenu,
  };
};
