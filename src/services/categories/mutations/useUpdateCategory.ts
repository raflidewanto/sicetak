import { useMutation, QueryClient } from "@tanstack/react-query";
import { updateCategory } from "../api";

export function useUpdateCategory() {
  const queryClient = new QueryClient();
  return useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['categories']
        });
    }
  });
}