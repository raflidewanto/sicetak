import { Button } from '@/components/ui/Button';
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
import { Search } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* container */}
      <div className="flex min-h-[35rem] w-full flex-grow flex-col items-stretch rounded-md border border-gray-300 text-xs">
        {/* header */}
        <section className="flex h-auto flex-wrap items-center justify-between gap-x-4 gap-y-2 rounded-tl-md rounded-tr-md border-b border-gray-300 bg-[#173E55] px-4 py-2 md:h-[4rem] md:flex-nowrap">
          {/* Title */}
          <h1 className="text-base text-white">Category</h1>
          {/* Filter */}
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
            {/* actions */}
            <Button size={'sm'} className="w-full md:w-auto">
              Tambah Kategori
            </Button>
            <Link href="/sicetak/admin/dashboard/documents/upload">
              <Button size={'sm'} className="w-full md:w-auto">
                Tambah Dokumen
              </Button>
            </Link>
          </div>
        </section>
        {children}
      </div>
    </>
  );
};

export default AdminLayout;
