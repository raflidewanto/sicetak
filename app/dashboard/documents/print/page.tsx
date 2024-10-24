'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import PageContainer from '@/components/layout/page-container';
import React, { useState, useEffect } from 'react';
import { usePrintDocument } from '@/features/documents/mutations/use-print-doc';
import { AGREEMENT_NO_QUERY, DOCUMENT_ID_QUERY } from '@/constants/data';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const PrintDocumentPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const toast = useToast();
  const agreementNo = searchParams.get(AGREEMENT_NO_QUERY);
  const documentId = searchParams.get(DOCUMENT_ID_QUERY);

  const [inputAgreementNo, setInputAgreementNo] = useState<string | null>(agreementNo);

  const printMutation = usePrintDocument(String(documentId), String(inputAgreementNo));

  useEffect(() => {
    if (agreementNo) {
      setInputAgreementNo(agreementNo);
    }
  }, [agreementNo]);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newAgreementNo = event.target.value;
    setInputAgreementNo(newAgreementNo);

    const params = new URLSearchParams(searchParams.toString());
    if (newAgreementNo) {
      params.set('agreement-no', newAgreementNo);
    } else {
      params.delete('agreement-no');
    }
    router.replace(`?${params.toString()}`);
  }

  function handleDownload() {
    if (!documentId || !inputAgreementNo) {
      toast.toast({
        title: `Please enter both agreement number.`
      });
      return;
    }

    printMutation.mutate(undefined, {
      onSuccess: (data) => {
        const base64 = data.data;
        const filename = 'document.pdf';

        // Convert Base64 to binary data
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);

        // Create a Blob from the binary data
        const blob = new Blob([byteArray], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      onError: (error) => {
        toast.toast({
          title: `Error downloading the file: ${error.message}`
        });
      }
    });
  }

  return (
    <PageContainer>
      <div className="mx-auto mt-8 max-w-lg">
        <h1 className="mb-4 text-2xl font-semibold dark:text-white">Print Document</h1>
        <div className="mb-6">
          <label htmlFor="agreementNo" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Agreement Number
          </label>
          <Input
            type="text"
            id="agreementNo"
            value={inputAgreementNo || ''}
            onChange={handleInputChange}
            className="
            mt-1 block w-full 
            rounded-md 
            border border-gray-300 
            px-3 py-2 
            shadow-sm 
            focus:outline-none 
            sm:text-sm
            dark:text-white
            dark:caret-orange-500"
            placeholder="Enter agreement number"
          />
        </div>

        <div className="flex justify-end">
          <Button
            variant={'outline'}
            onClick={handleDownload}
            disabled={printMutation.isPending}
            className={`inline-flex items-center rounded-md px-4 py-2 text-sm font-medium ${
              printMutation.isPending && 'cursor-not-allowed opacity-50'
            }`}
          >
            {printMutation.isPending ? 'Downloading...' : 'Download PDF'}
          </Button>
        </div>
      </div>
    </PageContainer>
  );
};

export default PrintDocumentPage;
