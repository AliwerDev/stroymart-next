import request from '@/lib/request';
import { PageableData } from '../common/common.types';
import {
  ReqAttributeGroupCreate,
  ReqAttributeGroupUpdate,
  ResAttributeGroupOne,
} from './attribute-group.types';

export const attributeGroupApi = {
  getAll: async (): Promise<PageableData<ResAttributeGroupOne>> => {
    const response = await request.get('/attribute-group/get/list');
    return response.data;
  },

  getOne: async (uuid: string): Promise<ResAttributeGroupOne> => {
    const response = await request.get(`/attribute-group/get/${uuid}`);
    return response.data;
  },

  create: async (data: ReqAttributeGroupCreate): Promise<void> => {
    await request.post('/attribute-group/create', data);
  },

  update: async (data: ReqAttributeGroupUpdate): Promise<void> => {
    await request.put('/attribute-group/update', data);
  },

  delete: async (uuid: string): Promise<void> => {
    await request.delete(`/attribute-group/delete/${uuid}`);
  },
};
