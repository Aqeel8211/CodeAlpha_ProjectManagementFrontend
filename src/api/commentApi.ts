import axiosInstance from './axiosInstance';
import type {
  Comment,
  CreateCommentRequest,
  UpdateCommentRequest,
} from '../types';

export const commentApi = {
  getByTask: async (taskId: number): Promise<Comment[]> => {
    const response = await axiosInstance.get<Comment[]>(`/comment/task/${taskId}`);
    return response.data;
  },

  add: async (taskId: number, data: CreateCommentRequest): Promise<Comment> => {
    const response = await axiosInstance.post<Comment>(`/comment/task/${taskId}`, data);
    return response.data;
  },

  update: async (id: number, data: UpdateCommentRequest): Promise<Comment> => {
    const response = await axiosInstance.put<Comment>(`/comment/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/comment/${id}`);
  },
};