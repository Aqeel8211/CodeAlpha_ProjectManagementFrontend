import axiosInstance from './axiosInstance';
import type {
  UserProfile,
  UpdateProfileRequest,
  UserSearchResult,
} from '../types';

export const userApi = {
  getMe: async (): Promise<UserProfile> => {
    const response = await axiosInstance.get<UserProfile>('/user/me');
    return response.data;
  },

  updateMe: async (data: UpdateProfileRequest): Promise<UserProfile> => {
    const response = await axiosInstance.put<UserProfile>('/user/me', data);
    return response.data;
  },

  getById: async (id: number): Promise<UserProfile> => {
    const response = await axiosInstance.get<UserProfile>(`/user/${id}`);
    return response.data;
  },

  search: async (query: string): Promise<UserSearchResult[]> => {
    const response = await axiosInstance.get<UserSearchResult[]>('/user/search', {
      params: { query },
    });
    return response.data;
  },
};