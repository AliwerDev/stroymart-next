import request from '@/lib/request';
import { ReqFilterCreate, ReqFilterUpdate, ResFilterOne } from './filter.types';

export const filterApi = {
  getAll: async (filterGroupUuid: string): Promise<ResFilterOne[]> => {
    const response = await request.get('/filter/get/list', {
      params: { filterGroupUuid },
    });
    return response.data;
  },

  getOne: async (uuid: string): Promise<ResFilterOne> => {
    const response = await request.get(`/filter/get/${uuid}`);
    return response.data;
  },

  create: async (data: ReqFilterCreate): Promise<void> => {
    await request.post('/filter/create', data);
  },

  update: async (data: ReqFilterUpdate): Promise<void> => {
    await request.put('/filter/update', data);
  },

  delete: async (uuid: string): Promise<void> => {
    await request.delete(`/filter/delete/${uuid}`);
  },
};
