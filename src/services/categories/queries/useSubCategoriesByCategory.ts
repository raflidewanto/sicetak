import { FIVE_MINUTES_IN_MS } from "@/constants/data";
import { useQuery } from "@tanstack/react-query";
import { getSubCategoriesByCategory } from "../api";

export function useSubCategoriesByCategory(categoryId: string) {
  return useQuery({
    queryKey: ['subcategories', categoryId],
    queryFn: () => getSubCategoriesByCategory(categoryId),
    staleTime: FIVE_MINUTES_IN_MS
  });
}