'use client';

import React, { useState } from 'react';
import PageContainer from '@/components/layout/page-container';
import DocumentCard from '@/components/document-card';

const documentTemplates = [
  { id: 1, name: 'Template 1', downloadLink: '/templates/template1.docx' },
  { id: 2, name: 'Template 2', downloadLink: '/templates/template2.docx' },
  { id: 3, name: 'Template 3', downloadLink: '/templates/template3.docx' }
];

const DocumentsPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  return (
    <PageContainer>
      <div className="flex w-full flex-col items-start justify-center gap-y-8">
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
        {documentTemplates.map((template) => (
          <DocumentCard />
        ))}
      </div>
    </PageContainer>
  );
};

export default DocumentsPage;
