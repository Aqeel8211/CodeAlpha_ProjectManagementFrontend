import axiosInstance from './axiosInstance';
import type {
  Project,
  ProjectDetail,
  ProjectMember,
  CreateProjectRequest,
  UpdateProjectRequest,
  AddProjectMemberRequest,
} from '../types';

export const projectApi = {
  getMyProjects: async (): Promise<Project[]> => {
    const response = await axiosInstance.get<Project[]>('/project');
    return response.data;
  },

  getById: async (id: number): Promise<ProjectDetail> => {
    const response = await axiosInstance.get<ProjectDetail>(`/project/${id}`);
    return response.data;
  },

  create: async (data: CreateProjectRequest): Promise<Project> => {
    const response = await axiosInstance.post<Project>('/project', data);
    return response.data;
  },

  update: async (id: number, data: UpdateProjectRequest): Promise<Project> => {
    const response = await axiosInstance.put<Project>(`/project/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/project/${id}`);
  },

  addMember: async (projectId: number, data: AddProjectMemberRequest): Promise<ProjectMember> => {
    const response = await axiosInstance.post<ProjectMember>(
      `/project/${projectId}/members`,
      data
    );
    return response.data;
  },

  removeMember: async (projectId: number, memberUserId: number): Promise<void> => {
    await axiosInstance.delete(`/project/${projectId}/members/${memberUserId}`);
  },
};