import { useQuery } from '@tanstack/react-query';
import { getAllCategories, getCategoryByCode } from '../api';
import { FIVE_MINUTES_IN_MS } from '@/constants/data';

export function useCategories(categoryName?: string, categoryCode?: string) {
  return useQuery({
    queryKey: ['categories', categoryName, categoryCode],
    queryFn: () => getAllCategories(categoryName, categoryCode),
    staleTime: FIVE_MINUTES_IN_MS
  });
}

export function useCategoryByCode(categoryCode: string) {
  return useQuery({
    queryKey: ["categories", categoryCode],
    queryFn: () => getCategoryByCode(categoryCode)
  });
};