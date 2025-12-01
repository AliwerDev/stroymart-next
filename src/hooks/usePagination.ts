'use client';

import { useUrlParams } from './useUrlParams';

// PaginationMeta interface for reference
// interface PaginationMeta {
//   totalCount: number;
//   pageCount: number;
//   currentPage: number;
//   perPage: number;
// }

interface UsePaginationOptions {
  defaultPageSize?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
}

export function usePagination(options: UsePaginationOptions = {}) {
  const { defaultPageSize = 10, onPageChange, onPageSizeChange } = options;

  const { params, setParams } = useUrlParams<{
    page: string;
    perPage: string;
  }>({
    defaultValues: {
      page: '0',
      perPage: String(defaultPageSize),
    },
  });

  const currentPage = parseInt(params.page || '0', 10);
  const pageSize = parseInt(params.perPage || String(defaultPageSize), 10);

  const setPage = (page: number) => {
    setParams({ page: String(page) });
    onPageChange?.(page);
  };

  const setPageSize = (newPageSize: number) => {
    setParams({ perPage: String(newPageSize), page: '0' }); // Reset to first page when changing page size
    onPageSizeChange?.(newPageSize);
  };

  const goToNextPage = () => {
    setPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    setPage(Math.max(0, currentPage - 1));
  };

  const goToFirstPage = () => {
    setPage(0);
  };

  const goToLastPage = (totalPages: number) => {
    setPage(Math.max(0, totalPages - 1));
  };

  return {
    currentPage,
    pageSize,
    setPage,
    setPageSize,
    goToNextPage,
    goToPreviousPage,
    goToFirstPage,
    goToLastPage,
  };
}
