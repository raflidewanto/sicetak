import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePlaceholderValue } from '../api';

export function usePlaceholderUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePlaceholderValue,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['placeholders']
      });
    }
  });
}
