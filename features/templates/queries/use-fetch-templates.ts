import { useQuery } from '@tanstack/react-query';
import { fetchTemplates } from '../api';

export function useFetchTemplates() {
  return useQuery({
    queryKey: ['templates'],
    queryFn: fetchTemplates
  });
}
