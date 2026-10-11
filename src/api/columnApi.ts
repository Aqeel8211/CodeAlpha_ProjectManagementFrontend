import axiosInstance from './axiosInstance';
import type {
  Column,
  CreateColumnRequest,
  UpdateColumnRequest,
} from '../types';

export const columnApi = {
  create: async (projectId: number, data: CreateColumnRequest): Promise<Column> => {
    const response = await axiosInstance.post<Column>(
      `/column/project/${projectId}`,
      data
    );
    return response.data;
  },

  update: async (id: number, data: UpdateColumnRequest): Promise<Column> => {
    const response = await axiosInstance.put<Column>(`/column/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/column/${id}`);
  },
};