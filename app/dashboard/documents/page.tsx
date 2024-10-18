'use client';

import React from 'react';
import PageContainer from '@/components/layout/page-container';

const documentTemplates = [
  { id: 1, name: 'Template 1', downloadLink: '/templates/template1.docx' },
  { id: 2, name: 'Template 2', downloadLink: '/templates/template2.docx' },
  { id: 3, name: 'Template 3', downloadLink: '/templates/template3.docx' }
];

const handlePrint = (templateName: string) => {
  console.log(`Printing content of ${templateName}`);
};

const DocumentsPage = () => {
  return (
    <PageContainer>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {documentTemplates.map((template) => (
          <div key={template.id} className="rounded-lg border p-4 shadow-lg">
            <h3 className="mb-4 text-xl font-semibold">{template.name}</h3>
            <div className="flex justify-between">
              <button
                className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                onClick={() => (window.location.href = template.downloadLink)}
              >
                Download
              </button>
              <button
                className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                onClick={() => handlePrint(template.name)}
              >
                Print
              </button>
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
};

export default DocumentsPage;
