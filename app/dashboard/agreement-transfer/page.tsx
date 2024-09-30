'use client';

import { MyDocument } from '@/components/template-surat/templ';
import { PDFViewer } from '@react-pdf/renderer';
import React from 'react';

const Doc = () => {
  return (
    <PDFViewer width={'100%'} height={'100%'}>
      <MyDocument />
    </PDFViewer>
  );
};

export default Doc;
