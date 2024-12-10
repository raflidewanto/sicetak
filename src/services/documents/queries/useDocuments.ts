import { useQuery } from '@tanstack/react-query';
import { getDocumentById, getDocumentBySubcategory, getDocuments, getMasterData } from '../api';
import { FIVE_MINUTES_IN_MS } from '@/constants/data';

export function useDocuments(
  categoryCode?: string
) {
  return useQuery({
    queryKey: ['documents', categoryCode],
    queryFn: () => getDocuments({ categoryCode }),
    staleTime: FIVE_MINUTES_IN_MS,
    enabled: Boolean(categoryCode)
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