import { useMutation, useQueryClient } from '@tanstack/react-query';
import { reuploadDocument } from '../api';

export function useReuploadDoc() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ formData, id }: { formData: FormData; id: string }) => reuploadDocument(formData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['documents']
      });
    }
  });
}
