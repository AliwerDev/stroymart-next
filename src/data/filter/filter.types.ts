import { TranslatedText } from '../common/common.types';

export interface ResFilterOne {
  uuid: string;
  name: TranslatedText;
  iconUrl: string;
  orderNumber: number;
  filterGroupUuid: string;
}

export interface ReqFilterCreate {
  name: TranslatedText;
  iconUrl: string;
  orderNumber: number;
  filterGroupUuid: string;
}

export interface ReqFilterUpdate {
  uuid: string;
  name: TranslatedText;
  iconUrl: string;
  orderNumber: number;
  filterGroupUuid: string;
}
