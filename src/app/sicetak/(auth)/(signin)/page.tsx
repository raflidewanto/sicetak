"use client";

import { LS_TOKEN, LS_USER_ID } from "@/constants/data";
import { useAuthorize } from "@/services/integrations/idm/mutations/useAuthorize";
import { generateRequestBodyAuthorize } from "@/utils/auth";
import { decryptLS, encryptLS } from "@/utils/crypto";
import { AxiosError } from "axios";
import moment from "moment";
import { useEffect, useRef } from "react";


const LoginPage = () => {
  const token = localStorage.getItem(LS_TOKEN);
  const user = localStorage.getItem(LS_USER_ID);
  const decryptedToken = decryptLS(token ?? "");
  const decryptedUser = decryptLS(user ?? "");
  const authorizeMutation = useAuthorize();
  const dataFetchedRef = useRef(false);
  

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
    authorizeMutation.mutate({
      ...JSON.parse(payload),
      token: decryptedToken
    }, {
      onSuccess: (data) => {
        if (!data.success) {
          console.log(data.message);
          return;
        }
        console.log(data);
        if (data.data?.token && data?.data?.authorize) {
          localStorage.setItem(LS_TOKEN, encryptLS(data.data?.token));
        } else {
          // redirect to intools login page
          return;
        }
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          console.log(error.response?.data.message);
          return;
        }
        if (error instanceof Error) {
          console.log(error.message);
          return;
        }
        console.log(error);
      }
    });
  }, []);


  return (
    <div></div>
  );
};

export default LoginPage;
