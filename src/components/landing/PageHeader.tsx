/* eslint-disable react-hooks/exhaustive-deps */
import { useBreadcrumb } from '@/hooks/useBreadcrumb';
import { BreadcrumbItem } from '@/types/other';
import { useEffect } from 'react';
import Breadcrumb from '../ui/Breadcrumb';

interface PageHeaderProps {
  breadcrumbs: BreadcrumbItem[];
  actions?: React.ReactNode;
}

const PageHeader = ({ breadcrumbs, actions }: PageHeaderProps) => {
  const { setBreadcrumbs } = useBreadcrumb();

  useEffect(() => {
    setBreadcrumbs(breadcrumbs);
  }, [breadcrumbs]);

  return (
    <div className="flex flex-row justify-between gap-2 items-center h-fit min-h-11 mb-4 flex-wrap">
      <Breadcrumb />
      <div className="flex items-center gap-2 justify-end flex-1">{actions}</div>
    </div>
  );
};

export default PageHeader;
