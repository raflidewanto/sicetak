import { useQuery } from '@tanstack/react-query';
import { getAllSubCategories } from '../api';

export function useSubCategories() {
  return useQuery({
    queryFn: getAllSubCategories,
    queryKey: ['subcategories']
  });
}
