'use client';

import Show from '@/components/elements/Show';
import UploadSection from '@/components/forms/UploadSection';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Textarea } from '@/components/ui/Textarea';
import { useModal } from '@/hooks/useModal';
import { usePDFJS } from '@/hooks/usePdfjs';
import { useCategories } from '@/services/categories/queries/useCategories';
import { useSubCategoriesByCategory } from '@/services/categories/queries/useSubCategoriesByCategory';
import { useUploadDoc } from '@/services/documents/mutations/useUploadDocument';
import { bracketPlaceholder } from '@/types';
import { getErrorMessage } from '@/utils/error';
import { extractBracketCoordinates } from '@/utils/pdf';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const AddNewDocumentPage = () => {
  const { data: categories } = useCategories();
  const router = useRouter();
  // master data
  const [fileName, setFileName] = useState<string>('');
  const [fileDescription, setFileDescription] = useState<string>('');
  const [fileCategory, setFileCategory] = useState<string>('');
  const [fileSubCategory, setFileSubCategory] = useState<string>('');
  const [release, setRelease] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);

  // corporate file
  const [corporateFile, setCorporateFile] = useState<File | null>(null);
  const [corporateCoordinates, setCorporateCoordinates] = useState<bracketPlaceholder[]>([]);

  // individual file
  const [individualFile, setIndividualFile] = useState<File | null>(null);
  const [individualCoordinates, setIndividualCoordinates] = useState<bracketPlaceholder[]>([]);

  const { openModal, closeModal, modalState } = useModal();
  const { data: subCategories } = useSubCategoriesByCategory(fileCategory);
  const uploadMutation = useUploadDoc();

  const onLoadFile = async (pdfjs: any, file: File | null, setCoordinates: React.Dispatch<React.SetStateAction<bracketPlaceholder[]>>) => {
    if (!file) return;

    const handleCoordinates = (coordinates: bracketPlaceholder[]) => {
      setCoordinates(coordinates);
    };
    await extractBracketCoordinates(pdfjs, file, handleCoordinates);
  };

  usePDFJS((pdfjs: any) => onLoadFile(pdfjs, corporateFile, setCorporateCoordinates), [corporateFile]);
  usePDFJS((pdfjs: any) => onLoadFile(pdfjs, individualFile, setIndividualCoordinates), [individualFile]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('corporate_file', corporateFile as Blob);
    formData.append('individual_file', individualFile as Blob);
    formData.append('document_name', fileName);
    formData.append('description', fileDescription);
    formData.append('category_code', fileCategory);
    formData.append('subcategory_code', fileSubCategory);
    formData.append('corporate_placeholders', JSON.stringify(corporateCoordinates));
    formData.append('individual_placeholders', JSON.stringify(individualCoordinates));
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
                <Label htmlFor="file-name" className="block text-sm font-medium text-gray-700">
                  Nama File
                </Label>
                <Input
                  id="file-name"
                  placeholder="Value"
                  required
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
                    required
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
                              value={category.code}
                              key={category.code}
                              className="capitalize">
                              {category.name.split('_').join(' ')}
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
                    required
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
                <Label htmlFor="file-description" className="block text-sm font-medium text-gray-700">
                  Deskripsi
                </Label>
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
              <Tabs defaultValue="individual" className='space-y-6'>
                <TabsList className="grid w-full grid-cols-2 max-w-fit">
                  <TabsTrigger value="individual">Perorangan</TabsTrigger>
                  <TabsTrigger value="corporate">Perusahaan</TabsTrigger>
                </TabsList>

                <TabsContent value="corporate">
                  <UploadSection file={corporateFile} setFile={setCorporateFile} type="corporate" />
                </TabsContent>

                <TabsContent value="individual">
                  <UploadSection file={individualFile} setFile={setIndividualFile} type="individual" />
                </TabsContent>
              </Tabs>
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
              <Button variant="ghost" type="button" className="border border-gray-300 bg-white" onClick={() => router.back()}>
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
