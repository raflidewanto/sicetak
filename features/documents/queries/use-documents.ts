import { useQuery } from '@tanstack/react-query';
import { getDocumentById, getDocuments } from '../api';

const FIVE_MINUTES_IN_MS = 5 * 60 * 1000;
export function useDocuments(docType: string, searchQuery: string, productType: string) {
  return useQuery({
    queryKey: ['documents', docType, searchQuery, productType],
    queryFn: () => getDocuments({ docType, searchQuery, productType }),
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
