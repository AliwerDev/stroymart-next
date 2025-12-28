import request from '@/lib/request';
import {
  ReqSellerConfirm,
  ReqSellerInit,
  ResSellerAuth,
  ResSellerOne,
  ResStringMessage,
} from './seller.types';

export const sellerApi = {
  // Initialize seller registration with phone number
  init: async (data: ReqSellerInit): Promise<ResStringMessage> => {
    const response = await request.post('/seller/init', data);
    return response.data;
  },

  // Confirm seller registration with phone and verification code
  confirm: async (data: ReqSellerConfirm): Promise<ResStringMessage> => {
    const response = await request.post('/seller/confirm', data);
    return response.data;
  },

  // Get current seller profile
  getProfile: async (): Promise<ResSellerOne> => {
    const response = await request.get('/seller/profile');
    return response.data;
  },

  // Update seller profile
  updateProfile: async (data: Partial<ResSellerOne>): Promise<ResStringMessage> => {
    const response = await request.put('/seller/profile', data);
    return response.data;
  },

  // Get seller by UUID
  getById: async (uuid: string): Promise<ResSellerOne> => {
    const response = await request.get(`/seller/${uuid}`);
    return response.data;
  },

  // Refresh authentication token
  refreshToken: async (token: string): Promise<ResSellerAuth> => {
    const response = await request.post('/seller/refresh-token', { token });
    return response.data;
  },
};
