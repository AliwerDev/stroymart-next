import { TranslatedText } from '../common/common.types';

export interface ResAttributeOne {
  uuid: string;
  name: TranslatedText;
  isMain: boolean;
  orderNumber: number;
  attributeGroupUuid: string;
}

export interface ReqAttributeCreate {
  name: TranslatedText;
  isMain: boolean;
  orderNumber: number;
  attributeGroupUuid: string;
}

export interface ReqAttributeUpdate {
  uuid: string;
  name: TranslatedText;
  isMain: boolean;
  orderNumber: number;
  attributeGroupUuid: string;
}
