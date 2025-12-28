'use client';
import { ChevronDownIcon, LogoutIcon, PencilIcon } from '@/components/icons';
import { Dropdown } from '@/components/ui/Dropdown/Dropdown';
import { DropdownItem } from '@/components/ui/Dropdown/DropdownItem';
import { useLogout } from '@/hooks/useLogout';
import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Button from '../ui/Button';

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useLogout();

  function toggleDropdown(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  }

  function closeDropdown() {
    setIsOpen(false);
  }
  return (
    <div className="relative">
      <Button variant="gray" onClick={toggleDropdown}>
        <span className="text-text-1 md:inline hidden">{'Musharof'}</span>
        <ChevronDownIcon className={twMerge('', isOpen && 'rotate-180')} />
      </Button>

      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
      >
        <div>
          <span className="block font-medium text-gray-700 text-theme-sm dark:text-gray-400">
            Musharof Chowdhury
          </span>
          <span className="mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400">
            randomuser@pimjo.com
          </span>
        </div>

        <ul className="flex flex-col gap-1 pt-4 pb-3 border-b border-gray-200 dark:border-gray-800">
          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              tag="a"
              href="/profile"
              className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              <PencilIcon className="w-6 h-6 text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300" />
              Edit profile
            </DropdownItem>
          </li>
        </ul>

        <div
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2 mt-3 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
        >
          <LogoutIcon className="w-6 h-6 text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300" />
          Sign out
        </div>
      </Dropdown>
    </div>
  );
}
