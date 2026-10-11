import axiosInstance from './axiosInstance';
import type { Notification } from '../types';

export const notificationApi = {
  getMine: async (): Promise<Notification[]> => {
    const response = await axiosInstance.get<Notification[]>('/notification');
    return response.data;
  },

  markAsRead: async (id: number): Promise<void> => {
    await axiosInstance.put(`/notification/${id}/read`);
  },

  markAllAsRead: async (): Promise<void> => {
    await axiosInstance.put('/notification/read-all');
  },
};