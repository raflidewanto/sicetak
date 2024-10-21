'use client';

import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import React from 'react';

const Page = () => {
  async function downloadPDF() {
    try {
      const res = await fetch('http://localhost:9500/api/documents/template/DOCSURAT20241021163201', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await res.json();

      if (data && data.data && data.data.file) {
        // Decode base64-encoded blob data
        const base64String = data.data.file; // Get base64 string
        const byteCharacters = atob(base64String); // Decode base64 string to binary string
        const byteNumbers = new Uint8Array(byteCharacters.length); // Create a byte array

        // Convert binary string into a byte array
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        // Create a Blob from the byte array
        const pdfBlob = new Blob([byteNumbers], { type: 'application/pdf' });

        // Create a URL for the Blob and trigger the download
        const blobUrl = URL.createObjectURL(pdfBlob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = data.data.name || 'downloaded_file.pdf'; // Use the provided filename or a default one
        link.click();

        // Clean up the URL after the download
        URL.revokeObjectURL(blobUrl);
      } else {
        console.error('No blob data found in the response');
      }
    } catch (error) {
      console.error('Error downloading the PDF:', error);
    }
  }

  return (
    <PageContainer>
      <Button onClick={() => downloadPDF()}>Download</Button>
    </PageContainer>
  );
};

export default Page;
