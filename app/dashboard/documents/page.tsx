'use client';

import PageContainer from '@/components/layout/page-container';
import Loader from '@/components/loader';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { productTypes } from '@/constants/data';
import DocumentsTable from '@/features/documents/components/documents-table';
import { useDeleteDoc } from '@/features/documents/mutations/use-delete-doc';
import { useToggleActive } from '@/features/documents/mutations/use-toggle-active';
import { useToggleRelease } from '@/features/documents/mutations/use-toggle-release';
import { useDocuments } from '@/features/documents/queries/use-documents';
import { useDebounceValue } from '@/hooks/use-debounce-value';
import useDisclosure from '@/hooks/use-disclosure';
import { getErrorMessage } from '@/utils/error';
import { AxiosError } from 'axios';
import { useQueryState } from 'nuqs';
import { Suspense } from 'react';

const DocumentsPage = () => {
  // Query params
  const [searchQuery, setSearchQuery] = useQueryState('docName');
  const [selectedType, setSelectedType] = useQueryState('docType');
  const [selectedProductType, setSelectedProductType] = useQueryState('docProduct');
  // Debounce the values with a delay of 1000ms then set the debounced values to the query state
  const [debouncedSearchQuery] = useDebounceValue(searchQuery, 1000);
  const [debouncedSelectedType] = useDebounceValue(selectedType, 1000);
  const [debouncedSelectedProductType] = useDebounceValue(selectedProductType, 1000);

  // Documents
  const { data, isLoading, isError } = useDocuments(
    debouncedSelectedType ?? '',
    debouncedSearchQuery ?? '',
    debouncedSelectedProductType ?? ''
  );
  const deleteDocMutation = useDeleteDoc();
  const toggleActiveMutation = useToggleActive();
  const releaseMutation = useToggleRelease();

  // UI state
  const { isOpen, onClose, onOpen } = useDisclosure();

  if (isError)
    return (
      <PageContainer>
        <p className="min-h-screen dark:text-white">Oops! Something went wrong, please try again in a few minutes</p>
      </PageContainer>
    );

  function handleDownload(file: string) {
    try {
      // Decode the base64 string
      const byteString = atob(file);
      const byteArray = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; i++) {
        byteArray[i] = byteString.charCodeAt(i);
      }

      const blob = new Blob([byteArray], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const pdfWindow = window.open('') as WindowProxy;
      pdfWindow.document.write("<iframe width='100%' height='100%' src='" + url + "'></iframe>");
    } catch (error) {
      toast({
        title: `Error downloading the file: ${getErrorMessage(error)}`
      });
      return;
    }
  }

  function handleDelete(id: string) {
    deleteDocMutation.mutate(id, {
      onSuccess: () => {
        window.location.reload();
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          if (error.response?.status === 400) {
            toast({
              title: `Error deleting the file: ${error.response?.data.message}`
            });
            return;
          }
          toast({
            title: `Something went wrong`
          });
          return;
        }
        toast({
          title: `Error deleting the file: ${error.message}`
        });
        return;
      }
    });
  }

  return (
    <PageContainer scrollable>
      <div className="flex w-full flex-col items-start justify-center gap-y-8">
        {/* Search and Filter Controls */}
        <div className="flex w-full flex-col items-start justify-start gap-x-4 gap-y-4">
          <Input
            className="w-3/4"
            type="text"
            placeholder="Search by document name..."
            value={searchQuery ?? ''}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="flex flex-wrap items-center justify-start gap-x-4 gap-y-4">
            <Select onValueChange={(value) => setSelectedType(value)}>
              <SelectTrigger className="w-[180px] py-4">
                <SelectValue placeholder="Pilih jenis dokumen" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Jenis Dokumen</SelectLabel>
                  <SelectItem value="">Semua</SelectItem>
                  <SelectItem value="personal">Perseorangan</SelectItem>
                  <SelectItem value="company">Perusahaan</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => setSelectedProductType(value)}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Pilih jenis produk" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Jenis Produk</SelectLabel>
                  {productTypes.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DocumentsTable
          data={data}
          isLoading={isLoading}
          handleDownload={handleDownload}
          handleDelete={handleDelete}
          onOpen={onOpen}
          onClose={onClose}
          toggleActiveMutation={toggleActiveMutation}
          releaseMutation={releaseMutation}
          deleteDocMutation={deleteDocMutation}
          isOpen={isOpen}
        />
      </div>
    </PageContainer>
  );
};

export default function Documents() {
  return (
    <Suspense
      fallback={
        <PageContainer>
          <Loader />
        </PageContainer>
      }
    >
      <DocumentsPage />
    </Suspense>
  );
}
