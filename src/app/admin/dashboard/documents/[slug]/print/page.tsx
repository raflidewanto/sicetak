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
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Label } from '@/components/ui/Label';

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
      <Card>
        <CardContent>
          <CardHeader className='font-bold px-0 text-[1.125rem]'>
            Print Dokumen
          </CardHeader>
          <section className='space-y-1'>
            <Label
              htmlFor='agreement-no'
              className='block text-sm font-medium text-gray-700'
            >
              No. Agreement
            </Label>
            <div className='flex gap-x-4 flex-col gap-y-4 sm:flex-row'>
              <Input
                id="agreement-no"
                className="max-w-[21.875rem]"
                placeholder='Masukkan nomor agreement'
                onChange={(e) => setAgreementNo(e.target.value)} />
              <Button
                onClick={handleDownload}
                type='button'
                variant={"outline"}
                className='text-orange-500'
              >
                Lihat
              </Button>
            </div>
          </section>
        </CardContent>
      </Card>
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
