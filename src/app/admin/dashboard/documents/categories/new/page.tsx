'use client';

import PageContainer from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { cN } from '@/lib/utils';

const AddCategoryPage = () => {
  return (
    <PageContainer>
      <Card>
        <CardContent className="p-5">
          <h1 className="text-lg font-bold capitalize">Tambah Kategori</h1>
          <div className="my-2 flex space-x-4">
            <p className={cN(`border-b-2 border-orange-500 px-4 py-2 text-sm font-bold text-gray-800`)}>Detail</p>
          </div>

          <div className="p-4">
            <form className="space-y-4">
              <div>
                <label htmlFor="nama-kategori" className="block text-sm font-medium text-gray-700">
                  Nama Kategori
                </label>
                <Input id="nama-kategori" placeholder="Value" className="mt-1" />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <Textarea id="description" placeholder="Value" className="mt-1 h-32" />
              </div>
              <div className="flex justify-end space-x-4">
                <Button variant="ghost" className="border border-gray-300 bg-white">
                  Kembali
                </Button>
                <Button className="bg-orange-500 text-white">Simpan</Button>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default AddCategoryPage;
