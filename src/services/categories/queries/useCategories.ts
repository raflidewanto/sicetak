import { useQuery } from '@tanstack/react-query';
import { getAllCategories } from '../api';

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategories
  });
}