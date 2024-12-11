"use client";

import { useAuthorize } from '@/services/integrations/idm/mutations/useAuthorize';
import React, { useEffect, useRef } from 'react';

const IndexPage = () => {
  const { mutateAsync: authorizeMutation } = useAuthorize();
  const dataFetchedRef = useRef(false);
  
  async function firstLoadPage() {
    try {
      const { data, success } = await authorizeMutation();
      if (success && data?.authorize) {
        window.location.href = "/sicetak/dashboard/documents";
        return;
      }
      window.location.href = process.env.NEXT_PUBLIC_IN_TOOLS_SIGN_IN_URL ?? "/";
    } catch (error) {
      window.location.href = process.env.NEXT_PUBLIC_IN_TOOLS_SIGN_IN_URL ?? "/";
    }
  }

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    firstLoadPage();
  }, []);

  return (
    <div></div>
  );
};

export default IndexPage;