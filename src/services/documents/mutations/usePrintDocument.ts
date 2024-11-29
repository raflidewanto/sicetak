import { useMutation } from '@tanstack/react-query';
import { printDocument } from '../api';

export function usePrintDocument() {
  return useMutation({
    mutationFn: printDocument,
    mutationKey: ['print-doc']
  });
}
