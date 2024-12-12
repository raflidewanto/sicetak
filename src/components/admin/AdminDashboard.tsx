/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
"use client";

import NoDataIcon from '@/assets/icons/ic-no-data.svg';
import { DOCUMENT_NAME_QUERY, LS_USER_ROLES, Roles } from '@/constants/data';
import { useDebounceValue } from '@/hooks/useDebounceValue';
import { useModal } from '@/hooks/useModal';
import { cN } from '@/lib/utils';
import { useCategories } from '@/services/categories/queries/useCategories';
import { CategoryDTOResponse } from '@/services/categories/types';
import { useDocuments } from '@/services/documents/queries/useDocuments';
import { decryptLS } from '@/utils/crypto';
import { getErrorMessage } from '@/utils/error';
import { DownloadCloud, Edit2Icon, Printer, PrinterIcon, Search } from 'lucide-react';
import Link from 'next/link';
import { useQueryState } from 'nuqs';
import { Suspense, useEffect, useState } from 'react';
import CategorySkeleton from '../CategorySkeleton';
import ClientOnly from '../elements/ClientOnly';
import Show from '../elements/Show';
import ToolTip from '../ToolTip';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Modal } from '../ui/Modal';
import { Skeleton } from '../ui/Skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/Table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/Tooltip';

const AdminDashboard = () => {
  // UI states
  const { openModal, closeModal, modalState } = useModal();

  // query state
  const [documentQuery, setDocumentQuery] = useQueryState(DOCUMENT_NAME_QUERY);

  // debounced query state
  const [documentDebouncedQuery] = useDebounceValue(documentQuery, 1500);

  // queries
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState(categories?.data?.[0]?.code);
  const [subcategories, setSubcategories] = useState<CategoryDTOResponse[] | []>([]);

  const [subCategoryCode, setSubCategoryCode] = useState(subcategories?.[0]?.code ?? "");

  const { data: documents, isLoading: documentsLoading, error: documentError } = useDocuments(subCategoryCode, documentDebouncedQuery ?? "");

  useEffect(() => {
    if (categories && (categories?.data?.length ?? 0) > 0) {
      if (categories?.data) {
        const initialCategory = categories?.data[0];
        setSelectedCategory(initialCategory.code);
        setSubcategories(initialCategory.sub_categories || []);
        setSubCategoryCode(initialCategory.sub_categories[0]?.code ?? "");
      }
    }
  }, [categories]);

  useEffect(() => {
    const category = categories?.data?.find((c) => c.code === selectedCategory);
    setSubcategories(category?.sub_categories || []);
    setSubCategoryCode(category?.sub_categories[0]?.code ?? "");
  }, [selectedCategory, categories]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const rolesStr = window.localStorage.getItem(LS_USER_ROLES);
      const roles = rolesStr ? JSON.parse(decryptLS(rolesStr)) as Roles : [];
      const isAdmin = roles.some((role) => role.role_code === 'admin-sicetak');
      if (isAdmin) {
        return;
      }
      window.location.href = '/sicetak/dashboard/documents';
    }
  }, []);

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
      openModal("Error", `Error downloading the file ${getErrorMessage(error)}`, 'error');
      return;
    }
  }

  return (
    <div>
      {/* header */}
      <section className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 rounded-tl-md rounded-tr-md border-b border-gray-300 bg-[#173E55] px-4 py-2" >
        {/* Filter */}
        <div className="flex flex-wrap items-center justify-between w-full gap-x-2 gap-y-5" >
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-2 top-[0.45rem]" color="gray" size={18} />
            <Input
              value={documentQuery || ''}
              className="h-8 w-full bg-white pl-8 md:w-96"
              placeholder="Search..."
              onChange={(e) => setDocumentQuery(e.target.value)}
            />
          </div>
          <Link className='items-end' href="/sicetak/admin/dashboard/documents/upload">
            <Button>
              Upload Dokumen
            </Button>
          </Link>
        </div >
      </section >
      <main className="flex flex-grow flex-col lg:flex-row">
        {/* categories */}
        <section className="max-h-dvh w-full border-r-2 border-gray-300 bg-white lg:w-[20%]">
          <h1 className='text-base font-bold capitalize mt-1 p-2 border-b border-gray-300'>Kategori</h1>
          <Show when={categoriesLoading}>
            <CategorySkeleton />
          </Show>
          <Show when={!categoriesLoading && (!categories?.data || categories == null)}>
            <div className='grid place-content-center p-4'>
              <NoDataIcon />
            </div>
          </Show>
          <Show when={Boolean(categories?.data)}>
            {categories?.data?.sort((a, b) => a.name.localeCompare(b.name)).map((category) => (
              <TooltipProvider key={category?.code}>
                <Tooltip>
                  <TooltipTrigger className="w-full">
                    <div
                      onClick={() =>
                        setSelectedCategory(category?.code)
                      }
                      className={cN(
                        `flex min-h-[3rem] w-full items-center justify-between border-b border-gray-300 bg-white px-4 py-2 transition-all hover:border-l-4 hover:border-l-[#173E55] hover:bg-background`,
                        {
                          'border-l-4 border-l-[#173E55] bg-background':
                            selectedCategory === category?.code
                        }
                      )}
                    >
                      <p
                        className={cN(`text-sm font-semibold capitalize`, {
                          'line-clamp-1': category?.name.length > 17
                        })}
                      >
                        {(category?.name?.toString().length ?? 0) > 18
                          ? category?.name.split("_").join(" ").substring(0, 17) + '...'
                          : category?.name.split("_").join(" ")}
                      </p>
                      <TooltipContent>
                        <p>{category?.name.split("_").join(" ")}</p>
                      </TooltipContent>
                    </div>
                  </TooltipTrigger>
                </Tooltip>
              </TooltipProvider>
            ))}
          </Show>
        </section>
        {/* sub categories container */}
        <Show when={Boolean(subcategories)}>
          <section className="max-h-dvh w-full border-r-2 border-gray-300 bg-white lg:w-[20%]">
            <h1 className='text-base font-bold capitalize mt-1 p-2 border-b border-gray-300'>Sub Kategori</h1>
            <Show when={categoriesLoading}>
              <CategorySkeleton />
            </Show>
            <Show when={!categoriesLoading && !subcategories?.length}>
              <div className='grid place-content-center p-4'>
                <NoDataIcon />
              </div>
            </Show>
            <Show when={subcategories?.length > 0}>
              {subcategories?.map((subcategory) => (
                <TooltipProvider key={subcategory?.code}>
                  <Tooltip>
                    <TooltipTrigger className="w-full">
                      <div
                        onClick={() =>
                          setSubCategoryCode(subcategory?.code)
                        }
                        className={cN(
                          `flex min-h-[3rem] w-full items-center justify-between border-b border-gray-300 bg-white px-4 py-2 transition-all hover:border-l-4 hover:border-l-[#173E55] hover:bg-background`,
                          {
                            'border-l-4 border-l-[#173E55] bg-background':
                              subCategoryCode === subcategory?.code
                          }
                        )}
                      >
                        <p
                          className={cN(`text-sm font-semibold capitalize`, {
                            'line-clamp-1': subcategory?.name.length > 17
                          })}
                        >
                          {(subcategory?.name?.toString().length ?? 0) > 18
                            ? subcategory?.name.split("_").join(" ").substring(0, 17) + '...'
                            : subcategory?.name.split("_").join(" ")}
                        </p>
                        <TooltipContent>
                          <p>{subcategory?.name.split("_").join(" ")}</p>
                        </TooltipContent>
                      </div>
                    </TooltipTrigger>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </Show>
          </section>
        </Show>
        <ClientOnly>
          <section className="min-h-max flex-1 overflow-x-scroll px-4">
            <div className="flex w-full flex-col gap-4 px-2 py-2">
              <div className="w-full overflow-auto rounded-b-md border-b">
                <Table className="w-full border-collapse">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="px-4 py-2 text-left">Nama Dokumen</TableHead>
                      <TableHead className="px-4 py-2 text-center">Perorangan</TableHead>
                      <TableHead className="px-4 py-2 text-center">Perusahaan</TableHead>
                      <TableHead className="px-4 py-2 text-center">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <Show when={!!documentError}>
                      <TableRow>
                        <TableCell colSpan={3}>
                          <p>{getErrorMessage(documentError)}</p>
                        </TableCell>
                      </TableRow>
                    </Show>
                    <Show when={documentsLoading || categoriesLoading}>
                      <TableRow>
                        <TableCell colSpan={4}>
                          {Array.from({ length: 3 }).map((_, i) => (
                            <Skeleton key={i} className='w-full h-12 my-1' />
                          ))}
                        </TableCell>
                      </TableRow>
                    </Show>
                    <Show when={!documentsLoading && !!documents?.data && subCategoryCode !== ""}>
                      {documents?.data?.map((document) => (
                        <TableRow key={document.code} className="hover:bg-gray-50">
                          {/* Document Name */}
                          <TableCell className="p-3 border-b border-gray-300 min-w-[20rem]">
                            {document.name ?? 'N/A'}
                          </TableCell>

                          {/* Perorangan Actions */}
                          <TableCell className="p-3 border-b border-gray-300 text-center">
                            <div className="flex items-center justify-evenly gap-x-2">
                              {document.type_document?.perorangan.map((file) => (
                                <ToolTip key={file.document_code} title="Download Template Perorangan">
                                  <DownloadCloud
                                    size={24}
                                    onClick={() => handleDownloadTemplate(file.document_code)}
                                    className="cursor-pointer text-gray-700 hover:text-blue-600"
                                  />
                                </ToolTip>
                              ))}
                              {document.type_document?.perorangan.map((file) => (
                                <ToolTip key={file.document_code} title="Cetak Isi Perorangan">
                                  <PrinterIcon
                                    size={24}
                                    onClick={() => {
                                      /* Add print logic here */
                                    }}
                                    className="cursor-pointer text-gray-700 hover:text-blue-600"
                                  />
                                </ToolTip>
                              ))}
                            </div>
                          </TableCell>

                          {/* Perusahaan Actions */}
                          <TableCell className="p-3 border-b border-gray-300 text-center">
                            <div className="flex items-center justify-evenly gap-x-2">
                              {document.type_document?.perusahaan.map((file) => (
                                <ToolTip key={file.document_code} title="Download Template Perusahaan">
                                  <DownloadCloud
                                    size={24}
                                    onClick={() => handleDownloadTemplate(file.document_code)}
                                    className="cursor-pointer text-gray-700 hover:text-blue-600"
                                  />
                                </ToolTip>
                              ))}
                              {document.type_document?.perusahaan.map((file) => (
                                <ToolTip key={file.document_code} title="Cetak Isi Perusahaan">
                                  <Printer
                                    size={24}
                                    onClick={() => {
                                      /* Add print logic here */
                                    }}
                                    className="cursor-pointer text-gray-700 hover:text-blue-600"
                                  />
                                </ToolTip>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell className="p-3 border-b border-gray-300 text-center">
                            <div className="flex items-center justify-evenly gap-x-2">
                              <Link href={`/sicetak/admin/dashboard/documents/${document.code}/edit`}>
                                <ToolTip title="Edit Dokumen">
                                  <Edit2Icon
                                    size={18}
                                    className="cursor-pointer text-center text-orange-500 hover:text-orange-700 transition-all"
                                  />
                                </ToolTip>
                              </Link>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </Show>
                    <Show when={(!documents?.data || documents == null) && (!categoriesLoading && !documentsLoading)}>
                      <div className='grid place-content-center p-4'>
                        <NoDataIcon />
                      </div>
                    </Show>
                  </TableBody>
                </Table>
              </div>
            </div>
          </section>
        </ClientOnly>
      </main>
      <Modal
        title={modalState.title}
        description={modalState.description}
        isOpen={modalState.isOpen}
        onClose={closeModal}
        type={modalState.type}
      />
    </div>
  );
};

export default function AdminDashboardSuspensed() {
  return (
    <Suspense>
      <AdminDashboard />
    </Suspense>
  );
}