/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
'use client';

import Show from '@/components/elements/Show';
import PageContainer from '@/components/layout/PageContainer';
import { Input } from '@/components/ui/Input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/Select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/Tooltip';
import { CATEGORY } from '@/constants/data';
import { cn } from '@/lib/utils';
import { DownloadCloud, Printer, Search } from 'lucide-react';
import { useQueryState } from 'nuqs';
import { Suspense } from 'react';

interface Document {
  id: number;
  name: string;
  individual: boolean;
  company: boolean;
  active: boolean;
}

const dummyDocuments: Document[] = [
  { id: 1, name: 'Surat Kuasa Tanah', individual: true, company: false, active: true },
  {
    id: 2,
    name: 'Formulir Permohonan Pembiayaan Laporan Survei Analisa Pembiayaan',
    individual: false,
    company: true,
    active: true
  },
  { id: 3, name: 'Offering Letter dan Informasi Penting', individual: true, company: true, active: false },
  { id: 4, name: 'Perjanjian Pembiayaan, Syarat dan Ketentuan', individual: true, company: false, active: true },
  { id: 5, name: 'Form Gesekan Nomor Rangka dan Nomor Mesin', individual: false, company: true, active: false }
];

const dummySubCategories = [
  'Fasilitas Dana',
  'Fasilitas Modal Usaha',
  'Installment Financing',
  'SLB',
  'Mitra Loyal Carfin',
  'Flash Cash R2'
];

const DocumentsPage = () => {
  // query state
  const [categoryQuery, setCategoryQuery] = useQueryState(CATEGORY);

  return (
    <PageContainer scrollable>
      <div className="flex min-h-[35rem] w-full flex-grow flex-col items-stretch rounded-md border border-gray-300 text-xs xl:min-h-screen">
        <section className="flex h-auto flex-wrap items-center justify-between gap-x-4 gap-y-2 rounded-tl-md rounded-tr-md border-b border-gray-300 bg-[#173E55] px-4 py-2 md:h-[4rem] md:flex-nowrap">
          <h1 className="text-base text-white">Sub Category</h1>
          <div className="flex flex-wrap items-center gap-x-2">
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-2 top-[0.45rem]" color="gray" size={18} />
              <Input className="h-8 w-full bg-white pl-8 md:w-96" placeholder="Search..." />
            </div>
            <Select>
              <SelectTrigger className="w-full bg-white md:w-[12rem]">
                <SelectValue placeholder="Pilih Kategori" className="py-3" />
              </SelectTrigger>
              <SelectContent className="w-full md:w-64">
                <SelectGroup>
                  <SelectLabel>Pilih Kategori</SelectLabel>
                  <SelectItem value="financing-agreement">Financing Agreement</SelectItem>
                  <SelectItem value="agreement-transfer">Agreement Transfer</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </section>
        <main className="flex flex-grow">
          {/* Categories container */}
          <section className="max-h-dvh w-full overflow-y-scroll border-r-2 border-gray-300 bg-white md:w-[20%]">
            {/* Category Card */}
            {dummySubCategories.map((category, i) => (
              <TooltipProvider key={`${category}-${i}`}>
                <Tooltip>
                  <TooltipTrigger className="w-full">
                    <div
                      onClick={() => setCategoryQuery(category.split(' ').join('-').toLowerCase())}
                      className={cn(
                        `flex min-h-[3rem] w-full items-center justify-between border-b border-gray-300 bg-white px-4 py-2 transition-all hover:border-l-4 hover:border-l-[#173E55] hover:bg-background`,
                        {
                          'border-l-4 border-l-[#173E55] bg-background':
                            categoryQuery === category.split(' ').join('-').toLowerCase()
                        }
                      )}
                    >
                      <p
                        className={cn(`text-sm font-semibold capitalize`, {
                          'line-clamp-1': category.length > 17
                        })}
                      >
                        {category.length > 18 ? category.substring(0, 17) + '...' : category}
                      </p>
                      <TooltipContent>
                        <p>{category}</p>
                      </TooltipContent>
                    </div>
                  </TooltipTrigger>
                </Tooltip>
              </TooltipProvider>
            ))}
          </section>
          {/* table */}
          <section className="min-h-max flex-1 overflow-auto px-4">
            <div className="flex w-full flex-col gap-4 px-2 py-2">
              <div className="w-full overflow-auto rounded-b-md border-b">
                <Table className="w-full table-auto">
                  <TableHeader className="py-2">
                    <TableRow>
                      <TableHead className="px-4 py-2 text-left">Nama Dokumen</TableHead>
                      <TableHead className="px-4 py-2 text-center">Perseorangan</TableHead>
                      <TableHead className="px-4 py-2 text-center">Perusahaan</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="bg-white">
                    <Show when={dummyDocuments.length > 0} fallback={<p>No data</p>}>
                      {dummyDocuments.map((doc) => (
                        <TableRow key={doc.id} className="h-[3.313rem] border-b">
                          <TableCell className="px-4 py-2">{doc.name}</TableCell>
                          <TableCell className="px-4 py-2 text-center">
                            <div className="flex items-center justify-evenly gap-x-2">
                              <DownloadCloud className="text-[#3B3B3B]" />
                              <Printer className="inline-block text-[#3B3B3B]" size={18} />
                            </div>
                          </TableCell>
                          <TableCell className="px-4 py-2 text-center">
                            <div className="flex items-center justify-evenly gap-x-2">
                              <DownloadCloud className="text-[#3B3B3B]" />
                              <Printer className="inline-block text-[#3B3B3B]" size={18} />
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </Show>
                  </TableBody>
                </Table>
              </div>
            </div>
          </section>
        </main>
      </div>
    </PageContainer>
  );
};

export default function DocumentPageSuspensed() {
  return (
    <Suspense>
      <DocumentsPage />
    </Suspense>
  );
}
