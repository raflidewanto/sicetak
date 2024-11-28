import { useQuery } from '@tanstack/react-query';
import { getAllCategories, getCategoryByCode } from '../api';

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategories
  });
}

export function useCategoryByCode(categoryCode: string) {
  return useQuery({
    queryKey: ["categories", categoryCode],
    queryFn: () => getCategoryByCode(categoryCode)
  });
};