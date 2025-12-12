import ChevronDownIcon from '@/components/icons/ChevronDownIcon';
import ChevronLeftIcon from '@/components/icons/ChevronLeftIcon';
import { useTranslations } from 'next-intl';
import { twMerge } from 'tailwind-merge';
import { Dropdown } from '../../Dropdown';
import Typography from '../../Typography';
import { PaginationMeta } from '../types';

interface TablePaginationProps {
  meta?: PaginationMeta;
  onPageChange?: (page: number) => void;
  onPerPageChange?: (perPage: number) => void;
}

export const TablePagination = ({ meta, onPageChange, onPerPageChange }: TablePaginationProps) => {
  const t = useTranslations();
  if (!meta) return null;

  const currentPage = meta.currentPage || 0;
  const perPage = meta.perPage || 10;
  const totalCount = meta.totalCount || 0;
  const pageCount = meta.pageCount || 0;

  const startItem = currentPage * perPage + 1;
  const endItem = Math.min((currentPage + 1) * perPage, totalCount);

  const perPageOptions = ['10', '20', '50', '100'];

  const isPrevDisabled = currentPage <= 0;
  const isNextDisabled = currentPage >= (pageCount || 0) - 1;

  return (
    <div className="flex items-center justify-end gap-5 px-4 py-2 min-h-14">
      <Typography variant="caption-rg-14" className="hidden md:block">
        {t('Строк на странице:')}
      </Typography>
      <Dropdown
        placement="bottom-end"
        value={perPage?.toString() ?? ''}
        renderButton={({ isOpen, selected }) => (
          <div className="flex items-center gap-1">
            <Typography variant="caption-rg-14">{selected}</Typography>
            <ChevronDownIcon className={twMerge('w-4 h-4', isOpen && 'rotate-180')} />
          </div>
        )}
        onSelect={(value) => onPerPageChange?.(Number(value))}
        options={perPageOptions}
        popoverClassName="min-w-[4rem]"
      />
      <Typography variant="caption-rg-14">{`${startItem}-${endItem} ${t('из')} ${totalCount}`}</Typography>
      <div className="flex items-center [&>span]:cursor-pointer [&>span]:w-9 [&>span]:h-9 [&>span]:flex [&>span]:items-center [&>span]:justify-center">
        <span>
          <ChevronLeftIcon
            onClick={() => !isPrevDisabled && onPageChange?.(currentPage - 1)}
            className={twMerge(
              'w-6 h-6 hover:text-primary-500 cursor-pointer',
              isPrevDisabled && 'opacity-50 text-gray-200 cursor-not-allowed'
            )}
          />
        </span>
        <span>
          <ChevronLeftIcon
            onClick={() => !isNextDisabled && onPageChange?.(currentPage + 1)}
            className={twMerge(
              'w-6 h-6 hover:text-primary-500 rotate-180 cursor-pointer',
              isNextDisabled && 'opacity-50 text-gray-200 cursor-not-allowed'
            )}
          />
        </span>
      </div>
    </div>
  );
};
