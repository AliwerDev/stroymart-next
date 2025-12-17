import { TranslatedText } from '../common/common.types';

export interface ResFilterGroupOne {
  uuid: string;
  name: TranslatedText;
  orderNumber: number;
}

export interface ReqFilterGroupCreate {
  name: TranslatedText;
  orderNumber: number;
}

export interface ReqFilterGroupUpdate {
  uuid: string;
  name: TranslatedText;
  orderNumber: number;
}
