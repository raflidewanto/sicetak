import { useQuery } from '@tanstack/react-query';
import { getAllSubCategories, getSubcategory } from '../api';

export function useSubCategories() {
  return useQuery({
    queryFn: getAllSubCategories,
    queryKey: ['subcategories']
  });
}

export function useSubCategory(subcategoryCode: string) {
  return useQuery({
    queryFn: () => getSubcategory(subcategoryCode),
    queryKey: ['subcategories', subcategoryCode]
  });
}