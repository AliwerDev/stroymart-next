/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import ChevronLeftIcon from '@/components/icons/ChevronLeftIcon';
import LogoutIcon from '@/components/icons/LogoutIcon';
import { useLogout } from '@/hooks/useLogout';
import { useSidebar } from '@/hooks/useSidebar';
import useSidebarMenu, { NavItem } from '@/hooks/useSidebarMenu';
import { Link, useRouter } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useCallback, useMemo } from 'react';
import SidebarOpenIcon from '../icons/SidebarOpenIcon';

const AppSidebar: React.FC = () => {
  const { isExpanded, toggleSidebar, isMobileOpen, isMobile, toggleSidebarMobile } = useSidebar();
  const pathname = usePathname();
  const t = useTranslations();
  const menus = useSidebarMenu();
  const { logout } = useLogout();
  const locale = useLocale();
  const router = useRouter();

  // Memoize path without locale to avoid recalculation
  const pathWithoutLocale = useMemo(() => {
    return pathname?.replace(`/${locale}`, '') || '';
  }, [pathname, locale]);

  const isActive = useCallback(
    (path: string) => {
      return path === '/dashboard'
        ? pathWithoutLocale === path
        : pathWithoutLocale?.startsWith(path);
    },
    [pathWithoutLocale]
  );

  // Memoize menu items rendering
  const menuItems = useCallback(
    (menus: NavItem[]) => {
      const shouldShowText = isExpanded || isMobile;

      return (
        <ul className="space-y-1.5">
          {menus.map((nav) => (
            <li key={nav.name}>
              {nav.path && (
                <div
                  onClick={() => {
                    toggleSidebarMobile();
                    router.push(nav.path!);
                  }}
                  className={`menu-item cursor-pointer group lg:justify-start ${
                    isActive(nav.path) ? 'menu-item-active' : 'menu-item-inactive'
                  }`}
                >
                  <span
                    className={`menu-item-icon ${isActive(nav.path) ? 'menu-item-icon-active' : 'menu-item-icon-inactive'}`}
                  >
                    {nav.icon}
                  </span>
                  <span
                    className={cn(
                      `overflow-hidden transition-opacity duration-300 ease-linear whitespace-nowrap`,
                      shouldShowText ? 'opacity-100' : 'opacity-0'
                    )}
                  >
                    {nav.name}
                  </span>
                </div>
              )}
            </li>
          ))}
        </ul>
      );
    },
    [isExpanded, isActive, isMobile]
  );

  return (
    <>
      <aside
        className={cn(
          'sidebar-container',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full',
          !isMobile && 'translate-x-0',
          isExpanded ? 'w-[248px]' : 'w-[72px]',
          isMobile && 'w-full max-w-[300px]'
        )}
      >
        <div className="flex justify-between items-center">
          <Link
            href="/dashboard"
            className={cn(
              'transition-all duration-300 ease-in-out overflow-hidden',
              isExpanded ? 'w-[88px]' : '!w-10'
            )}
          >
            <Image
              className="h-10 min-w-[88px]"
              src="/images/logo.svg"
              alt="Logo"
              priority
              width={177}
              height={40}
            />
          </Link>

          <SidebarOpenIcon
            className=" text-text-1 cursor-pointer md:hidden rotate-180"
            onClick={toggleSidebarMobile}
          />
        </div>

        <button
          className={cn(
            'sidebar-arrow-icon',
            !isExpanded ? 'sidebar-arrow-icon-active' : 'sidebar-arrow-icon-inactive'
          )}
          onClick={toggleSidebar}
        >
          <ChevronLeftIcon />
        </button>

        <div className="flex flex-1 flex-col gap-1 overflow-y-auto no-scrollbar">
          {menuItems(menus)}
        </div>

        <div
          className={`menu-item group lg:justify-start hover:bg-primary-50 hover:!text-primary-500 transition-all duration-300 ease-in-out cursor-pointer`}
          onClick={() => logout()}
        >
          <span className={`menu-item-icon`}>
            <LogoutIcon />
          </span>
          <span
            className={cn(
              `overflow-hidden transition-opacity duration-300 ease-linear whitespace-nowrap`,
              isExpanded ? 'opacity-100' : 'opacity-0'
            )}
          >
            {t('Выход')}
          </span>
        </div>
      </aside>
      <div
        onClick={toggleSidebarMobile}
        className={cn(
          'lg:hidden absolute inset-0 bg-black/50 z-[55] transition-opacity duration-400',
          isMobileOpen ? 'visable opacity-100' : 'collapse opacity-0'
        )}
      ></div>
    </>
  );
};

export default AppSidebar;
