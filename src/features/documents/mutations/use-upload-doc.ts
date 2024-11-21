import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadDocument } from '../api';

export function useUploadDoc() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: uploadDocument,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['documents']
      })
  });
}
