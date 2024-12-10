/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
'use client';

import DocumentTable from '@/components/DocumentsTable';
import Show from '@/components/elements/Show';
import PageContainer from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/Tooltip';
import { DOCUMENT_NAME_QUERY, dummyMasterData } from '@/constants/data';
import { useDebounceValue } from '@/hooks/useDebounceValue';
import { useModal } from '@/hooks/useModal';
import { cN } from '@/lib/utils';
import { useCategories } from '@/services/categories/queries/useCategories';
import { CategoryDTOResponse } from '@/services/categories/types';
import { useDocuments } from '@/services/documents/queries/useDocuments';
import { Category, Document } from '@/services/documents/types';
import { getErrorMessage } from '@/utils/error';
import { CloudIcon, DownloadCloud, Search } from 'lucide-react';
import Link from 'next/link';
import { useQueryState } from 'nuqs';
import { Suspense, useEffect, useState } from 'react';

const DocumentPage = () => {
  // UI states
  const { openModal, closeModal, modalState } = useModal();

  // query state
  const [documentQuery, setDocumentQuery] = useQueryState(DOCUMENT_NAME_QUERY);

  // debounced query state
  const [documentDebouncedQuery] = useDebounceValue(documentQuery, 1500);

  // queries
  const { data: categories } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState(categories?.data?.[0]?.code);
  const [subcategories, setSubcategories] = useState<CategoryDTOResponse[] | []>([]);

  const [subCategoryCode, setSubCategoryCode] = useState("");

  const { data: documents } = useDocuments(subCategoryCode);

  useEffect(() => {
    if (categories && (categories?.data?.length ?? 0) > 0) {
      if (categories?.data) {
        const initialCategory = categories?.data[0];
        setSelectedCategory(initialCategory.code);
        setSubcategories(initialCategory.sub_categories || []);
      }
    }
  }, [categories]);

  useEffect(() => {
    const category = categories?.data?.find((c) => c.code === selectedCategory);
    setSubcategories(category?.sub_categories || []);
  }, [selectedCategory, categories]);

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

  const collectDocuments = (category: Category): Document[] => {
    let documents: Document[] = [...category.documents];
    for (const subCategory of category.sub_categories) {
      documents = documents.concat(collectDocuments(subCategory));
    }
    return documents;
  };

  const extractDocuments = (categories: Category[], categoryName: string): Document[] => {
    for (const category of categories) {
      // TODO change to category code
      if (category.name === categoryName) {
        return collectDocuments(category);
      }
      if (category.sub_categories.length > 0) {
        const result = extractDocuments(category.sub_categories, categoryName);
        if (result.length > 0) return result;
      }
    }
    return [];
  };

  const masterDataDummy = extractDocuments(dummyMasterData?.data, "Financial Agreement");

  return (
    <PageContainer scrollable>
      {JSON.stringify(documents)}
      <div className="flex min-h-[35rem] w-full flex-grow flex-col items-stretch rounded-md border border-gray-300 text-xs">
        {/* header */}
        <section className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 rounded-tl-md rounded-tr-md border-b border-gray-300 bg-[#173E55] px-4 py-2">
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
            <Link className='items-end' href="/sicetak/dashboard/documents/print">
              <Button>
                Cetak isi
              </Button>
            </Link>
          </div>
        </section>
        <main className="flex flex-grow flex-col lg:flex-row">
          {/* categories */}
          <section className="max-h-dvh w-full border-r-2 border-gray-300 bg-white lg:w-[20%]">
            <Show when={Boolean(categories?.data)}>
              {categories?.data?.map((category) => (
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
            </section>
          </Show>
          <section className="min-h-max flex-1 overflow-x-scroll px-4">
            <div className="flex w-full flex-col gap-4 px-2 py-2">
              <div className="w-full overflow-auto rounded-b-md border-b">
                <Table className="w-full border-collapse">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="px-4 py-2 text-left">Nama Dokumen</TableHead>
                      <TableHead className="px-4 py-2 text-center">Perorangan</TableHead>
                      <TableHead className="px-4 py-2 text-center">Perusahaan</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {documents?.data?.map((document) => (
                      <TableRow key={document.code as React.Key} className="hover:bg-gray-50">
                        <TableCell className="p-3 border-b border-gray-300">{document.name}</TableCell>
                        <TableCell className="p-3 border-b border-gray-300">
                          {document.document_type
                            .find((type) => type.name === "perusahaan")
                            ?.documents_file.map((file) => (
                              <TooltipProvider key={file?.document_code}>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <DownloadCloud
                                      onClick={() => handleDownloadTemplate(file.document_code)}
                                      className="cursor-pointer text-gray-700 hover:text-blue-600"
                                    />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    Download Template Perusahaan
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            ))}
                        </TableCell>
                        <TableCell className="p-3 border-b border-gray-300">
                          {document.document_type
                            .find((type) => type.name === "perorangan")
                            ?.documents_file.map((file) => (
                              <TooltipProvider key={file?.document_code}>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <DownloadCloud
                                      onClick={() => handleDownloadTemplate(file.document_code)}
                                      className="cursor-pointer text-gray-700 hover:text-blue-600"
                                    />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    Download Template Perorangan
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            ))}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </section>
        </main>
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

export default function DocumentsPageSuspense() {
  return (
    <Suspense>
      <DocumentPage />
    </Suspense>
  );
}
