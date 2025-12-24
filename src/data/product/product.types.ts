import { TranslatedText } from '../common/common.types';

export enum LengthTypeEnum {
  MM = 'MM',
  CM = 'CM',
  M = 'M',
  KM = 'KM',
}

export enum WeightTypeEnum {
  GR = 'GR',
  KG = 'KG',
  T = 'T',
}

export interface ResProductOne {
  uuid: string;
  name: TranslatedText;
  description: TranslatedText;
  shortDescription: TranslatedText;
  model: string;
  skuCode: string;
  customPrice: number;
  realPrice: number;
  ikpyCode: number;
  quantity: number;
  minQuantity: number;
  decStock: boolean;
  images: string[];
  width: number;
  height: number;
  length: number;
  weight: number;
  lengthType: LengthTypeEnum;
  weightType: WeightTypeEnum;
  categoryUuid: string;
  sellerUuid: string;
}

export interface ReqProductCreate {
  name: TranslatedText;
  description: TranslatedText;
  shortDescription: TranslatedText;
  model: string;
  skuCode: string;
  realPrice: number;
  ikpyCode: number;
  quantity: number;
  minQuantity: number;
  decStock: boolean;
  images: string[];
  width: number;
  height: number;
  length: number;
  weight: number;
  lengthType: LengthTypeEnum;
  weightType: WeightTypeEnum;
  categoryUuid: string;
  sellerUuid: string;
}

export interface ReqProductUpdate {
  uuid: string;
  name: TranslatedText;
  description: TranslatedText;
  shortDescription: TranslatedText;
  model: string;
  skuCode: string;
  realPrice: number;
  ikpyCode: number;
  quantity: number;
  minQuantity: number;
  decStock: boolean;
  images: string[];
  width: number;
  height: number;
  length: number;
  weight: number;
  lengthType: LengthTypeEnum;
  weightType: WeightTypeEnum;
  categoryUuid: string;
  sellerUuid: string;
}

export interface ReqProductCalculatePrice {
  realPrice: number;
  categoryUuid: string;
  sellerUuid: string;
}

export interface ResProductCalculatePrice {
  realPrice: number;
  customPrice: number;
}
