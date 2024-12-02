/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
'use client';

import { DocumentsTableSkeleton } from '@/components/DocumentTableSkeleton';
import Show from '@/components/elements/Show';
import PageContainer from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/Select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/Tooltip';
import { CATEGORY_QUERY, DOCUMENT_NAME_QUERY, DOCUMENT_TYPE_QUERY, SUBCATEGORY_QUERY } from '@/constants/data';
import { useDebounceValue } from '@/hooks/useDebounceValue';
import useDisclosure from '@/hooks/useDisclosure';
import { cN } from '@/lib/utils';
import { useDocuments } from '@/services/documents/queries/useDocuments';
import { useSubCategories } from '@/services/subcategories/queries/useSubcategories';
import { getErrorMessage } from '@/utils/error';
import { DownloadCloud, Search } from 'lucide-react';
import { useQueryState } from 'nuqs';
import { Suspense, useState } from 'react';

const DocumentsPage = () => {
  // UI states
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [errorMessage, setErrorMessage] = useState('');

  // query state
  const [categoryQuery, setCategoryQuery] = useQueryState(CATEGORY_QUERY);
  const [subCategoryQuery, setSubCategoryQuery] = useQueryState(SUBCATEGORY_QUERY);
  const [documentQuery, setDocumentQuery] = useQueryState(DOCUMENT_NAME_QUERY);
  const [documentType, setDocumentType] = useQueryState(DOCUMENT_TYPE_QUERY);

  // debounced query state
  const [categoryDebouncedQuery] = useDebounceValue(categoryQuery, 1500);
  const [subCategoryDebouncedQuery] = useDebounceValue(subCategoryQuery, 1500);
  const [documentDebouncedQuery] = useDebounceValue(documentQuery, 1500);
  const [documentTypeDebouncedQuery] = useDebounceValue(documentType, 1500);

  // queries
  const { data: documents, isLoading: isDocumentsLoading } = useDocuments(
    documentDebouncedQuery ?? '',
    categoryDebouncedQuery ?? '',
    subCategoryDebouncedQuery ?? '',
    documentTypeDebouncedQuery ?? ''
  );
  const { data: subCategories } = useSubCategories();

  function handleDownloadTemplate(file: string) {
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
      setErrorMessage(getErrorMessage(error));
      onOpen();
      return;
    }
  }

  return (
    <PageContainer scrollable>
      <div className="flex min-h-[35rem] w-full flex-grow flex-col items-stretch rounded-md border border-gray-300 text-xs">
        {/* header */}
        <section className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 rounded-tl-md rounded-tr-md border-b border-gray-300 bg-[#173E55] px-4 py-2">
          {/* Title */}
          <h1 className="text-base text-white">Sub Category</h1>
          {/* Filter */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-5">
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-2 top-[0.45rem]" color="gray" size={18} />
              <Input
                value={documentQuery || ''}
                className="h-8 w-full bg-white pl-8 md:w-96"
                placeholder="Search..."
                onChange={(e) => setDocumentQuery(e.target.value)}
              />
            </div>
            <Select
              onValueChange={(v) => {
                if (v.length === 0) return setCategoryQuery(null);
                setCategoryQuery(v);
              }}
            >
              <SelectTrigger className="w-full bg-white md:w-[12rem]">
                <SelectValue placeholder="Pilih Kategori" className="py-3" />
              </SelectTrigger>
              <SelectContent className="w-full md:w-64">
                <SelectGroup>
                  <SelectLabel>Pilih Kategori</SelectLabel>
                  <SelectItem value={''}>Semua</SelectItem>
                  <SelectItem value="financing-agreement">Financing Agreement</SelectItem>
                  <SelectItem value="agreement-transfer">Agreement Transfer</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select
              onValueChange={(v) => {
                if (v.length === 0) return setDocumentType(null);
                setDocumentType(v);
              }}
            >
              <SelectTrigger className="w-full bg-white md:w-[12rem]">
                <SelectValue placeholder="Pilih Tipe Dokumen" className="py-3" />
              </SelectTrigger>
              <SelectContent className="w-full md:w-64">
                <SelectGroup>
                  <SelectLabel>Pilih Tipe Dokumen</SelectLabel>
                  <SelectItem value="">Semua</SelectItem>
                  <SelectItem value="personal">Perseorangan</SelectItem>
                  <SelectItem value="corporate">Perusahaan</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </section>
        <main className="flex flex-grow flex-col sm:flex-row">
          {/* sub categories container */}
          <section className="max-h-dvh w-full border-r-2 border-gray-300 bg-white md:w-[20%]">
            {/* sub category Card */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="w-full">
                  <div
                    onClick={() => setSubCategoryQuery(null)}
                    className={cN(
                      `flex min-h-[3rem] w-full items-center justify-between border-b border-gray-300 bg-white px-4 py-2 transition-all hover:border-l-4 hover:border-l-[#173E55] hover:bg-background`
                    )}
                  >
                    <p className={cN(`text-sm font-semibold capitalize`)}>Semua</p>
                  </div>
                </TooltipTrigger>
              </Tooltip>
            </TooltipProvider>
            <Show when={Boolean(subCategories?.data)}>
              {subCategories?.data?.map((subcategory) => (
                <TooltipProvider key={subcategory?.category_code}>
                  <Tooltip>
                    <TooltipTrigger className="w-full">
                      <div
                        onClick={() =>
                          setSubCategoryQuery(subcategory?.subcategory_name.split(' ').join('_').toLowerCase())
                        }
                        className={cN(
                          `flex min-h-[3rem] w-full items-center justify-between border-b border-gray-300 bg-white px-4 py-2 transition-all hover:border-l-4 hover:border-l-[#173E55] hover:bg-background`,
                          {
                            'border-l-4 border-l-[#173E55] bg-background':
                              subCategoryQuery === subcategory?.subcategory_name.split(' ').join('_').toLowerCase()
                          }
                        )}
                      >
                        <p
                          className={cN(`text-sm font-semibold capitalize`, {
                            'line-clamp-1': subcategory?.subcategory_name.length > 17
                          })}
                        >
                          {(subcategory?.subcategory_name?.toString().length ?? 0) > 18
                            ? subcategory?.subcategory_name.split("_").join(" ").substring(0, 17) + '...'
                            : subcategory?.subcategory_name.split("_").join(" ")}
                        </p>
                        <TooltipContent>
                          <p>{subcategory?.subcategory_name.split("_").join(" ")}</p>
                        </TooltipContent>
                      </div>
                    </TooltipTrigger>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </Show>
          </section>
          {/* table */}
          <section className="min-h-max flex-1 overflow-x-scroll px-4">
            <div className="flex w-full flex-col gap-4 px-2 py-2">
              <div className="w-full overflow-auto rounded-b-md border-b">
                <Table className="w-full">
                  <TableHeader className="py-2">
                    <TableRow>
                      <TableHead className="px-4 py-2 text-left">Nama Dokumen</TableHead>
                      <TableHead className="px-4 py-2 text-center">Download Dokumen</TableHead>
                    </TableRow>
                  </TableHeader>
                  <Show when={isDocumentsLoading}>
                    <DocumentsTableSkeleton />
                  </Show>
                  <Show
                    when={!isDocumentsLoading && (documents?.data?.length ?? 0) > 0}>
                    <TableBody className="bg-white">
                      {documents?.data?.map((doc) => (
                        <TableRow key={doc.document_code} className="h-[3.313rem] border-b">
                          <TableCell className="px-4 py-2">{doc.name}</TableCell>
                          <TableCell className="px-4 py-2 text-center">
                            <div className="flex items-center justify-evenly gap-x-2">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <DownloadCloud
                                      onClick={() => handleDownloadTemplate(doc?.file)}
                                      className="cursor-pointer text-[#3B3B3B]"
                                    />
                                  </TooltipTrigger>
                                  <TooltipContent>Download Template</TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Show>
                  <Show when={Boolean(!documents?.data) && !isDocumentsLoading} >
                    <TableBody>
                      <TableRow>
                        <TableCell className="px-4 py-2 w-full">
                          <div className="flex items-center justify-center w-full">
                            <p className="text-center text-gray-500 w-full">No data</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Show>
                </Table>
              </div>
            </div>
          </section>
        </main>
      </div>
      <Modal title="Error" description={errorMessage ?? 'Something went wrong'} isOpen={isOpen} onClose={onClose} type='error'>
        <Button variant="destructive" onClick={onClose}>
          Close
        </Button>
      </Modal>
    </PageContainer>
  );
};

export default function DocumentsPageSuspense() {
  return (
    <Suspense>
      <DocumentsPage />
    </Suspense>
  );
}
