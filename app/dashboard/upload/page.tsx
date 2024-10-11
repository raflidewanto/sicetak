'use client';

import PageContainer from '@/components/layout/page-container';
import { usePDFJS } from '@/hooks/use-pdfjs';
import React, { useState } from 'react';

export default function PDFPlaceholderPage() {
  const [file, setFile] = useState<File | null>(null);
  const [bracketCoordinates, setBracketCoordinates] = useState<{ placeholder: string; x: number; y: number }[]>([]);

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
        let accumulatedText = '';
        let itemCoordinates: { str: string; x: number; y: number }[] = [];

        textContent.items.forEach((item: any) => {
          const str = item.str;
          const x = item.transform[4];
          const y = item.transform[5];

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
      console.log('Placeholder Extraction completed.');
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

  return (
    <PageContainer>
      <h1>Upload PDF and Find Placeholder Coordinates</h1>
      <input type="file" accept=".pdf" onChange={handleFileChange} />

      <div>
        <h2>Placeholders Found:</h2>
        {bracketCoordinates.length > 0 ? (
          <ul>
            {bracketCoordinates.map((bracket, index) => (
              <li key={index}>
                Placeholder: [{bracket.placeholder}], X: {bracket.x}, Y: {bracket.y}
              </li>
            ))}
          </ul>
        ) : (
          <p>No placeholders found.</p>
        )}
      </div>
    </PageContainer>
  );
}
