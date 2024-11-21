import { useQuery } from '@tanstack/react-query';
import { getDocumentById, getDocuments } from '../api';

const FIVE_MINUTES_IN_MS = 5 * 60 * 1000;
export function useDocuments(
  documentName: string,
  documentCategory: string,
  documentSubCategory: string,
  documentType: string
) {
  return useQuery({
    queryKey: ['documents', documentName, documentCategory, documentSubCategory, documentType],
    queryFn: () => getDocuments({ documentName, documentCategory, documentSubCategory, documentType }),
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
