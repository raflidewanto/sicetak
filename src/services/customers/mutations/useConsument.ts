import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getCustomers } from "../api";

export function useCustomer() {
  const queryClient = useQueryClient();
  return useMutation({
     mutationFn: getCustomers, 
     mutationKey: ["customers"],
     onSuccess: () => {
       queryClient.invalidateQueries({
        queryKey: ["customers"]
       });
     },
  });
}