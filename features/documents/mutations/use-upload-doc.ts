import { useMutation } from '@tanstack/react-query';
import { uploadDocument } from '../api';

export function useUploadDoc() {
  return useMutation({
    mutationFn: uploadDocument,
    mutationKey: ['upload-doc']
  });
}
