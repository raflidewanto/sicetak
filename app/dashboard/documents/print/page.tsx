'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import PageContainer from '@/components/layout/page-container';
import React, { useState, useEffect } from 'react';
import { usePrintDocument } from '@/features/documents/mutations/use-print-doc';

const PrintDocumentPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const agreementNo = searchParams.get('agreement-no');
  const documentId = searchParams.get('id');

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
      alert('Please enter an agreement number.');
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
        console.error('Error downloading document:', error);
        alert('Failed to download document.');
      }
    });
  }

  return (
    <PageContainer>
      <div className="mx-auto mt-8 max-w-lg">
        <h1 className="mb-4 text-2xl font-semibold">Print Document</h1>
        <div className="mb-6">
          <label htmlFor="agreementNo" className="block text-sm font-medium text-gray-700">
            Agreement Number
          </label>
          <input
            type="text"
            id="agreementNo"
            value={inputAgreementNo || ''}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
            placeholder="Enter agreement number"
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleDownload}
            disabled={printMutation.isPending} // Disable button while loading
            className={`inline-flex items-center rounded-md border border-transparent bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700 ${
              printMutation.isPending && 'cursor-not-allowed opacity-50'
            }`}
          >
            {printMutation.isPending ? 'Downloading...' : 'Download PDF'}
          </button>
        </div>
      </div>
    </PageContainer>
  );
};

export default PrintDocumentPage;
