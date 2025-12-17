import request from '@/lib/request';
import { PageableData } from '../common/common.types';
import {
  ReqFilterGroupCreate,
  ReqFilterGroupUpdate,
  ResFilterGroupOne,
} from './filter-group.types';

export const filterGroupApi = {
  getAll: async (): Promise<PageableData<ResFilterGroupOne>> => {
    const response = await request.get('/filter-group/get/list');
    return response.data;
  },

  getOne: async (uuid: string): Promise<ResFilterGroupOne> => {
    const response = await request.get(`/filter-group/get/${uuid}`);
    return response.data;
  },

  create: async (data: ReqFilterGroupCreate): Promise<void> => {
    await request.post('/filter-group/create', data);
  },

  update: async (data: ReqFilterGroupUpdate): Promise<void> => {
    await request.put('/filter-group/update', data);
  },

  delete: async (uuid: string): Promise<void> => {
    await request.delete(`/filter-group/delete/${uuid}`);
  },
};
