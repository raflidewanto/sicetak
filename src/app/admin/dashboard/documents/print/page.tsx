'use client';

import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { AGREEMENT_NO_QUERY, DOCUMENT_ID_QUERY } from '@/constants/data';
import { usePrintDocument } from '@/features/documents/mutations/use-print-doc';
import { base64ToBlob } from '@/src/utils/pdf';
import { AxiosError } from 'axios';
import { useSearchParams } from 'next/navigation';
import { useQueryState } from 'nuqs';
import React, { Suspense } from 'react';

const PrintDocumentPage = () => {
  const searchParams = useSearchParams();
  const toast = useToast();
  const [agreementNo, setAgreementNo] = useQueryState(AGREEMENT_NO_QUERY);
  const documentId = searchParams.get(DOCUMENT_ID_QUERY);
  const printMutation = usePrintDocument(String(decodeURI(documentId as string)), String(agreementNo));

  function handleDownload() {
    if (!documentId || !agreementNo) {
      toast.toast({
        title: `Please enter both agreement number.`
      });
      return;
    }

    printMutation.mutate(undefined, {
      onSuccess: (data) => {
        if (data.success) {
          const base64 = data.data;
          const blob = base64ToBlob(base64 || '', 'application/pdf');
          const url = URL.createObjectURL(blob);
          const pdfWindow = window.open('') as WindowProxy;
          pdfWindow.document.write("<iframe width='100%' height='100%' src='" + url + "'></iframe>");
          return;
        }
        toast.toast({
          title: `Error downloading the file: ${data.message}`
        });
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          if (error?.status === 400) {
            toast.toast({
              title: `Error downloading the file: ${error.response?.data.message}`,
              variant: 'destructive'
            });
            return;
          }
          toast.toast({
            title: `Something went wrong`
          });
          return;
        }
        toast.toast({
          title: `Error downloading the file: ${error.message}`
        });
      }
    });
  }

  return (
    <PageContainer scrollable>
      <div className="mx-auto mt-8 min-h-screen max-w-lg">
        <h1 className="mb-4 text-2xl font-semibold">Print Document</h1>
        <div className="mb-6">
          <label htmlFor="agreementNo" className="block text-sm font-medium text-gray-700">
            Agreement Number
          </label>
          <Input
            type="text"
            id="agreementNo"
            value={agreementNo || ''}
            onChange={(e) => setAgreementNo(e.target.value)}
            className="
            mt-1 block w-full 
            rounded-md 
            border border-gray-300 
            px-3 py-2 
            shadow-sm 
            focus:outline-none 
            sm:text-sm"
            placeholder="Enter agreement number"
          />
        </div>

        <div className="flex justify-end">
          <Button
            variant={'outline'}
            onClick={handleDownload}
            disabled={printMutation.isPending}
            className={`inline-flex items-center rounded-md px-4 py-2 text-sm font-medium ${printMutation.isPending && 'cursor-not-allowed opacity-50'
              }`}
          >
            {printMutation.isPending ? 'Downloading...' : 'Download PDF'}
          </Button>
        </div>
      </div>
    </PageContainer>
  );
};

export default function PrintDocument() {
  return (
    <Suspense>
      <PrintDocumentPage />
    </Suspense>
  );
}
