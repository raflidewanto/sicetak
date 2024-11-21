import DownloadTemplateIcon from '@/components/icons/download-template';
import PrintDocIcon from '@/components/icons/print-doc-icon';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search } from 'lucide-react';
import React from 'react';
const invoices = [
  {
    invoice: 'Formulir Permohonan Pembiayaan Laporan Survei Analisa Pembiayaan',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit Card'
  },
  {
    invoice: 'Offering Letter dan Informasi Penting',
    paymentStatus: 'Pending',
    totalAmount: '$150.00',
    paymentMethod: 'PayPal'
  }
];

export default function DocumentsTable() {
  return (
    <Card>
      <CardContent className="p-4">
        <section className="mb-[1.5rem] flex items-center justify-between space-x-2">
          <Select>
            <SelectTrigger className="w-[350px]" style={{ minWidth: '350px' }}>
              <SelectValue placeholder="Pilih Subkategori" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="financing-agreement">Financing Agreement</SelectItem>
              <SelectItem value="agreement-transfer">Agreement Transfer</SelectItem>
            </SelectContent>
          </Select>
          {/* search query */}
          <div className="relative">
            <Search className="absolute left-2 top-[0.6rem] text-xs text-muted-foreground" size={18} />
            <Input className="h-[2.25rem] w-[15.625rem] pl-8" placeholder="Cari Dokumen" />
          </div>
        </section>
        <Table>
          <TableHeader className="bg-background">
            <TableRow>
              {/* Main Header for 'Nama Dokumen' with rowspan */}
              <TableHead className="w-[60%]" rowSpan={2}>
                Nama Dokumen
              </TableHead>
              <TableHead
                className="border-b-white text-center"
                colSpan={2}
                style={{ borderBottomColor: 'white', borderBottomStyle: 'hidden' }}
              >
                Action
              </TableHead>
            </TableRow>
            <TableRow>
              <TableHead className="text-center">Perusahaan</TableHead>
              <TableHead className="text-center">Perseorangan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white">
            {invoices.map((doc) => (
              <TableRow
                key={doc.invoice}
                style={{
                  height: '3.313rem'
                }}
              >
                {/* Nama Dokumen */}
                <TableCell
                  style={{
                    paddingInline: '0.5rem'
                  }}
                >
                  {doc.invoice}
                </TableCell>
                {/* Perusahaan Action */}
                <TableCell className="p-3">
                  <div className="flex items-center justify-center gap-x-4">
                    <DownloadTemplateIcon />
                    <PrintDocIcon />
                  </div>
                </TableCell>
                {/* Perseorangan Action */}
                <TableCell className="p-3">
                  <div className="flex items-center justify-center gap-x-4">
                    <DownloadTemplateIcon />
                    <PrintDocIcon />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
