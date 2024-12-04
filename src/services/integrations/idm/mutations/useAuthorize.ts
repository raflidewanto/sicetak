import { useMutation } from '@tanstack/react-query';
import { authorize } from '../api';

export function useAuthorize() {
  return useMutation({
    mutationFn: authorize,
  });
}