import { Link } from '@/i18n/navigation';
import { BreadcrumbItem } from '@/types/other';
import { Breadcrumb } from 'antd';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface PageHeaderProps {
  breadcrumbs: BreadcrumbItem[];
  actions?: React.ReactNode;
}

const PageHeader = ({ breadcrumbs, actions }: PageHeaderProps) => {
  const breadcrumbItems = breadcrumbs.map((item, index) => ({
    title:
      item.href && index < breadcrumbs.length - 1 ? (
        <Link href={item.href}>{item.label}</Link>
      ) : (
        item.label
      ),
  }));

  const [container, setContainer] = useState<HTMLElement | null>(null);
  const pageTitle = breadcrumbs[breadcrumbs.length - 1]?.label || '';

  useEffect(() => {
    setContainer(document.getElementById('breadcrumb-container'));
  }, []);

  return (
    <>
      {container && createPortal(<Breadcrumb items={breadcrumbItems} />, container)}
      <div className="flex flex-row justify-between gap-2 items-center h-fit min-h-11 mb-4 flex-wrap">
        <h1 className="text-xl font-semibold text-gray-900">{pageTitle}</h1>
        <div className="flex items-center gap-2 justify-end flex-1 ml-auto">{actions}</div>
      </div>
    </>
  );
};

export default PageHeader;
