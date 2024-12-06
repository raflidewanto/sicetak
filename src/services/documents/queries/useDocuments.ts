import { useQuery } from '@tanstack/react-query';
import { getDocumentById, getDocumentBySubcategory, getDocuments, getMasterData } from '../api';
import { FIVE_MINUTES_IN_MS } from '@/constants/data';

export function useDocuments(
  documentName?: string,
  documentCategory?: string,
  documentSubCategory?: string,
  documentType?: string
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

export function useDocumentBySubcategory(id: string) {
  return useQuery({
    queryKey: ['documents', id],
    queryFn: () => getDocumentBySubcategory(id),
    staleTime: FIVE_MINUTES_IN_MS
  });
}

export function useMasterData() {
  return useQuery({
    queryFn: getMasterData,
    queryKey: ['master-data'],
    staleTime: FIVE_MINUTES_IN_MS
  });
}