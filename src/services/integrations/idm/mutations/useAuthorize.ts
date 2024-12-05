import { LS_TOKEN } from '@/constants/data';
import { encryptLS } from '@/utils/crypto';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { authorize } from '../api';

export function useAuthorize() {
  return useMutation({
    mutationFn: authorize,
    onSuccess: (data) => {
      if (!data.success) {
        console.log(data.message);
        // localStorage.removeItem(LS_TOKEN);
        return;
      }
      if (data.data?.token && data?.data?.authorize) {
        console.log("User Authorized");
        localStorage.setItem(LS_TOKEN, encryptLS(data.data?.token));
      } else {
        // localStorage.removeItem(LS_TOKEN);
        console.error("Error authorizing user");
        return;
      }
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        console.error(error);
        if (error.response?.status === 403) {
          console.error("Unauthorized");
          // localStorage.removeItem(LS_TOKEN);
          // window.location.href = process.env.NEXT_PUBLIC_IN_TOOLS_SIGN_IN_URL ?? "/";
        }
        // localStorage.removeItem(LS_TOKEN);
        return;
      }
      if (error instanceof Error) {
        console.log(error.message);
        // localStorage.removeItem(LS_TOKEN);
        return;
      }
      console.log(error);
      // localStorage.removeItem(LS_TOKEN);
    }
  });
}