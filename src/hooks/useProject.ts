import { useQuery } from '@tanstack/react-query';
import { projectApi } from '../api/projectApi';

export const useProject = (id: number) => {
  return useQuery({
    queryKey: ['project', id],
    queryFn: () => projectApi.getById(id),
    enabled: !!id,
  });
};