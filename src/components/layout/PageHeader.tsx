/* eslint-disable react-hooks/exhaustive-deps */
import { useBreadcrumb } from '@/hooks/useBreadcrumb';
import { Link } from '@/i18n/navigation';
import { BreadcrumbItem } from '@/types/other';
import { useTranslations } from 'next-intl';
import { ComponentProps, useEffect } from 'react';
import PlusIcon from '../icons/PlusIcon';
import Breadcrumb from '../ui/Breadcrumb';
import Button from '../ui/Button';

interface PageHeaderProps {
  breadcrumbs: BreadcrumbItem[];
  actions?: React.ReactNode;
  create?: VoidFunction | string;
  addButtonText?: string;
  addButtonProps?: ComponentProps<typeof Button>;
}

const PageHeader = ({
  breadcrumbs,
  actions,
  create: create,
  addButtonText,
  addButtonProps,
}: PageHeaderProps) => {
  const t = useTranslations();
  const { setBreadcrumbs } = useBreadcrumb();

  useEffect(() => {
    setBreadcrumbs(breadcrumbs);
  }, [breadcrumbs]);

  return (
    <div className="flex flex-row justify-between gap-2 items-center h-fit min-h-11 mb-4 flex-wrap">
      <Breadcrumb />
      <div className="flex items-center gap-2 justify-end flex-1">
        {actions}
        {create &&
          (typeof create === 'string' ? (
            <Link href={create}>
              <Button
                className="truncate"
                variant="outlined"
                icon={<PlusIcon />}
                {...addButtonProps}
              >
                {addButtonText || t('Добавить')}
              </Button>
            </Link>
          ) : (
            <Button
              className="truncate"
              variant="outlined"
              onClick={create}
              icon={<PlusIcon />}
              {...addButtonProps}
            >
              {addButtonText || t('Добавить')}
            </Button>
          ))}
      </div>
    </div>
  );
};

export default PageHeader;
