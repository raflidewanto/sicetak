import { useQuery } from '@tanstack/react-query';
import { getParameters } from '../api';

export function useParameters() {
  return useQuery({
    queryKey: ['parameters'],
    queryFn: getParameters
  });
}