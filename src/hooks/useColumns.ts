import { useMutation, useQueryClient } from '@tanstack/react-query';
import { columnApi } from '../api/columnApi';
import type { CreateColumnRequest, UpdateColumnRequest } from '../types';

export const useCreateColumn = (projectId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateColumnRequest) => columnApi.create(projectId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
    },
  });
};

export const useUpdateColumn = (projectId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateColumnRequest }) =>
      columnApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
    },
  });
};

export const useDeleteColumn = (projectId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => columnApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
    },
  });
};