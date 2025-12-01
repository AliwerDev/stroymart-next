import request from '@/lib/request';
import { IFileResponse } from '@/types/file';
import get from 'lodash.get';

export const uploadFile = async (file: File): Promise<IFileResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await request.post(`/file/create-image`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return get(response, 'data.result', null);
};

export const deleteFile = async (fileId: number): Promise<void> => {
  await request.delete(`/common/file/${fileId}`);
};
