'use client';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';
import UserDropdown from '@/components/header/UserDropdown';
import { ExitIcon, MenuIcon, SidebarOpenIcon } from '@/components/icons';
import { useSidebar } from '@/context/SidebarContext';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

const AppHeader: React.FC = () => {
  const [isApplicationMenuOpen, setApplicationMenuOpen] = useState(false);

  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();

  const handleToggle = () => {
    if (window.innerWidth >= 1024) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  const toggleApplicationMenu = () => {
    setApplicationMenuOpen(!isApplicationMenuOpen);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <header className="sticky top-0 flex w-full bg-white border-gray-200 z-40 lg:border-b">
      <div className="flex flex-col items-center justify-between grow lg:flex-row lg:px-6">
        <div className="flex items-center justify-between w-full gap-2 px-3 py-2 border-b border-gray-200 sm:gap-4 lg:justify-normal lg:border-b-0 lg:px-0 lg:py-3">
          <button
            className="items-center justify-center w-10 h-9 text-gray-500 border-gray-200 rounded-lg z-99999 lg:flex lg:h-10 lg:w-10 lg:border"
            onClick={handleToggle}
            aria-label="Toggle Sidebar"
          >
            {isMobileOpen ? <ExitIcon className="w-6 h-6" /> : <MenuIcon className="w-5 h-5" />}
          </button>
          <Link href="/" className="lg:hidden">
            <Image width={154} height={32} className="" src="./images/logo/logo.svg" alt="Logo" />
          </Link>
          <button
            onClick={toggleApplicationMenu}
            className="flex items-center justify-center w-10 h-9 text-gray-700 rounded-lg z-99999 hover:bg-gray-100 lg:hidden"
          >
            <SidebarOpenIcon />
          </button>

          <div id="breadcrumb-container"></div>
        </div>
        <div
          className={`${
            isApplicationMenuOpen ? 'flex' : 'hidden'
          } items-center justify-between w-full gap-4 px-5 py-3 lg:flex shadow-theme-md lg:justify-end lg:px-0 lg:shadow-none`}
        >
          <LanguageSwitcher />
          <UserDropdown />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
