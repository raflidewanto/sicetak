"use client";

import { useRef, useEffect, useState } from "react";
import { AxiosError } from "axios";
import moment from "moment";
import { useAuthorize } from "@/services/integrations/idm/mutations/useAuthorize";
import { generateRequestBodyAuthorize } from "@/utils/auth";
import { LS_TOKEN, LS_USER_ID } from "@/constants/data";
import { decryptLS, encryptLS } from "@/utils/crypto";

export const useAuthorizeUser = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const { isPending, error, mutate } = useAuthorize();
  const [errorMessage, setError] = useState("");
  const dataFetchedRef = useRef(false);
  const token = localStorage.getItem(LS_TOKEN);
  const user = localStorage.getItem(LS_USER_ID);
  const decryptedToken = decryptLS(token ?? "");
  const decryptedUser = decryptLS(user ?? "");

  useEffect(() => {
    if (dataFetchedRef.current) {
      return;
    }
    dataFetchedRef.current = true;

    const payload = generateRequestBodyAuthorize(
      decryptedToken,
      decryptedUser,
      2,
      moment().format("YYYY-MM-DD HH:mm:ss"),
      process.env.NEXT_PUBLIC_PRIVATE_KEY ?? ""
    );
    mutate(
      {
        ...JSON.parse(payload),
        token: decryptedToken,
      },
      {
        onSuccess: (data) => {
          if (!data.success) {
            setError(data?.message ?? "Authorization failed.");
            return;
          }
          if (data.data?.token && data?.data?.authorize) {
            console.log("setting LS token");
            
            localStorage.setItem(LS_TOKEN, encryptLS(data.data?.token));
            setIsAuthorized(data?.data?.authorize);
          } else {
            setError("Unauthorized. Redirecting to login.");
          }
        },
        onError: (error) => {
          if (error instanceof AxiosError) {
            setError(error.response?.data.message ?? "Authorization failed.");
          } else if (error instanceof Error) {
            setError(error.message);
          } else {
            setError("An unknown error occurred.");
          }
        },
      }
    );
  }, []);

  return { isAuthorized, error, isPending, errorMessage };
};
