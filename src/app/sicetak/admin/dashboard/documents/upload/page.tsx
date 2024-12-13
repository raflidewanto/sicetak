'use client';

import Show from '@/components/elements/Show';
import UploadedFileIcon from '@/assets/icons/ic-uploaded-file.svg';
import UploadSection from '@/components/forms/UploadSection';
import PageContainer from '@/components/layout/PageContainer';
import ToolTip from '@/components/ToolTip';
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
import { useCategories } from '@/services/categories/queries/useCategories';
import { useSubCategoriesByCategory } from '@/services/categories/queries/useSubCategoriesByCategory';
import { useUploadDoc } from '@/services/documents/mutations/useUploadDocument';
import { getErrorMessage } from '@/utils/error';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { X } from 'lucide-react';

const AddNewDocumentPage = () => {
  const { data: categories } = useCategories();
  const router = useRouter();
  const [, setFileName] = useState<string>('');
  const [, setFileDescription] = useState<string>('');
  const [fileCategory, setFileCategory] = useState<string>('');
  const [fileSubCategory, setFileSubCategory] = useState<string>('');
  const [release, setRelease] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);

  // file state
  const [individualCode, setIndividualCode] = useState<string>('');
  const [corporateCode, setCorporateCode] = useState<string>('');

  const { openModal, closeModal, modalState } = useModal();
  const { data: subCategories } = useSubCategoriesByCategory(fileCategory);
  const uploadMutation = useUploadDoc();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData();

    uploadMutation.mutate(formData, {
      onSuccess: (data) => {
        if (data.success) {
          window.location.href = '/sicetak/admin/dashboard/documents';
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
          <form id="save-document-form" onSubmit={handleSubmit}>
            <h1 className="text-lg font-bold capitalize">Tambah Dokumen</h1>
            <section className="space-y-4 py-4">
              <div>
                <Label htmlFor="file-name" className="block text-sm font-medium text-gray-700">
                  Nama File
                </Label>
                <Input
                  form='save-document-form'
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
                  <Label form='save-document-form' className="block text-sm font-medium text-gray-700">Kategori</Label>
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
                  <Show when={corporateCode.split(" ").length > 0} fallback={(
                    <div className={`
                        flex flex-row items-center 
                        justify-between gap-x-3 
                        my-2 rounded-lg border 
                        border-[#2665E5] bg-white p-[0.625rem]`
                    }>
                      <section className="flex flex-row items-center gap-x-2">
                        <UploadedFileIcon />
                        <p className="text-sm text-[#2665E5]">File</p>
                      </section>
                      <section>
                        <ToolTip title='Hapus Dokumen'>
                          <X
                            size={20}
                            onClick={() => setIndividualCode("")}
                            className="cursor-pointer text-[#2665E5] transition-all hover:text-red-500"
                          />
                        </ToolTip>
                      </section>
                    </div>
                  )}>
                    <UploadSection type="corporate" setDocumentCode={setCorporateCode} />
                  </Show>
                </TabsContent>

                <TabsContent value="individual">
                  <Show when={individualCode.split(" ").length > 0} fallback={(
                    <div className={`
                      flex flex-row items-center 
                      justify-between gap-x-3 
                      my-2 rounded-lg border 
                      border-[#2665E5] bg-white p-[0.625rem]`
                    }>
                      <section className="flex flex-row items-center gap-x-2">
                        <UploadedFileIcon />
                        <p className="text-sm text-[#2665E5]">File</p>
                      </section>
                      <section>
                        <ToolTip title='Hapus Dokumen'>
                          <X
                            size={20}
                            onClick={() => setIndividualCode("")}
                            className="cursor-pointer text-[#2665E5] transition-all hover:text-red-500"
                          />
                        </ToolTip>
                      </section>
                    </div>
                  )}>
                    <UploadSection type="individual" setDocumentCode={setIndividualCode} />
                  </Show>
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
              <Button form='save-document-form' type="submit" className="bg-orange-500 text-white">
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
