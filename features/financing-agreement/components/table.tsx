import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import React from 'react';

const FinancingAgreementTable = () => {
  return (
    <div>
      <Table>
        <TableCaption>Fasilitas Dana</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nama Product</TableHead>
            <TableHead>Cetak Perseorangan</TableHead>
            <TableHead>Cetak Perusahaan</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Formulir Data Calon Debitur Pengganti</TableCell>
            <TableCell>
              <Button variant={'outline'}>Cetak Dokumen</Button>
            </TableCell>
            <TableCell>
              <Button variant={'outline'}>Cetak Dokumen</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default FinancingAgreementTable;
