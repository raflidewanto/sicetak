import { useQuery } from '@tanstack/react-query';
import { getDocuments } from '../api';

const FIVE_MINUTES_IN_MS = 5 * 60 * 1000;
export function useDocuments(docType: string, searchQuery: string) {
  return useQuery({
    queryKey: ['documents', docType, searchQuery],
    queryFn: () => getDocuments({ docType, searchQuery }),
    staleTime: FIVE_MINUTES_IN_MS
  });
}
