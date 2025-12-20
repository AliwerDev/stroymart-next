import { TranslatedText } from '../common/common.types';

export interface ResAttributeOne {
  uuid: string;
  key: TranslatedText;
  isMain: boolean;
  orderNumber: number;
  attributeGroupUuid: string;
}

export interface ReqAttributeCreate {
  key: TranslatedText;
  isMain: boolean;
  orderNumber: number;
  attributeGroupUuid: string;
}

export interface ReqAttributeUpdate {
  uuid: string;
  key: TranslatedText;
  isMain: boolean;
  orderNumber: number;
  attributeGroupUuid: string;
}
