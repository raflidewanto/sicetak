import PrinterIcon from '@/components/icons/printer';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { productsTemplate } from '@/constants/data';
import Link from 'next/link';
import React from 'react';

interface Props extends React.ComponentPropsWithRef<'table'> {}

function getTableCaption(key: string) {
  const tableCaptions = {
    '0': 'Fasilitas Dana',
    '1': 'Fasilitas Modal Usaha',
    '2': 'Installment Financing',
    '3': 'SLB',
    '4': 'Mitra Loyal Carfin',
    '5': 'Flash Cash R2',
    default: ''
  };
  return tableCaptions[key as keyof typeof tableCaptions] ?? tableCaptions['default'];
}

const FinancingAgreementTable = (props: Props) => {
  return (
    <>
      {Object.entries(productsTemplate).map(([categoryKey, templates], index) => (
        <div key={index} className="mb-6">
          <Table {...props}>
            <TableCaption>{getTableCaption(`${index}`)}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Produk</TableHead>
                <TableHead>Cetak Perseorangan</TableHead>
                <TableHead>Cetak Perusahaan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(templates).map(([templateKey, templateName], templateIndex) => (
                <TableRow key={templateIndex}>
                  <TableCell className="font-medium">{templateName}</TableCell>
                  <TableCell>
                    <Link
                      href={`/dashboard/financing-agreement/templates/${categoryKey}?type=personal&document-id=${templateKey
                        .toLocaleLowerCase()
                        .split(' ')
                        .join('-')}`}
                      className="flex items-center justify-start"
                    >
                      <PrinterIcon className="mr-2" />
                      <p>Cetak Dokumen</p>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/dashboard/financing-agreement/templates/${categoryKey}?type=company&document-id=${templateKey
                        .toLocaleLowerCase()
                        .split(' ')
                        .join('-')}`}
                      className="flex items-center justify-start"
                    >
                      <PrinterIcon className="mr-2" />
                      <p>Cetak Dokumen</p>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
    </>
  );
};

export default FinancingAgreementTable;
