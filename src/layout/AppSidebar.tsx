/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { ChevronDownIcon } from '@/components/icons';
import { useSidebar } from '@/context/SidebarContext';
import useSidebarMenu, { NavItem } from '@/hooks/useSidebarMenu';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen } = useSidebar();
  const pathname = usePathname();
  const pathWithoutLocale = pathname.replace(/^\/\w+/, '');
  const navItems = useSidebarMenu();
  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<number, number>>({});
  const subMenuRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const isActive = useCallback(
    (path: string) => {
      if (path === '/dashboard') {
        return pathWithoutLocale === path;
      }
      return pathWithoutLocale.startsWith(path);
    },
    [pathWithoutLocale]
  );

  useEffect(() => {
    let submenuMatched = false;
    navItems.forEach((nav, index) => {
      if (nav.subItems) {
        nav.subItems.forEach((subItem) => {
          if (isActive(subItem.path)) {
            setOpenSubmenu(index);
            submenuMatched = true;
          }
        });
      }
    });
    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [pathname, isActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = openSubmenu;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number) => {
    setOpenSubmenu((prevOpenSubmenu) => (prevOpenSubmenu === index ? null : index));
  };

  const renderMenuItems = (navItems: NavItem[]) => (
    <ul className="flex flex-col">
      {navItems.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index)}
              className={twMerge(
                'relative flex items-center w-full gap-2 px-3 py-2 font-medium text-base transition-colors duration-200 border-l-4 border-transparent group',
                openSubmenu === index
                  ? 'text-brand-500 border-l-4 border-brand-500'
                  : 'text-gray-700 hover:text-gray-900',
                !isExpanded ? 'lg:justify-center' : 'lg:justify-start'
              )}
            >
              <span
                className={
                  openSubmenu === index
                    ? 'text-brand-500'
                    : 'text-gray-500 group-hover:text-gray-700'
                }
              >
                {nav.icon}
              </span>
              {(isExpanded || isMobileOpen) && <span>{nav.name}</span>}
              {(isExpanded || isMobileOpen) && (
                <ChevronDownIcon
                  className={twMerge(
                    'ml-auto w-5 h-5 transition-transform duration-200',
                    openSubmenu === index ? 'rotate-180 text-brand-500' : 'text-gray-500'
                  )}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                href={nav.path}
                className={twMerge(
                  'relative flex items-center w-full gap-3 px-3 py-2 font-medium text-base transition-colors duration-200 border-l-4 border-transparent group',
                  isActive(nav.path)
                    ? 'text-brand-500 border-l-4 border-brand-500'
                    : 'text-gray-700 hover:text-gray-900',
                  !isExpanded ? 'lg:justify-center' : 'lg:justify-start'
                )}
              >
                <span
                  className={
                    isActive(nav.path)
                      ? 'text-brand-500'
                      : 'text-gray-500 group-hover:text-gray-700'
                  }
                >
                  {nav.icon}
                </span>
                {(isExpanded || isMobileOpen) && <span>{nav.name}</span>}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[index] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height: openSubmenu === index ? `${subMenuHeight[index]}px` : '0px',
              }}
            >
              <ul className="ml-9 mt-1">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      href={subItem.path}
                      className={twMerge(
                        'relative flex items-center gap-3 px-3 py-2 text-base font-medium transition-colors duration-200',
                        isActive(subItem.path)
                          ? 'text-brand-500'
                          : 'text-gray-700 hover:text-gray-900'
                      )}
                    >
                      {subItem.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-14 flex flex-col lg:mt-0 top-0 left-0 bg-white text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${isExpanded || isMobileOpen ? 'w-[250px]' : 'w-[90px]'}
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0`}
    >
      <div className={`py-3 px-3 flex  ${!isExpanded ? 'lg:justify-center' : 'justify-start'}`}>
        <Link href="/">
          {isExpanded || isMobileOpen ? (
            <>
              <Image
                src="/images/logo-admin.png"
                alt="Logo-admin"
                width={120}
                height={40}
                className="w-auto h-10"
              />
            </>
          ) : (
            <Image
              className="object-contain"
              src="/images/logo-admin.png"
              alt="Logo-admin"
              width={40}
              height={40}
            />
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-4">
          <div className="flex flex-col gap-3">
            <div>
              <h2
                className={`mb-3 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded ? 'lg:justify-center' : 'justify-start'
                }`}
              ></h2>
              {renderMenuItems(navItems)}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
