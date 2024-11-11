'use client';

import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import { DocumentType, productTypes, ProductTypeValue, validPlaceholders } from '@/constants/data';
import { useUploadDoc } from '@/features/documents/mutations/use-upload-doc';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { usePDFJS } from '@/hooks/use-pdfjs';
import { getErrorMessage } from '@/utils/error';
import { AxiosError } from 'axios';
import { Check, Copy } from 'lucide-react';
import React, { useState } from 'react';

type bracketPlaceholder = {
  placeholder: string;
  x: number;
  y: number;
  page: number;
  pageWidth: number;
  pageHeight: number;
};

export default function UploadDocumentPage() {
  const [file, setFile] = useState<File | null>(null);
  const [bracketCoordinates, setBracketCoordinates] = useState<bracketPlaceholder[]>([]);
  const [docType, setDocType] = useState<DocumentType | null>(null);
  const [docProduct, setDocProduct] = useState<ProductTypeValue | null>(null);
  const uploadMutation = useUploadDoc();
  const [, copy] = useCopyToClipboard();
  const [copiedPlaceholder, setCopiedPlaceholder] = useState<string | null>(null);

  const handleCopy = (text: string) => () => {
    copy(text)
      .then(() => {
        setCopiedPlaceholder(text);
        setTimeout(() => setCopiedPlaceholder(null), 1500);
      })
      .catch((error) => {
        toast({
          title: `Error copying the placeholder: ${error.message}`,
          variant: 'destructive'
        });
      });
  };

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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) {
      toast({
        title: 'Pilih file'
      });
      return;
    }
    if (!docType) {
      toast({
        title: 'Pilih jenis dokumen'
      });
      return;
    }
    if (!docProduct) {
      toast({
        title: 'Pilih jenis produk'
      });
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('placeholders', JSON.stringify(bracketCoordinates));
    formData.append('docType', docType);
    formData.append('docProduct', docProduct);

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
          const errMessage = error.response?.data.message;
          toast({
            title: errMessage ? `Error uploading the file: ${errMessage}` : `Something went wrong`,
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
      <form onSubmit={handleSubmit} className="mb-4 space-y-4 dark:text-white">
        <div className="space-y-4">
          <label htmlFor="pdf-file" className="block text-sm font-medium dark:text-gray-200">
            Upload PDF File
          </label>
          <div className="relative flex items-center justify-center">
            <input
              id="pdf-file"
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            />
            <div
              className={`flex w-full items-center justify-center rounded-lg border px-4 py-3 text-sm shadow-sm transition-all ${
                file
                  ? 'border-green-400 bg-green-100 text-green-600 dark:border-green-500 dark:bg-green-900 dark:text-green-300'
                  : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-100 dark:border-orange-800 dark:bg-orange-950 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`mr-2 h-5 w-5 ${
                  file ? 'text-green-600 dark:text-green-300' : 'text-gray-500 dark:text-gray-400'
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>{file ? file.name : 'Select PDF'}</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">PDF files only (max size: 10MB)</p>
          <div className="flex flex-wrap items-center justify-start gap-x-2 gap-y-2">
            <Select onValueChange={(value) => setDocType(value as DocumentType)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Pilih jenis dokumen" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Jenis Dokumen</SelectLabel>
                  <SelectItem value="personal">Perseorangan</SelectItem>
                  <SelectItem value="company">Perusahaan</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => setDocProduct(value as ProductTypeValue)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Pilih jenis produk" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Jenis Produk</SelectLabel>
                  {productTypes
                    .filter((p) => p.value !== '')
                    .map((item, i) => (
                      <SelectItem key={`${item.value}-${i}`} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button type="submit">Submit</Button>
      </form>
      <ScrollArea className="h-72 w-64 rounded-md border dark:border-zinc-700 dark:text-white">
        <div className="p-4">
          <h4 className="mb-4 text-sm font-medium leading-none">Valid Placeholders</h4>
          {validPlaceholders.map((p) => (
            <React.Fragment key={p}>
              <div className="flex items-center justify-between gap-y-2 space-x-4">
                <span>{p}</span>
                <div
                  className={`cursor-pointer transition-all ${
                    copiedPlaceholder === p
                      ? 'text-green-500'
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                  }`}
                  onClick={handleCopy(p)}
                >
                  {copiedPlaceholder === p ? <Check size={20} /> : <Copy size={20} />}
                </div>
              </div>
              <Separator className="my-2 dark:border-zinc-700" />
            </React.Fragment>
          ))}
        </div>
      </ScrollArea>
    </PageContainer>
  );
}
