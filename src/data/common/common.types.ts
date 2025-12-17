export interface TranslatedText {
  uzl: string;
  uzc: string;
  ru: string;
}

export type Language = 'uzl' | 'uzc' | 'ru';

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
