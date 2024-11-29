/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
'use client';

import UploadedFileIcon from '@/assets/icons/ic-uploaded-file.svg';
import CopyButton from '@/components/CopyButton';
import Show from '@/components/elements/Show';
import PageContainer from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Modal } from '@/components/ui/Modal';
import { ScrollArea } from '@/components/ui/ScrollArea';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/Select';
import { Separator } from '@/components/ui/Separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/Sheet';
import { Switch } from '@/components/ui/Switch';
import { Textarea } from '@/components/ui/Textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/Tooltip';
import { toast } from '@/components/ui/useToast';
import { customParamPlaceholders, DocumentType, validPlaceholders } from '@/constants/data';
import { useModal } from '@/hooks/useModal';
import { usePDFJS } from '@/hooks/usePdfjs';
import { cN } from '@/lib/utils';
import { useCategories } from '@/services/categories/queries/useCategories';
import { useSubCategoriesByCategory } from '@/services/categories/queries/useSubCategoriesByCategory';
import { PlaceholderResponseDTO } from '@/services/documents/api';
import { usePlaceholderUpdate } from '@/services/documents/mutations/usePlaceholderUpdate';
import { useReuploadDoc } from '@/services/documents/mutations/useReupload';
import { useDocumentById } from '@/services/documents/queries/useDocuments';
import { usePlaceholders } from '@/services/documents/queries/usePlaceholders';
import { bracketPlaceholder } from '@/types';
import { getErrorMessage } from '@/utils/error';
import { extractBracketCoordinates } from '@/utils/pdf';
import { AxiosError } from 'axios';
import { EditIcon, X } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { memo, useEffect, useMemo, useState } from 'react';

const EditDocument = () => {
  // route
  const router = useRouter();
  const { slug: documentId } = useParams<{ slug: string }>();

  // queries
  const { data: placeholders } = usePlaceholders(documentId);
  const { data: document } = useDocumentById(documentId);
  const { data: categories } = useCategories();

  // PDF states
  const [file, setFile] = useState<File | null>();
  const [fileName, setFileName] = useState<string>(document?.data?.name ?? '');
  const [fileDescription, setFileDescription] = useState<string>('');
  const [fileCategory, setFileCategory] = useState<string>(document?.data?.category_name ?? '');
  const [fileSubCategory, setFileSubCategory] = useState<string>(document?.data?.subcategory_name ?? '');
  const [bracketCoordinates, setBracketCoordinates] = useState<bracketPlaceholder[]>([]);
  const [docType, setDocType] = useState<DocumentType>('personal');
  const [release, setRelease] = useState<boolean>(document?.data?.release ?? false);
  const [active, setActive] = useState<boolean>(document?.data?.active ?? false);

  const { data: subCategories } = useSubCategoriesByCategory(fileCategory);

  // placeholder state
  const [selectedPlaceholder, setSelectedPlaceholder] = useState<PlaceholderResponseDTO | null>(null);
  const [placeholderValue, setPlaceholderValue] = useState<string>('');

  // mutations
  const reuploadMutation = useReuploadDoc();
  const updatePlaceholderMutation = usePlaceholderUpdate();

  // UI
  const { openModal, closeModal, modalState } = useModal();

  const customParams = useMemo(() => {
    return placeholders?.data?.sort((a, b) => a.placeholder_name.localeCompare(b.placeholder_name)).filter(p => customParamPlaceholders.includes(p.placeholder_name));
  }, [placeholders]);

  useEffect(() => {
    setFileName(document?.data?.name ?? "");
    setFileDescription(document?.data?.description ?? "");
    setFileCategory(document?.data?.category_name ?? "");
    setFileSubCategory(document?.data?.subcategory_name ?? "");
    setActive(document?.data?.active ?? false);
    setRelease(document?.data?.release ?? false);
  }, [document]);

  const onLoadPDFJS = async (pdfjs: any) => {
    if (!file) return;

    // callback function to handle the extracted coordinates
    const handleCoordinates = (coordinates: bracketPlaceholder[]) => {
      setBracketCoordinates(coordinates);
    };
    await extractBracketCoordinates(pdfjs, file, handleCoordinates);
  };

  usePDFJS(onLoadPDFJS, [file]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const UploadSection = memo(() => {
    return (
      <>
        <div
          className="flex flex-col items-center justify-center gap-y-2 rounded-md border-2 border-dashed border-gray-300 p-6
       text-gray-500"
        >
          <div className="flex flex-row items-center justify-center gap-x-3">
            <label className="cursor-pointer rounded-md bg-gray-200 px-4 py-2 text-sm text-gray-700">
              Choose File
              <input
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={(e) => handleFileChange(e)}
              />
            </label>
            <p className="text-[0.75rem]">Upload File Here</p>
          </div>
          <p className="mt-1 text-xs">PDF files only (max size: 10 MB)</p>
        </div>
        <Show when={Boolean(file)}>
          <div className="flex flex-row items-center justify-between gap-x-3 rounded-lg border border-[#2665E5] bg-white p-[0.625rem]">
            <section className="flex flex-row items-center gap-x-2">
              <UploadedFileIcon />
              <p className="text-sm text-[#2665E5]">{file?.name}</p>
            </section>
            <section>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <X
                      size={20}
                      onClick={() => setFile(null)}
                      className="cursor-pointer text-[#2665E5] transition-all hover:text-red-500"
                    />
                  </TooltipTrigger>
                  <TooltipContent className="rounded-md bg-black bg-opacity-85 p-2 text-white">
                    <p>Remove document</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </section>
          </div>
        </Show>
      </>
    );
  });
  UploadSection.displayName = 'UploadSection';

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!fileSubCategory) errors.fileSubCategory = 'Subkategori file diperlukan';
    if (!fileCategory) errors.fileCategory = 'Kategori file diperlukan';
    if (!docType) errors.docType = 'Pilih jenis dokumen';
    if (!fileDescription) errors.fileDescription = 'Deskripsi file diperlukan';
    if (!fileName) errors.fileName = 'Nama file diperlukan';
    if (!file) errors.file = 'Pilih file';

    return errors;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((message) =>
        toast({
          title: message,
          variant: 'destructive'
        })
      );
      return;
    }
    const formData = new FormData();
    formData.append('file', file as Blob);
    formData.append('name', fileName);
    formData.append('description', fileDescription);
    formData.append('category_code', fileCategory);
    formData.append('subcategory_code', fileSubCategory);
    formData.append('document_type', docType);
    formData.append('placeholders', JSON.stringify(bracketCoordinates));
    formData.append('active', active.valueOf().toString());
    formData.append('release', release.valueOf().toString());

    reuploadMutation.mutate({
      formData,
      id: documentId
    }, {
      onSuccess: (data) => {
        if (data.success) {
          window.location.href = '/dashboard/documents';
          return;
        }
        toast({
          title: `Error uploading the file: ${data.message}`,
          variant: 'destructive'
        });
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          const status = error.response?.status;
          if (status === 400) {
            toast({
              title: `Error uploading the file: ${error.response?.data.message}`,
              variant: 'destructive'
            });
            return;
          }
          toast({
            title: `Something went wrong`,
            variant: 'destructive'
          });
          return;
        } else if (error instanceof Error) {
          toast({
            title: `Error uploading the file: ${error.message}`,
            variant: 'destructive'
          });
          return;
        }
        const errMessage = getErrorMessage(error);
        toast({
          title: errMessage ? `Error uploading the file: ${errMessage}` : `Something went wrong`,
          variant: 'destructive'
        });
        return;
      }
    });
  };

  const handleUpdatePlaceholder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlaceholder?.placeholder_name) {
      openModal("Error", `Please select a placeholder`, 'warning');
      return;
    }

    updatePlaceholderMutation.mutate({
      custom_value: placeholderValue,
      placeholder_name: selectedPlaceholder?.placeholder_name,
      document_code: documentId,
    }, {
      onSuccess: (data) => {
        if (data.success) {
          openModal("Success", `${data.message}`, 'success');
          return;
        }
        openModal("Error", `Error updating the placeholder: ${data.message}`, 'error');
      },
    });
  };

  return (
    <PageContainer scrollable>
      <Card>
        <CardContent className="p-5">
          <form onSubmit={handleSubmit}>
            <h1 className="text-lg font-bold capitalize">Edit Dokumen</h1>
            <section className="space-y-4 py-4">
              <div>
                <label htmlFor="file-name" className="block text-sm font-medium text-gray-700">
                  Nama File
                </label>
                <Input
                  id="file-name"
                  placeholder="Value"
                  className="mt-1"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                />
              </div>

              {/* category & subcategory */}
              <div className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
                <section className="w-full space-y-2">
                  <Label className="block text-sm font-medium text-gray-700">Kategori</Label>
                  <Select
                    onValueChange={(v) => setFileCategory(v)}
                    value={fileCategory}
                  >
                    <SelectTrigger className="w-full capitalize">
                      <SelectValue placeholder="Pilih Kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Kategori</SelectLabel>
                        {categories?.data?.map((category) => (
                          <SelectItem value={category.category_code} key={category.category_code} className="capitalize">
                            {category.category_name.split('_').join(' ')}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </section>
                {/* sub category */}
                <section className="w-full space-y-2">
                  <Label className="block text-sm font-medium text-gray-700">Sub Kategori</Label>
                  <Select
                    onValueChange={(v) => setFileSubCategory(v)}
                    value={fileSubCategory}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih Sub Kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Sub Kategori</SelectLabel>
                        {subCategories?.data?.map(subCategory => (
                          <SelectItem value={subCategory.subcategory_code} key={subCategory.subcategory_code} className="capitalize">
                            {subCategory.subcategory_name.split('_').join(' ')}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </section>
              </div>

              <div>
                <label htmlFor="file-description" className="block text-sm font-medium text-gray-700">
                  Deskripsi
                </label>
                <Textarea
                  id="file-description"
                  placeholder="Value"
                  className="mt-1 h-32"
                  value={fileDescription}
                  onChange={(e) => setFileDescription(e.target.value)}
                />
              </div>
            </section>

            {/* upload document */}
            <div className="w-full space-y-4 p-4">
              {/* Tabs */}
              <div className="flex items-center justify-center space-x-4 sm:justify-start">
                <button
                  type="button"
                  onClick={() => setDocType('personal')}
                  className={cN(
                    'px-4 py-2 text-sm font-medium ring-transparent focus-visible:outline-none',
                    docType === 'personal' ? 'border-b-2 border-orange-500 font-bold text-gray-800' : 'text-gray-600'
                  )}
                >
                  Perseorangan
                </button>
                <button
                  type="button"
                  onClick={() => setDocType('corporate')}
                  className={cN(
                    'px-4 py-2 text-sm font-medium ring-transparent focus-visible:outline-none',
                    docType === 'corporate' ? 'border-b-2 border-orange-500 font-bold text-gray-800' : 'text-gray-600'
                  )}
                >
                  Perusahaan
                </button>
              </div>
              <UploadSection />
            </div>

            {/* switches for release and active */}
            <section className="flex flex-col items-start justify-center gap-y-8 px-4 py-6 sm:flex-row sm:items-center sm:justify-start sm:gap-x-8">
              <div className="space-y-2">
                <p className="text-[0.875rem] font-medium capitalize">Status</p>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="active"
                    onCheckedChange={() => setActive(!active)}
                    checked={active}
                  />
                  <Label htmlFor="active">
                    <Show
                      when={Boolean(active)}
                      fallback={<span className="mx-1 inline-block h-2 w-2 rounded-full bg-red-400"></span>}
                    >
                      <span className="mx-1 inline-block h-2 w-2 rounded-full bg-green-400"></span>
                    </Show>
                    Active
                  </Label>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-[0.875rem] font-medium capitalize">Rilis Dokumen</p>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="release"
                    onCheckedChange={() => setRelease(!release)}
                    checked={release} />
                  <Label htmlFor="release">
                    <Show
                      when={Boolean(release)}
                      fallback={<span className="mx-1 inline-block h-2 w-2 rounded-full bg-red-400"></span>}
                    >
                      <span className="mx-1 inline-block h-2 w-2 rounded-full bg-green-400"></span>
                    </Show>
                    Release
                  </Label>
                </div>
              </div>
            </section>

            {/* Buttons */}
            <div className="flex justify-end space-x-4 px-5">
              <Link href="/admin/dashboard/documents">
                <Button variant="ghost" className="border border-gray-300 bg-white">
                  Kembali
                </Button>
              </Link>
              <Button type="submit" className="bg-orange-500 text-white">
                Simpan
              </Button>
            </div>
          </form>

          {/* placeholders container */}
          <div className="grid grid-cols-1 gap-x-6 px-6 py-10 sm:grid-cols-2">
            {/* list placeholders */}
            <section className="min-h-[15.813rem] bg-white">
              <div className="rounded-tl-md rounded-tr-md bg-[#F2F5F6] p-4">
                <p className="text-[0.75rem] font-medium text-gray-700">Default State</p>
              </div>
              <ScrollArea className="h-72 w-full">
                <Show when={(placeholders?.data?.length ?? 0) > 0} fallback={
                  <p>No data</p>
                }>
                  {placeholders?.data?.map((placeholder) => (
                    <React.Fragment key={placeholder.placeholder_code}>
                      <div className="flex min-h-[3.313rem] items-center justify-start px-4 py-2">
                        <p className='text-sm'>{placeholder.placeholder_name}</p>
                      </div>
                      <Separator />
                    </React.Fragment>
                  ))}
                </Show>
              </ScrollArea>
            </section>
            <section className="min-h-[15.813rem] bg-white">
              <div className="rounded-tl-md rounded-tr-md bg-[#F2F5F6] p-4">
                <p className="text-[0.75rem] font-medium text-gray-700">Custom Param</p>
              </div>
              <ScrollArea className="h-72 w-full">
                <Show when={(customParams?.length ?? 0) > 0} fallback={
                  <p>No data</p>
                }>
                  {customParams?.map((placeholder) => (
                    <React.Fragment key={placeholder.placeholder_code}>
                      <div className="flex min-h-[3.313rem] items-center justify-between px-4 py-2">
                        <p className='text-sm'>{placeholder.placeholder_name}</p>
                        <Sheet>
                          <SheetTrigger asChild>
                            {/* // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
                            <p
                              onClick={() => setSelectedPlaceholder(placeholder)}
                              className="flex cursor-pointer items-center justify-start gap-x-2 text-[0.75rem] text-orange-500">
                              <EditIcon size={16} color="#F97316" />
                            </p>
                          </SheetTrigger>
                          <SheetContent className="w-full text-xs overflow-scroll focus-visible:outline-none">
                            <form onSubmit={handleUpdatePlaceholder}>
                              <SheetHeader>
                                <SheetTitle>Edit Parameter</SheetTitle>
                              </SheetHeader>
                              <section className="flex h-full w-full flex-col items-start justify-between gap-y-6 py-6">
                                <div className="w-full">
                                  <div className='mb-4'>
                                    <Input
                                      defaultValue={placeholder?.placeholder_name ?? ""}
                                      className="focus-visible:outline-none w-full text-gray-950"
                                      disabled
                                    />
                                  </div>
                                  {/* placeholder value */}
                                  <div className="w-full space-y-4">
                                    <Textarea
                                      onChange={(e) => setPlaceholderValue(e.target.value)}
                                      defaultValue={placeholder?.custom_value ?? ""}
                                      className="w-full min-h-[12.313rem]" />
                                    <section className="min-h-[15.813rem] bg-white">
                                      <div className="rounded-tl-md rounded-tr-md bg-[#F2F5F6] p-4">
                                        <p className="text-[0.75rem] font-medium text-gray-700">Default State</p>
                                      </div>
                                      <ScrollArea className="h-72 w-full">
                                        <Show
                                          when={(validPlaceholders.length ?? 0) > 0}
                                          fallback={
                                            <p>No data</p>
                                          }>
                                          {validPlaceholders?.map((placeholder, idx) => (
                                            <React.Fragment key={`${placeholder}-${idx}`}>
                                              <div className="flex min-h-[3.313rem] items-center justify-between px-4 py-2">
                                                <p>{placeholder}</p>
                                                <CopyButton text={placeholder} />
                                              </div>
                                              <Separator />
                                            </React.Fragment>
                                          ))}
                                        </Show>
                                      </ScrollArea>
                                    </section>
                                  </div>
                                </div>
                                {/* actions */}
                                <div className="flex justify-between space-x-4 px-5 w-full">
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    className="border border-gray-300 bg-white w-1/2"
                                    onClick={() => router.back()}
                                  >
                                    Kembali
                                  </Button>
                                  <Button type="submit" className="bg-orange-500 text-white w-1/2">
                                    Simpan
                                  </Button>
                                </div>
                              </section>
                              {/* pdf viewer -> do not move outside sheet component it'll close the dialog due to onClickOutside event */}
                              <div
                                onClick={(e) => e.stopPropagation()}
                                className="fixed left-1/2 top-1/2 z-[999999999999] h-screen w-[38rem] -translate-x-[80%] -translate-y-1/2 p-4 py-4 delay-0 duration-0"
                              >
                                <Show
                                  when={!!document?.data?.raw_file}
                                  fallback={<p>There&apos;s an error when trying to display the document</p>}>
                                  <iframe
                                    src={`data:application/pdf;base64,${document?.data?.raw_file}`}
                                    width="100%"
                                    height="100%"
                                    allowFullScreen
                                    title="PDF Document"
                                  />
                                </Show>
                              </div>
                              <Separator />
                            </form>
                          </SheetContent>
                        </Sheet>
                      </div>
                      <Separator />
                    </React.Fragment>
                  ))}
                </Show>
              </ScrollArea>
              <Separator />
            </section>
          </div>


          <Modal
            title={modalState.title}
            description={modalState.description}
            isOpen={modalState.isOpen}
            onClose={closeModal}
            type={modalState.type}
          />
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default EditDocument;
