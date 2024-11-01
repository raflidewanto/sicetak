import { useQuery } from '@tanstack/react-query';
import { getDocumentById, getDocuments } from '../api';

const FIVE_MINUTES_IN_MS = 5 * 60 * 1000;
export function useDocuments(docType: string, searchQuery: string) {
  return useQuery({
    queryKey: ['documents', docType, searchQuery],
    queryFn: () => getDocuments({ docType, searchQuery }),
    staleTime: FIVE_MINUTES_IN_MS
  });
}

export function useDocumentById(id: string) {
  return useQuery({
    queryKey: ['document', id],
    queryFn: () => getDocumentById(id),
    staleTime: FIVE_MINUTES_IN_MS
  });
}
