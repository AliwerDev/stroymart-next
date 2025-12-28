export enum SellerStatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  BLOCKED = 'BLOCKED',
}

// Request Types
export interface ReqSellerInit {
  phoneNumber: string;
}

export interface ReqSellerConfirm {
  phoneNumber: string;
  code: string;
}

// Response Types
export interface ResSellerOne {
  uuid: string;
  userUuid: string;
  fullName: string;
  phoneNumber: string;
  nds: boolean;
  yatt: boolean;
  isMonthlyCalculation: boolean;
  companyName: string;
  inn: string;
  requisite: string;
  regionUuid: string;
  userStatus: SellerStatusEnum;
}

export interface ResStringMessage {
  message: string;
}

export interface ResSellerAuth {
  accessToken: string;
  accessTokenExpire: number;
  refreshToken: string;
  refreshTokenExpire: number;
}

// Session/Auth
export interface SellerSession {
  id: string;
  username: string;
  email: string;
  fullname: string;
  user_type: 'seller';
  accessToken: string;
  refreshToken: string;
  seller?: ResSellerOne;
}

// Type Aliases
export type SellerAuthResponse = ResStringMessage;
