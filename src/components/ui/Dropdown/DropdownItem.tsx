import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface DropdownItemProps {
  children: ReactNode;
  onClick?: () => void;
  icon?: ReactNode;
  href?: string;
  active?: boolean;
  variant?: 'default' | 'danger';
}

const DropdownItem = ({
  children,
  onClick,
  icon,
  href,
  active,
  variant = 'default',
}: DropdownItemProps) => {
  return href ? (
    <Link href={href}>
      <div
        onClick={onClick}
        className={cn(
          'px-4 py-2 text-sm text-text-1 hover:bg-gray-100 cursor-pointer flex items-center gap-2',
          active && 'bg-bunker-100',
          variant === 'danger' && 'text-red-500'
        )}
      >
        {icon}
        {children}
      </div>
    </Link>
  ) : (
    <div
      onClick={onClick}
      className={cn(
        'px-4 py-2 text-sm text-text-1 hover:bg-gray-100 cursor-pointer flex items-center gap-2',
        active && 'bg-bunker-100',
        variant === 'danger' && 'text-red-500 hover:bg-red-500/10'
      )}
    >
      {icon}
      {children}
    </div>
  );
};

export default DropdownItem;
