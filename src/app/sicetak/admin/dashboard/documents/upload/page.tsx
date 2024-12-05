'use client';

import UploadedFileIcon from '@/assets/icons/ic-uploaded-file.svg';
import Show from '@/components/elements/Show';
import PageContainer from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
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
import { Switch } from '@/components/ui/Switch';
import { Textarea } from '@/components/ui/Textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/Tooltip';
import { useModal } from '@/hooks/useModal';
import { usePDFJS } from '@/hooks/usePdfjs';
import { useCategories } from '@/services/categories/queries/useCategories';
import { useSubCategoriesByCategory } from '@/services/categories/queries/useSubCategoriesByCategory';
import { useUploadDoc } from '@/services/documents/mutations/useUploadDocument';
import { bracketPlaceholder } from '@/types';
import { getErrorMessage } from '@/utils/error';
import { extractBracketCoordinates } from '@/utils/pdf';
import { AxiosError } from 'axios';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { memo, useState } from 'react';

const AddNewDocumentPage = () => {
  const { data: categories } = useCategories();
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [fileDescription, setFileDescription] = useState<string>('');
  const [fileCategory, setFileCategory] = useState<string>('');
  const [fileSubCategory, setFileSubCategory] = useState<string>('');
  const [bracketCoordinates, setBracketCoordinates] = useState<bracketPlaceholder[]>([]);
  const [release, setRelease] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);
  const { openModal, closeModal, modalState } = useModal();
  const { data: subCategories } = useSubCategoriesByCategory(fileCategory);
  const uploadMutation = useUploadDoc();

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
              <input type="file" accept=".pdf" className="hidden" onChange={(e) => handleFileChange(e)} />
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
    if (!fileDescription) errors.fileDescription = 'Deskripsi file diperlukan';
    if (!fileName) errors.fileName = 'Nama file diperlukan';
    if (!file) errors.file = 'Pilih file';

    return errors;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((message) => {
        openModal("Error", message, 'error');
        return;
      }
      );
      return;
    }
    const formData = new FormData();
    formData.append('file', file as Blob);
    formData.append('name', fileName);
    formData.append('description', fileDescription);
    formData.append('category_code', fileCategory);
    formData.append('subcategory_code', fileSubCategory);
    formData.append('document_type', "");
    formData.append('placeholders', JSON.stringify(bracketCoordinates));
    formData.append('active', active.valueOf().toString());
    formData.append('release', release.valueOf().toString());

    uploadMutation.mutate(formData, {
      onSuccess: (data) => {
        if (data.success) {
          window.location.href = '/sicetak/dashboard/documents';
          return;
        }
        openModal("Error", `Error updating the placeholder: ${data.message}`, 'error');
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          const status = error.response?.status;
          if (status === 400) {
            openModal("Upload error", `Error uploading file: ${error.response?.data.message}`, 'error');
            return;
          }
          openModal("Upload error", `Something went wrong`, 'error');
          return;
        } else if (error instanceof Error) {
          openModal("Upload error", `Error uploading file: ${error.message}`, 'error');
          return;
        }
        const errMessage = getErrorMessage(error);
        openModal("Upload error", `Error uploading file: ${errMessage ? errMessage : 'Something went wrong'}`, 'error');
        return;
      }
    });
  };

  return (
    <PageContainer scrollable>
      <Card>
        <CardContent className="p-5">
          <form onSubmit={handleSubmit}>
            <h1 className="text-lg font-bold capitalize">Tambah Dokumen</h1>
            <section className="space-y-4 py-4">
              <div>
                <label htmlFor="file-name" className="block text-sm font-medium text-gray-700">
                  Nama File
                </label>
                <Input
                  id="file-name"
                  placeholder="Value"
                  className="mt-1"
                  onChange={(e) => setFileName(e.target.value)}
                />
              </div>

              {/* category & subcategory */}
              <div className="grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2">
                <section className="w-full space-y-2">
                  <Label className="block text-sm font-medium text-gray-700">Kategori</Label>
                  <Select
                    value={fileCategory}
                    onValueChange={(v) => setFileCategory(v)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih Kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Kategori</SelectLabel>
                        <Show when={Boolean(categories)} fallback={(
                          <p>Something went wrong</p>
                        )}>
                          {categories?.data?.map(category => (
                            <SelectItem
                              value={category.category_code}
                              key={category.category_code}
                              className="capitalize">
                              {category.category_name.split('_').join(' ')}
                            </SelectItem>
                          ))}
                        </Show>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </section>
                {/* sub category */}
                <section className="w-full space-y-2">
                  <Label className="block text-sm font-medium text-gray-700">Sub Kategori</Label>
                  <Select
                    value={fileSubCategory}
                    onValueChange={(v) => setFileSubCategory(v)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih Sub Kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Sub Kategori</SelectLabel>
                        {subCategories?.data?.map(subCategory => (
                          <SelectItem value={subCategory.subcategory_code} key={subCategory.subcategory_code}>
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
                  onChange={(e) => setFileDescription(e.target.value)}
                />
              </div>
            </section>

            {/* upload document */}
            <div className="w-full space-y-4 p-4">
              <Label htmlFor="corporate-file" className="block text-sm font-medium text-gray-700">
                Dokumen Perusahaan
              </Label>
              <UploadSection key="corporate" />
              <Label htmlFor="individual-file" className="block text-sm font-medium text-gray-700">
                Dokumen Perseorangan
              </Label>
              <UploadSection key="individual" />
            </div>

            {/* switches for release and active */}
            <section className="flex flex-col items-start justify-center gap-y-8 px-4 py-6 sm:flex-row sm:items-center sm:justify-start sm:gap-x-8">
              <div className="space-y-2">
                <p className="text-[0.875rem] font-medium capitalize">Status</p>
                <div className="flex items-center space-x-2">
                  <Switch id="active" onCheckedChange={() => setActive(!active)} />
                  <Label htmlFor="active">
                    <Show
                      when={active}
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
                  <Switch id="release" onCheckedChange={() => setRelease(!release)} />
                  <Label htmlFor="release">
                    <Show
                      when={release}
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
              <Button variant="ghost" className="border border-gray-300 bg-white" onClick={() => router.back()}>
                Kembali
              </Button>
              <Button type="submit" className="bg-orange-500 text-white">
                Simpan
              </Button>
            </div>
          </form>
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

export default AddNewDocumentPage;
