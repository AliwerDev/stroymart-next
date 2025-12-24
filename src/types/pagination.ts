export interface PaginationData {
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
  currentPageNumber: number;
  pageSize: number;
}

export interface PageableData<T> {
  data: T[];
  paginationData: PaginationData;
}

export interface PaginationParams {
  page: number;
  size: number;
}

export interface TablePaginationConfig {
  current: number;
  pageSize: number;
  total: number;
  showSizeChanger: boolean;
  showTotal: (total: number, range: [number, number]) => string;
  pageSizeOptions: string[];
}
