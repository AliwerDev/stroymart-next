import { TranslatedText } from '../common/common.types';

export interface ResAttributeGroupOne {
  uuid: string;
  name: TranslatedText;
  orderNumber: number;
}

export interface ReqAttributeGroupCreate {
  name: TranslatedText;
  orderNumber: number;
}

export interface ReqAttributeGroupUpdate {
  uuid: string;
  name: TranslatedText;
  orderNumber: number;
}
