import { QueryClient, useMutation } from '@tanstack/react-query';
import { printUsersPDF } from './api';

export function useUpload() {
  const queryClient = new QueryClient();
  return useMutation({
    mutationFn: printUsersPDF,
    mutationKey: ['pdf'],
    onSuccess: () => queryClient.invalidateQueries()
  });
}
