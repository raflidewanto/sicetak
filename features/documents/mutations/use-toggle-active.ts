import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleActive } from '../api';

export function useToggleActive() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => toggleActive(id),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['documents']
      });
    }
  });
}
