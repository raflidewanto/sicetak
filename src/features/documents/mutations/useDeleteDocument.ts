import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteDocument } from '../api';

export function useDeleteDoc() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteDocument,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['documents']
      })
  });
}
