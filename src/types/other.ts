export type Location = {
  name: string;
  coords: [number, number];
};

export interface IFile {
  id: number;
  title: string;
  size: number;
  type: string;
  src: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: string;
}

export interface IMeta {
  totalCount: number;
  pageCount: number;
  perPage: number;
  currentPage: number;
}
