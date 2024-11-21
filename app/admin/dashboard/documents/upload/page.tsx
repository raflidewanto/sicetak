'use client';

import Show from '@/components/elements/show';
import UploadedFileIcon from '@/components/icons/uploaded-file';
import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from '@/components/ui/use-toast';
import { bracketPlaceholder, DocumentType } from '@/constants/data';
import { useUploadDoc } from '@/features/documents/mutations/use-upload-doc';
import { usePDFJS } from '@/hooks/use-pdfjs';
import { cn } from '@/lib/utils';
import { getErrorMessage } from '@/utils/error';
import { AxiosError } from 'axios';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { memo, useState } from 'react';

const AddNewDocumentPage = () => {
  // route
  const router = useRouter();

  // PDF states
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [fileDescription, setFileDescription] = useState<string>('');
  const [fileCategory, setFileCategory] = useState<string>('');
  const [fileSubCategory, setFileSubCategory] = useState<string>('');
  const [bracketCoordinates, setBracketCoordinates] = useState<bracketPlaceholder[]>([]);
  const [docType, setDocType] = useState<DocumentType>('personal');
  const [release, setRelease] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);

  // mutations
  const uploadMutation = useUploadDoc();

  const onLoadPDFJS = async (pdfjs: any) => {
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.onload = async () => {
      const typedArray = new Uint8Array(fileReader.result as ArrayBuffer);
      const loadingTask = pdfjs.getDocument({ data: typedArray });
      const pdfDocument = await loadingTask.promise;

      let allBracketCoordinates: bracketPlaceholder[] = [];

      for (let pageNumber = 1; pageNumber <= pdfDocument.numPages; pageNumber++) {
        const page = await pdfDocument.getPage(pageNumber);
        const textContent = await page.getTextContent();

        const viewport = page.getViewport({ scale: 1 });
        const pageHeight = viewport.height;
        const scaleFactor = viewport.scale;
        const pageWidth = viewport.width;
        let accumulatedText = '';
        let itemCoordinates: { str: string; x: number; y: number; endX: number }[] = [];

        textContent.items.forEach((item: any) => {
          const str = item.str;
          const x = item.transform[4] * scaleFactor;
          const y = pageHeight - item.transform[5] * scaleFactor;

          const endX = x + (item.width || 0) * scaleFactor;

          itemCoordinates.push({
            str,
            x,
            y,
            endX
          });
          accumulatedText += str;
        });

        const placeholderRegex = /{{\s*\$[\w]+\s*}}/g;
        let match;

        while ((match = placeholderRegex.exec(accumulatedText)) !== null) {
          const placeholderText = match[0];
          const placeholderStartIndex = match.index;

          // Find the correct text item that contains the opening brackets
          let currentLength = 0;
          let bracketX = 0;
          let bracketY = 0;

          for (let i = 0; i < itemCoordinates.length; i++) {
            const item = itemCoordinates[i];
            const nextLength = currentLength + item.str.length;

            // Check if this item contains the start of the placeholder
            if (currentLength <= placeholderStartIndex && placeholderStartIndex < nextLength) {
              // Calculate the position of the first bracket within this text item
              const offsetInItem = placeholderStartIndex - currentLength;
              // const beforeBracketText = item.str.substring(0, offsetInItem);

              const approximateCharWidth = (item.endX - item.x) / item.str.length;
              bracketX = item.x + approximateCharWidth * offsetInItem - 2;
              bracketY = item.y;
              break;
            }

            currentLength = nextLength;
          }

          if (bracketX !== 0) {
            allBracketCoordinates.push({
              placeholder: placeholderText,
              x: bracketX,
              y: bracketY,
              page: pageNumber,
              pageWidth: pageWidth,
              pageHeight: pageHeight
            });
          }
        }
      }

      setBracketCoordinates(allBracketCoordinates);
    };

    if (file) {
      fileReader.readAsArrayBuffer(file);
    }
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
    formData.append('category', fileCategory);
    formData.append('subcategory', fileSubCategory);
    formData.append('document-type', docType);
    formData.append('placeholders', JSON.stringify(bracketCoordinates));
    formData.append('active', active.valueOf().toString());
    formData.append('release', release.valueOf().toString());

    uploadMutation.mutate(formData, {
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
              <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
                <section className="w-full space-y-2">
                  {/* TODO: get categories from db */}
                  <Label className="block text-sm font-medium text-gray-700">Kategori</Label>
                  <Select onValueChange={(v) => setFileCategory(v)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih Kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Kategori</SelectLabel>
                        <SelectItem value="financing-agreement">Financing Agreement</SelectItem>
                        <SelectItem value="agreement-transfer">Agreement Transfer</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </section>
                {/* sub category */}
                <section className="w-full space-y-2">
                  {/* TODO: get subcategories by selected category from db */}
                  <Label className="block text-sm font-medium text-gray-700">Sub Kategori</Label>
                  <Select onValueChange={(v) => setFileSubCategory(v)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih Sub Kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Sub Kategori</SelectLabel>
                        <SelectItem value="fasilitas-dana">Fasilitas Dana</SelectItem>
                        <SelectItem value="fasilitas-modal-usaha">Fasilitas Modal Usaha</SelectItem>
                        <SelectItem value="installment-financing">Installment Financing</SelectItem>
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
              {/* Tabs */}
              <div className="flex items-center justify-center space-x-4 sm:justify-start">
                <button
                  type="button"
                  onClick={() => setDocType('personal')}
                  className={cn(
                    'px-4 py-2 text-sm font-medium ring-transparent focus-visible:outline-none',
                    docType === 'personal' ? 'border-b-2 border-orange-500 font-bold text-gray-800' : 'text-gray-600'
                  )}
                >
                  Perseorangan
                </button>
                <button
                  type="button"
                  onClick={() => setDocType('corporate')}
                  className={cn(
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
    </PageContainer>
  );
};

export default AddNewDocumentPage;
