'use client';

import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { useUpload } from '@/features/templates/mutations/use-upload';
import { usePDFJS } from '@/hooks/use-pdfjs';
import React, { useState } from 'react';

type bracketPlaceholder = {
  placeholder: string;
  x: number;
  y: number;
  page: number;
};

export default function PDFPlaceholderPage() {
  const [file, setFile] = useState<File | null>(null);
  const [agreementNumber, setAgreementNumber] = useState<string>('');
  const [bracketCoordinates, setBracketCoordinates] = useState<bracketPlaceholder[]>([]);
  const uploadMutation = useUpload();

  const onLoadPDFJS = async (pdfjs: any) => {
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.onload = async () => {
      const typedArray = new Uint8Array(fileReader.result as ArrayBuffer);
      const loadingTask = pdfjs.getDocument({ data: typedArray });
      const pdfDocument = await loadingTask.promise;

      let allBracketCoordinates: { placeholder: string; x: number; y: number; page: number }[] = []; // Add page field

      for (let pageNumber = 1; pageNumber <= pdfDocument.numPages; pageNumber++) {
        const page = await pdfDocument.getPage(pageNumber);
        const textContent = await page.getTextContent();
        const viewport = page.getViewport({ scale: 1 });
        const pageHeight = viewport.height;
        const scaleFactor = viewport.scale;

        let accumulatedText = '';
        let itemCoordinates: { str: string; x: number; y: number }[] = [];

        textContent.items.forEach((item: any) => {
          const str = item.str;

          const x = item.transform[4] * scaleFactor + 10;
          const y = pageHeight - item.transform[5] * scaleFactor - 46;

          accumulatedText += str;
          itemCoordinates.push({ str, x, y });
        });

        const placeholderRegex = /{{\s*\$\.[\w]+\s*}}/g;
        let match;

        while ((match = placeholderRegex.exec(accumulatedText)) !== null) {
          const placeholderText = match[0];
          const placeholderStartIndex = match.index;
          let firstBracketCoordinates = null;

          let accumulatedLength = 0;
          for (const { str, x, y } of itemCoordinates) {
            accumulatedLength += str.length;

            if (accumulatedLength >= placeholderStartIndex) {
              firstBracketCoordinates = { x, y };
              break;
            }
          }

          if (firstBracketCoordinates) {
            allBracketCoordinates.push({
              placeholder: placeholderText,
              x: firstBracketCoordinates.x,
              y: firstBracketCoordinates.y,
              page: pageNumber
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
    if (!file || !agreementNumber) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('agreement_no', agreementNumber);
    formData.append('placeholders', JSON.stringify(bracketCoordinates));

    uploadMutation.mutate(formData, {
      onSuccess: (data) => {
        try {
          const blob = new Blob([data], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'output.pdf'; // Name for the file
          document.body.appendChild(a);
          a.click(); // Trigger the download
          a.remove(); // Clean up
        } catch (err) {
          console.error('Error processing the PDF download:', err);
        }
      },
      onError: (error) => {
        console.error('Error during upload:', error.message);
      }
    });
  };

  return (
    <PageContainer scrollable>
      <h1 className="mb-4 text-2xl font-semibold text-gray-800">Cetak Isi</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          <label htmlFor="pdf-file" className="block text-sm font-medium text-gray-800">
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
              className={`flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm shadow-sm transition-all ${
                file ? 'border-green-400 bg-green-100 text-green-600' : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`mr-2 h-5 w-5 ${file ? 'text-green-600' : 'text-gray-500'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>{file ? file.name : 'Select PDF'}</span>
            </div>
          </div>
          <p className="text-xs text-gray-500">PDF files only (max size: 10MB)</p>
        </div>

        <div className="space-y-2">
          <label htmlFor="agreement-number" className="block text-sm font-medium text-gray-700">
            Agreement Number
          </label>
          <input
            id="agreement-number"
            type="text"
            value={agreementNumber}
            onChange={(e) => setAgreementNumber(e.target.value)}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Agreement Number"
            required
          />
        </div>

        <Button type="submit">Submit</Button>
      </form>

      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800">Placeholders Found:</h2>
        {bracketCoordinates.length > 0 ? (
          <ul className="mt-4 space-y-2">
            {bracketCoordinates.map((bracket, index) => (
              <li key={index} className="text-sm text-gray-600">
                <strong>Placeholder:</strong> {bracket.placeholder}, <strong>X:</strong> {bracket.x},{' '}
                <strong>Y:</strong> {bracket.y}, <strong>Page:</strong> {bracket.page} {/* Show page number */}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-sm text-gray-500">No placeholders found.</p>
        )}
      </div>
    </PageContainer>
  );
}
