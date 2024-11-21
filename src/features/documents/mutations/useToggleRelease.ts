import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleRelease } from '../api';

export function useToggleRelease() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => toggleRelease(id),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['documents']
      });
    }
  });
}
