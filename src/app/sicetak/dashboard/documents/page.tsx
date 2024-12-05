/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
'use client';

import PageContainer from '@/components/layout/PageContainer';
import { useAuthorize } from '@/services/integrations/idm/mutations/useAuthorize';
import { useEffect, useRef } from 'react';

const DocumentsPage = () => {
  const { mutate: authorizeMutation } = useAuthorize();
  const dataFetchedRef = useRef(false);

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    authorizeMutation();
  }, []);


  return (
    <PageContainer scrollable>
      <div className="flex min-h-[35rem] w-full flex-grow flex-col items-stretch rounded-md border border-gray-300 text-xs">
        <h1>Hello user</h1>
      </div>
    </PageContainer>
  );
};

export default DocumentsPage;