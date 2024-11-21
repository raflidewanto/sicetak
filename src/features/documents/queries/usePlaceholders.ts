import { useQuery } from '@tanstack/react-query';
import { getPlaceholders } from '../api';

export function usePlaceholders(id: string) {
  return useQuery({
    queryKey: ['placeholders', id],
    queryFn: () => getPlaceholders(id)
  });
}
