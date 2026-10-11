import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { commentApi } from '../api/commentApi';
import type { CreateCommentRequest, UpdateCommentRequest } from '../types';

export const useComments = (taskId: number) => {
  return useQuery({
    queryKey: ['comments', taskId],
    queryFn: () => commentApi.getByTask(taskId),
    enabled: !!taskId,
  });
};

export const useAddComment = (taskId: number, projectId?: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCommentRequest) => commentApi.add(taskId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', taskId] });
      if (projectId) {
        queryClient.invalidateQueries({ queryKey: ['project', projectId] });
      }
    },
  });
};

export const useUpdateComment = (taskId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateCommentRequest }) =>
      commentApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', taskId] });
    },
  });
};

export const useDeleteComment = (taskId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => commentApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', taskId] });
    },
  });
};