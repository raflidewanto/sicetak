'use client';

import PageContainer from '@/components/layout/page-container';
import { usePDFJS } from '@/hooks/use-pdfjs';
import React, { useState } from 'react';
import axios from 'axios';
import { getErrorMessage } from '@/utils/error';
import { useUpload } from '@/features/templates/mutations/use-upload';

export default function PDFPlaceholderPage() {
  const [file, setFile] = useState<File | null>(null);
  const [agreementNumber, setAgreementNumber] = useState<string>('');
  const [bracketCoordinates, setBracketCoordinates] = useState<{ placeholder: string; x: number; y: number }[]>([]);
  const uploadMutation = useUpload();

  const onLoadPDFJS = async (pdfjs: any) => {
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.onload = async () => {
      const typedArray = new Uint8Array(fileReader.result as ArrayBuffer);
      const loadingTask = pdfjs.getDocument({ data: typedArray });
      const pdfDocument = await loadingTask.promise;

      let allBracketCoordinates: { placeholder: string; x: number; y: number }[] = [];

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
          const y = pageHeight - item.transform[5] * scaleFactor - 46; // Experiment with the `- 46` offset

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
              y: firstBracketCoordinates.y
            });
          }
        }
      }

      setBracketCoordinates(allBracketCoordinates);
      console.log('Collected Placeholder Coordinates:', allBracketCoordinates);
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
    formData.append('File', file);
    formData.append('agreementNumber', agreementNumber);
    formData.append('coordinates', JSON.stringify(bracketCoordinates));

    uploadMutation.mutate(formData, {
      onSuccess: () => {
        console.log('success upload');
      },
      onError: (error) => {
        console.error('error', error.message);
      }
    });
  };

  return (
    <PageContainer>
      <h1 className="mb-4 text-2xl font-semibold text-gray-800">Upload PDF and Find Placeholder Coordinates</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="pdf-file" className="block text-sm font-medium text-gray-700">
            Upload PDF File
          </label>
          <input
            id="pdf-file"
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Submit
        </button>
      </form>

      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800">Placeholders Found:</h2>
        {bracketCoordinates.length > 0 ? (
          <ul className="mt-4 space-y-2">
            {bracketCoordinates.map((bracket, index) => (
              <li key={index} className="text-sm text-gray-600">
                <strong>Placeholder:</strong> {bracket.placeholder}, <strong>X:</strong> {bracket.x},{' '}
                <strong>Y:</strong> {bracket.y}
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
