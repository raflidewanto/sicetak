import { useMutation } from '@tanstack/react-query';
import { printDocument } from '../api';

export function usePrintDocument(id: string, agreementNo: string) {
  return useMutation({
    mutationFn: () => printDocument(id, agreementNo),
    mutationKey: ['print-doc']
  });
}
