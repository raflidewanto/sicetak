import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSubcategory } from "../api";

export function useCreateSubcategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSubcategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['subcategories']
      });
    }
  });
}