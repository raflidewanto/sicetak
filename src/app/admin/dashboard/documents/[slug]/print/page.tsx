'use client';

import PageContainer from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { AGREEMENT_NO_QUERY } from '@/constants/data';
import { usePrintDocument } from '@/services/documents/mutations/usePrintDocument';
import { useModal } from '@/hooks/useModal';
import { base64ToBlob } from '@/utils/pdf';
import { AxiosError } from 'axios';
import { useParams } from 'next/navigation';
import { useQueryState } from 'nuqs';
import { Suspense } from 'react';

const PrintDocumentPage = () => {
  const [agreementNo, setAgreementNo] = useQueryState(AGREEMENT_NO_QUERY);
  const { slug: documentId } = useParams<{ slug: string }>();
  const printMutation = usePrintDocument(String(decodeURI(documentId as string)), String(agreementNo));

  // UI states
  const { closeModal, openModal, modalState } = useModal();

  function handleDownload() {
    if (!documentId) {
      openModal("Warning", `Document missing.`, 'warning');
      return;
    }
    if (!agreementNo) {
      openModal("Warning", `Please enter agreement number.`, 'warning');
      return;
    }

    printMutation.mutate(undefined, {
      onSuccess: (data) => {
        if (data?.success) {
          const base64 = data.data;
          const blob = base64ToBlob(base64 || '', 'application/pdf');
          const url = URL.createObjectURL(blob);
          const pdfWindow = window.open('') as WindowProxy;
          pdfWindow.document.write("<iframe width='100%' height='100%' src='" + url + "'></iframe>");
          return;
        }
        openModal("Error", `Error downloading the file: ${data.message}`, 'error');
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          if (error?.status === 400) {
            openModal("Error", `Error downloading the file: ${error.response?.data.message}`, 'error');
            return;
          }
          openModal("Error", `Something went wrong`, 'error');
          return;
        }
        openModal("Error", `Error downloading the file: ${error.message}`, 'error');
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
            bg-white
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
      <Modal
        title={modalState.title}
        description={modalState.description}
        isOpen={modalState.isOpen}
        onClose={closeModal}
        type={modalState.type}
      />
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
