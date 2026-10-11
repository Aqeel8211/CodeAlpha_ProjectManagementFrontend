import axiosInstance from './axiosInstance';
import type {
  Task,
  TaskAssignment,
  CreateTaskRequest,
  UpdateTaskRequest,
  AssignTaskRequest,
} from '../types';

export const taskApi = {
  create: async (projectId: number, data: CreateTaskRequest): Promise<Task> => {
    const response = await axiosInstance.post<Task>(
      `/task/project/${projectId}`,
      data
    );
    return response.data;
  },

  update: async (id: number, data: UpdateTaskRequest): Promise<Task> => {
    const response = await axiosInstance.put<Task>(`/task/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/task/${id}`);
  },

  assign: async (taskId: number, data: AssignTaskRequest): Promise<TaskAssignment> => {
    const response = await axiosInstance.post<TaskAssignment>(
      `/task/${taskId}/assign`,
      data
    );
    return response.data;
  },

  unassign: async (taskId: number, userId: number): Promise<void> => {
    await axiosInstance.delete(`/task/${taskId}/assign/${userId}`);
  },
};