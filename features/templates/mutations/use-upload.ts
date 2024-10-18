import { QueryClient, useMutation } from '@tanstack/react-query';
import { printUsersPDF, printUsersPDFFromDocx } from './api';

export function useUpload() {
  const queryClient = new QueryClient();
  return useMutation({
    mutationFn: printUsersPDF,
    mutationKey: ['pdf'],
    onSuccess: () => queryClient.invalidateQueries()
  });
}

export function useUploadDocx() {
  const queryClient = new QueryClient();
  return useMutation({
    mutationFn: printUsersPDFFromDocx,
    mutationKey: ['docx'],
    onSuccess: () => queryClient.invalidateQueries()
  });
}
