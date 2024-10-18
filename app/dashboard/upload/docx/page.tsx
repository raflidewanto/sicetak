'use client';

import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { useUploadDocx } from '@/features/templates/mutations/use-upload';
import { useState } from 'react';

export default function DOCXPlaceholderPage() {
  const [file, setFile] = useState<File | null>(null);
  const [agreementNumber, setAgreementNumber] = useState<string>('');
  const uploadMutation = useUploadDocx();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const docxFile = event.target.files[0];
      setFile(docxFile);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file || !agreementNumber) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('agreement_no', agreementNumber);

    uploadMutation.mutate(formData, {
      onSuccess: (data) => {
        const base64String = data.data;
        const byteCharacters = atob(base64String);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);

        const blob = new Blob([byteArray], {
          type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'output.docx';
        document.body.appendChild(a);
        a.click();
        a.remove();
      },
      onError: (error) => {
        console.error('Error during upload:', error.message);
      }
    });
  };

  return (
    <PageContainer scrollable>
      <h1 className="mb-4 text-2xl font-semibold text-gray-800">Cetak DOCX</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          <label htmlFor="docx-file" className="block text-sm font-medium text-gray-800">
            Upload DOCX File
          </label>
          <div className="relative flex items-center justify-center">
            <input
              id="docx-file"
              type="file"
              accept=".docx"
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
              <span>{file ? file.name : 'Select DOCX'}</span>
            </div>
          </div>
          <p className="text-xs text-gray-500">DOCX files only (max size: 10MB)</p>
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
    </PageContainer>
  );
}
