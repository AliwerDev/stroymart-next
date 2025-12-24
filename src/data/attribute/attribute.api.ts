import request from '@/lib/request';
import { PageableData, PaginationParams } from '@/types/pagination';
import { ReqAttributeCreate, ReqAttributeUpdate, ResAttributeOne } from './attribute.types';

export const attributeApi = {
  getAll: async (params: PaginationParams): Promise<PageableData<ResAttributeOne>> => {
    const response = await request.get('/attribute/get/list', {
      params: {
        page: params.page,
        size: params.size,
      },
    });
    return response.data;
  },

  getAllByGroup: async (attributeGroupUuid: string): Promise<ResAttributeOne[]> => {
    const response = await request.get('/attribute/get/list/by-group', {
      params: { attributeGroupUuid },
    });
    return response.data;
  },

  getOne: async (uuid: string): Promise<ResAttributeOne> => {
    const response = await request.get(`/attribute/get/${uuid}`);
    return response.data;
  },

  create: async (data: ReqAttributeCreate): Promise<void> => {
    await request.post('/attribute/create', data);
  },

  update: async (data: ReqAttributeUpdate): Promise<void> => {
    await request.put('/attribute/update', data);
  },

  delete: async (uuid: string): Promise<void> => {
    await request.delete(`/attribute/delete/${uuid}`);
  },
};
