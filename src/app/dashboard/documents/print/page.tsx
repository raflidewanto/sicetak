'use client';

import Show from '@/components/elements/Show';
import PageContainer from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Modal } from '@/components/ui/Modal';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { AGREEMENT_NO_QUERY } from '@/constants/data';
import { useModal } from '@/hooks/useModal';
import { getCustomersDetailResponse } from '@/services/customers/api';
import { useCustomer } from '@/services/customers/mutations/useConsument';
import { usePrintDocument } from '@/services/documents/mutations/usePrintDocument';
import { getErrorMessage } from '@/utils/error';
import { formatRupiah } from '@/utils/string';
import { AxiosError } from 'axios';
import { Printer } from 'lucide-react';
import { useQueryState } from 'nuqs';
import { Suspense, useState } from 'react';

const PrintDocumentPage = () => {
  const { modalState, closeModal, openModal } = useModal();

  const [customerDetails, setCustomerDetails] = useState<getCustomersDetailResponse | null>(null);
  const [agreementNoQuery, setAgreementNoQuery] = useQueryState(AGREEMENT_NO_QUERY);

  const consumentMutation = useCustomer();
  const printMutation = usePrintDocument();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    consumentMutation.mutate(
      { agreement_no: agreementNoQuery ?? "" },
      {
        onSuccess: (data) => {
          if (!data?.success) {
            openModal("Error", data?.message, "error");
            return;
          }
          setCustomerDetails(data?.data as getCustomersDetailResponse);
        },
        onError: (error) => {
          if (error instanceof AxiosError) {
            const status = error.response?.status;
            if (status === 400) {
              openModal("Error", `Error fetching customer details: ${error.response?.data.message}`, 'error');
              return;
            }
            openModal("Error", `Something went wrong`, 'error');
            return;
          } else if (error instanceof Error) {
            openModal("Error", `Error fetching customer details: ${error.message}`, 'error');
            return;
          }
          const errMessage = getErrorMessage(error);
          openModal("Error", `Error fetching customer details: ${errMessage ? errMessage : 'Something went wrong'}`, 'error');
          return;
        }
      }
    );
  }

  return (
    <PageContainer scrollable>
      <section className="space-y-8 w-full">
        <Card>
          <CardContent>
            <CardHeader className="font-bold px-0 text-[1.125rem]">Print Dokumen</CardHeader>
            <form onSubmit={handleSubmit}>
              <section className="space-y-1">
                <Label
                  htmlFor="agreement-no"
                  className="block text-sm font-medium text-gray-700"
                >
                  No. Agreement
                </Label>
                <div className="flex gap-x-4 flex-col gap-y-4 sm:flex-row">
                  <Input
                    id="agreement-no"
                    className="max-w-[21.875rem]"
                    placeholder="Masukkan nomor agreement"
                    onChange={(e) => setAgreementNoQuery(e.target.value)}
                  />
                  <Button
                    type="submit"
                    variant={"outline"}
                    className="text-orange-500"
                  >
                    Lihat
                  </Button>
                </div>
              </section>
            </form>
          </CardContent>
        </Card>

        <Show when={Boolean(customerDetails)}>
          {/* Customer Details Section */}
          <Card className="w-full">
            <CardContent className="text-sm">
              <CardHeader className="font-bold px-0 text-[1.125rem]">Data Konsumen</CardHeader>
              <section className="grid grid-cols-1 justify-items-start gap-x-6 items-start md:grid-cols-2">
                <div>
                  <div className="flex py-1">
                    <span className="text-gray-600 font-medium min-w-[10rem]">No. Agreement</span>
                    <span className="flex-1">{customerDetails?.agreement_no}</span>
                  </div>
                  <div className="flex py-1">
                    <p className="text-gray-600 font-medium min-w-[10rem]">Customer Name</p>
                    <p className="flex-1">{customerDetails?.name}</p>
                  </div>
                  <div className="flex py-1">
                    <span className="text-gray-600 font-medium min-w-[10rem]">Nomor Plat</span>
                    <span className="flex-1">{customerDetails?.plate_no}</span>
                  </div>
                  <div className="flex py-1">
                    <span className="text-gray-600 font-medium min-w-[10rem]">Tipe Debitur</span>
                    <span className="flex-1">{customerDetails?.debtor_type}</span>
                  </div>
                </div>
                <div>
                  <div className="flex py-1">
                    <span className="text-gray-600 font-medium min-w-[10rem]">Product</span>
                    <span className="flex-1">{customerDetails?.subcategory_code}</span>
                  </div>
                  <div className="flex py-1">
                    <span className="text-gray-600 font-medium min-w-[10rem]">OTR</span>
                    <span className="flex-1">{formatRupiah(customerDetails?.otr ?? -1)}</span>
                  </div>
                </div>
              </section>
            </CardContent>
          </Card>

          {/* Documents Table */}
          <section className="min-h-max flex-1 overflow-x-scroll">
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
                    {customerDetails?.documents.map((doc, idx) => (
                      <TableRow key={`${doc.document_code}-${idx}`} className="h-[3.313rem] border-b">
                        <TableCell className="px-4 py-2">{doc.name ?? "N/A"}</TableCell>
                        <TableCell className="px-4 py-2 flex justify-center items-center">
                          <Printer
                            onClick={() =>
                              printMutation.mutate(
                                { agreementNo: agreementNoQuery ?? "", documentCode: doc.document_code },
                                {
                                  onSuccess: (data) => {
                                    if (data?.success && data.data) {
                                      const byteString = atob(data.data);
                                      const byteArray = new Uint8Array(byteString.length);
                                      for (let i = 0; i < byteString.length; i++) {
                                        byteArray[i] = byteString.charCodeAt(i);
                                      }

                                      const blob = new Blob([byteArray], { type: "application/pdf" });
                                      const url = URL.createObjectURL(blob);
                                      const pdfWindow = window.open("") as WindowProxy;
                                      pdfWindow.document.write(
                                        "<iframe width='100%' height='100%' src='" + url + "'></iframe>"
                                      );
                                    } else {
                                      openModal("Error", "Failed to print document", "error");
                                    }
                                  }
                                }
                              )
                            }
                            className="cursor-pointer text-[#3B3B3B]"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </section>
        </Show>

        <Modal
          title={modalState.title}
          description={modalState.description}
          isOpen={modalState.isOpen}
          onClose={closeModal}
          type={modalState.type}
        />
      </section>
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

