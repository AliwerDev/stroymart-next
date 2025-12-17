import { TranslatedText } from '../common/common.types';

export interface Category {
  uuid: string;
  name: TranslatedText;
  description: TranslatedText;
  contentDescription: TranslatedText;
  iconUrl: string;
  bannerUrl: string;
  percent: number;
  ceoContent: TranslatedText;
  status: CategoryStatusEnum;
  orderNumber: number;
  parentCategoryUuid: string;
  filterUuids: string[];
}

export enum CategoryStatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export interface ReqCategoryCreate {
  name: TranslatedText;
  description: TranslatedText;
  contentDescription: TranslatedText;
  iconUrl: string;
  bannerUrl: string;
  percent: number;
  ceoContent: TranslatedText;
  status: CategoryStatusEnum;
  orderNumber: number;
  parentCategoryUuid?: string;
  filterUuids: string[];
}

export interface ReqCategoryUpdate {
  uuid: string;
  name: TranslatedText;
  description: TranslatedText;
  contentDescription: TranslatedText;
  iconUrl: string;
  bannerUrl: string;
  percent: number;
  ceoContent: TranslatedText;
  status: CategoryStatusEnum;
  orderNumber: number;
  parentCategoryUuid?: string;
  filterUuids: string[];
}

export interface ResCategoryOne {
  uuid: string;
  name: TranslatedText;
  description: TranslatedText;
  contentDescription: TranslatedText;
  iconUrl: string;
  bannerUrl: string;
  percent: number;
  ceoContent: TranslatedText;
  status: CategoryStatusEnum;
  orderNumber: number;
  parentCategoryUuid: string;
  filterUuids: string[];
}
