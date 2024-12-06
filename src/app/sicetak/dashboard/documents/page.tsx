/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
'use client';

import PageContainer from '@/components/layout/PageContainer';
import { LS_USER_ID } from '@/constants/data';
import { useAuthorize } from '@/services/integrations/idm/mutations/useAuthorize';
import { decryptLS } from '@/utils/crypto';
import { useEffect, useRef } from 'react';

const DocumentsPage = () => {
  const { mutate: authorizeMutation } = useAuthorize();
  const dataFetchedRef = useRef(false);
  const user =  localStorage.getItem(LS_USER_ID);

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    authorizeMutation();
  }, []);


  return (
    <PageContainer scrollable>
      <div className="flex min-h-[35rem] w-full flex-grow flex-col items-stretch rounded-md mt-12">
        <h1 className='text-2xl font-bold'>Hello {decryptLS(typeof user === 'string' ? user : "")}</h1>
      </div>
    </PageContainer>
  );
};

export default DocumentsPage;