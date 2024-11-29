'use client';

import PageContainer from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Modal } from '@/components/ui/Modal';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/Tooltip';
import { AGREEMENT_NO_QUERY } from '@/constants/data';
import { useModal } from '@/hooks/useModal';
import { useCategories } from '@/services/categories/queries/useCategories';
// import { useCustomers } from '@/services/customers/queries/useCustomers';
import { usePrintDocument } from '@/services/documents/mutations/usePrintDocument';
import { useDocuments } from '@/services/documents/queries/useDocuments';
import { Printer } from 'lucide-react';
import { useQueryState } from 'nuqs';
import { Suspense } from 'react';

const PrintDocumentPage = () => {
  const { modalState, closeModal, openModal } = useModal();
  const { data: categories } = useCategories();

  // const { data: customer } = useCustomers(agreementNo);
  const { data: documents } = useDocuments();

  const [agreementNoQuery, setAgreementNoQuery] = useQueryState(AGREEMENT_NO_QUERY, {
    clearOnDefault: true
  });

  const printMutation = usePrintDocument();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <PageContainer scrollable>
      <section className='space-y-8 w-full'>
        <Card>
          <CardContent>
            <CardHeader className='font-bold px-0 text-[1.125rem]'>
              Print Dokumen
            </CardHeader>
            <form onSubmit={handleSubmit}>
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
                    onChange={e => setAgreementNoQuery(e.target.value)}
                  />
                  <Button
                    type='submit'
                    variant={"outline"}
                    className='text-orange-500'
                  >
                    Lihat
                  </Button>
                </div>
              </section>
            </form>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardContent className="text-sm">
            <CardHeader className='font-bold px-0 text-[1.125rem]'>
              Data Konsumen
            </CardHeader>
            <section className='grid grid-cols-1 justify-items-start gap-x-6 items-start md:grid-cols-2'>
              <div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-600 font-medium">No. Agreement</span>
                  <div className='min-w-24'></div>
                  <span>9019206526</span>
                </div>
                <div className="flex justify-between py-1">
                  <p className="text-gray-600 font-medium">Customer Name</p>
                  <div className='min-w-10'></div>
                  <p>FITRI ANGGRAINI</p>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-600 font-medium">Nomor Plat</span>
                  <div className='min-w-10'></div>
                  <span>B1347FFV</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-600 font-medium">Tipe Debitur</span>
                  <div className='min-w-10'></div>
                  <span className='text-start'>Perseorangan</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-600 font-medium">Product</span>
                  <span>FASILITAS DANA</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-600 font-medium">OTR</span>
                  <span>Rp.119.000.000,00</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-600 font-medium">Tenor</span>
                  <span>36</span>
                </div>
              </div>
            </section>
          </CardContent>
        </Card>

        <section className="min-h-max flex-1 overflow-x-scroll px-4">
          <div className="flex w-full flex-col gap-4 px-2 py-2">
            <div className="w-full overflow-auto rounded-b-md border-b">
              <Table className="w-full">
                <TableHeader className="py-2">
                  <TableRow>
                    <TableHead className="px-4 py-2 text-left">Nama Dokumen</TableHead>
                    <TableHead className="px-4 py-2 text-center">Cetak isi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="bg-white">
                  {documents?.data?.map((doc) => (
                    <TableRow key={doc.document_code} className="h-[3.313rem] border-b">
                      <TableCell className="px-4 py-2">{doc.name}</TableCell>
                      <TableCell className="px-4 py-2 text-center">
                        <div className="flex items-center justify-evenly gap-x-2">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Printer
                                  onClick={() => {
                                    printMutation.mutate({
                                      agreementNo: agreementNoQuery ?? "",
                                      documentCode: doc?.document_code
                                    }, {
                                      onSuccess: (data) => {
                                        if (!data?.success) {
                                          openModal("Error", data?.message, "error");
                                          return;
                                        }
                                        // open new tab with the printed document
                                        if (data?.data == null) {
                                          openModal("Error", "Failed to print document", "error");
                                          return
                                        }
                                        const byteString = atob(data?.data);
                                        const byteArray = new Uint8Array(byteString.length);
                                        for (let i = 0; i < byteString.length; i++) {
                                          byteArray[i] = byteString.charCodeAt(i);
                                        }

                                        const blob = new Blob([byteArray], { type: 'application/pdf' });
                                        const url = URL.createObjectURL(blob);
                                        const pdfWindow = window.open('') as WindowProxy;
                                        pdfWindow.document.write("<iframe width='100%' height='100%' src='" + url + "'></iframe>");
                                      }
                                    });
                                  }}
                                  className="cursor-pointer text-[#3B3B3B]"
                                />
                              </TooltipTrigger>
                              <TooltipContent>Print Dokumen</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </section>

        <Modal
          title={modalState.title}
          description={modalState.description}
          isOpen={modalState.isOpen}
          onClose={closeModal}
          type={modalState.type}
        />
      </section>
    </PageContainer >
  );
};

export default function PrintDocument() {
  return (
    <Suspense>
      <PrintDocumentPage />
    </Suspense>
  );
}
