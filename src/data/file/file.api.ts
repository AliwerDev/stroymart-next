import request from '@/lib/request';
import { ResFileOne } from './file.types';

export const fileApi = {
  upload: async (file: File): Promise<ResFileOne> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await request.post('/file/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await request.delete('/file/delete', {
      params: { id },
    });
  },
};
