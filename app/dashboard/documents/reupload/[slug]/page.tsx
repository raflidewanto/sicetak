'use client';

import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { validPlaceholders } from '@/constants/data';
import { useReuploadDoc } from '@/features/documents/mutations/use-reupload';
import { usePDFJS } from '@/hooks/use-pdfjs';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';

type bracketPlaceholder = {
  placeholder: string;
  x: number;
  y: number;
  page: number;
  pageWidth: number;
  pageHeight: number;
};

export default function ReuploadDocumentPage() {
  const { slug } = useParams<{ slug: string }>();
  const [file, setFile] = useState<File | null>(null);
  const [bracketCoordinates, setBracketCoordinates] = useState<bracketPlaceholder[]>([]);
  const toast = useToast();
  const reuploadMitation = useReuploadDoc();

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
      toast.toast({
        title: `Please select a file`
      });
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('placeholders', JSON.stringify(bracketCoordinates));

    reuploadMitation.mutate(
      {
        formData,
        id: slug
      },
      {
        onSuccess: (data) => {
          if (data.success) {
            window.location.href = '/dashboard/documents';
            return;
          }
          toast.toast({
            title: `Error uploading the file: ${data.message}`
          });
        },
        onError: (error) => {
          toast.toast({
            title: `Error reuploading the file ${error.message}`
          });
        }
      }
    );
  };

  return (
    <PageContainer scrollable>
      <form onSubmit={handleSubmit} className="space-y-4 dark:text-white ">
        <div className="space-y-4">
          <label htmlFor="pdf-file" className="block text-sm font-medium dark:text-gray-200">
            Re-Upload PDF File
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
        </div>
        <Button type="submit">Submit</Button>
      </form>
      <ScrollArea className="h-72 w-64 rounded-md border dark:border-zinc-700 dark:text-white">
        <div className="p-4">
          <h4 className="mb-4 text-sm font-medium leading-none">Valid Placeholders</h4>
          {validPlaceholders.map((p, i) => (
            <>
              <div key={`${p}-${i}`} className="flex items-center justify-between">
                {p}
              </div>
              <Separator className="my-2" />
            </>
          ))}
        </div>
      </ScrollArea>
    </PageContainer>
  );
}
