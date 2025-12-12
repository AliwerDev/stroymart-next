'use client';

import ChevronDownIcon from '@/components/icons/ChevronDownIcon';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import IUser from '@/types/user';
import Image from 'next/image';
import React from 'react';

interface UserProfileDropdownProps {
  isExpanded: boolean;
  user: IUser;
}

const UserProfileDropdown: React.FC<UserProfileDropdownProps> = ({ isExpanded, user }) => {
  const userName = user?.name || 'User';
  const userImage = user?.avatar || '/images/avatar.png';

  return (
    <Link
      href="/dashboard/profile"
      className={`flex items-center  h-12 gap-2 py-1 cursor-pointer w-full pl-1.5`}
    >
      <Image
        src={userImage}
        alt="user"
        className="w-10 h-10 rounded-full object-cover"
        width={40}
        height={40}
      />
      <p
        className={cn(
          `text-bunker-800 text-base font-normal flex-1 truncate text-left overflow-hidden duration-300 ease-linear`,
          isExpanded ? 'opacity-100' : 'opacity-0'
        )}
      >
        {userName}
      </p>
      <ChevronDownIcon
        className={`transition-transform duration-200 ${isExpanded ? 'block' : 'hidden'}`}
      />
    </Link>
  );
};

export default UserProfileDropdown;
