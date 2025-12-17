import request from '@/lib/request';
import { Category, ReqCategoryCreate, ReqCategoryUpdate, ResCategoryOne } from './category.types';

export const categoryApi = {
  getAll: async (): Promise<ResCategoryOne[]> => {
    const response = await request.get('/category/get/list');
    return response.data;
  },

  getOne: async (uuid: string): Promise<ResCategoryOne> => {
    const response = await request.get(`/category/get/${uuid}`);
    return response.data;
  },

  create: async (data: ReqCategoryCreate): Promise<void> => {
    await request.post('/category/create', data);
  },

  update: async (data: ReqCategoryUpdate): Promise<void> => {
    await request.put('/category/update', data);
  },

  delete: async (uuid: string): Promise<void> => {
    await request.delete(`/category/delete/${uuid}`);
  },

  getTree: async (): Promise<Category[]> => {
    const response = await request.get('/category/get/tree');
    return response.data;
  },
};
