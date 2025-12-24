import request from '@/lib/request';
import { PaginationParams } from '@/types/pagination';
import { PageableData } from '../common/common.types';
import {
  ReqProductCalculatePrice,
  ReqProductCreate,
  ReqProductUpdate,
  ResProductCalculatePrice,
  ResProductOne,
} from './product.types';

export const productApi = {
  getAll: async (
    params: PaginationParams & {
      search?: string;
      categoryUuid?: string;
      sellerUuid?: string;
    }
  ): Promise<PageableData<ResProductOne>> => {
    const response = await request.get('/product/get/list', { params });
    return response.data;
  },

  getOne: async (uuid: string): Promise<ResProductOne> => {
    const response = await request.get(`/product/get/${uuid}`);
    return response.data;
  },

  create: async (data: ReqProductCreate): Promise<void> => {
    await request.post('/product/create', data);
  },

  update: async (data: ReqProductUpdate): Promise<void> => {
    await request.put('/product/update', data);
  },

  delete: async (uuid: string): Promise<void> => {
    await request.delete(`/product/delete/${uuid}`);
  },

  calculatePrice: async (data: ReqProductCalculatePrice): Promise<ResProductCalculatePrice> => {
    const response = await request.post('/product/calculate-price', data);
    return response.data;
  },
};
