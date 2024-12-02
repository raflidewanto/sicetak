import { FIVE_MINUTES_IN_MS } from "@/constants/data";
import { useQuery } from "@tanstack/react-query";
import { getSubCategoriesByCategory } from "../api";

export function useSubCategoriesByCategory(categoryId: string, search?: string, active?: string) {
  return useQuery({
    queryKey: ['subcategories', categoryId, search, active],
    queryFn: () => getSubCategoriesByCategory(categoryId, search, active),
    staleTime: FIVE_MINUTES_IN_MS,
    enabled: !!categoryId
  });
}