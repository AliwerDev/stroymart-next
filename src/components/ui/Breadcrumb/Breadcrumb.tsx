'use client';

import ChevronLeftIcon from '@/components/icons/ChevronLeftIcon';
import { Link } from '@/i18n/navigation';
import { useAppSelector } from '@/store';
import { selectBreadcrumbLoading, selectBreadcrumbs } from '@/store/slices/breadcrumbSlice';
import Typography from '../Typography';

interface BreadcrumbProps {
  className?: string;
}

const Breadcrumb = ({ className = '' }: BreadcrumbProps) => {
  const breadcrumbs = useAppSelector(selectBreadcrumbs);
  const isLoading = useAppSelector(selectBreadcrumbLoading);

  if (isLoading) {
    return (
      <nav className={`flex ${className}`} aria-label="Breadcrumb">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
      </nav>
    );
  }

  return (
    <nav className={`flex ${className}`} aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        {breadcrumbs.map((item, index) => (
          <li key={index} className="inline-flex items-center gap-2">
            {index > 0 && <ChevronLeftIcon className="text-text-4 w-5 h-5 rotate-180" />}
            {item.href && index < breadcrumbs.length - 1 ? (
              <Link href={item.href} className="inline-flex items-center cursor-pointer">
                {item.icon && <span className="mr-2">{item.icon}</span>}
                <Typography variant="h3-bl-24" color="text-4">
                  {item.label}
                </Typography>
              </Link>
            ) : (
              <Typography variant="h3-bl-24" color="text-1">
                {item.label}
              </Typography>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
