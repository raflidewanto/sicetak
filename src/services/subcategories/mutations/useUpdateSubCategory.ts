import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSubcategory } from "../api";

export function useUpdateSubCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateSubcategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['subcategories']
      });
    }
  });
}