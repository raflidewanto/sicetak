'use client';

import Show from '@/components/elements/Show';
import PageContainer from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Modal } from '@/components/ui/Modal';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { useModal } from '@/hooks/useModal';
import { useCategories } from '@/services/categories/queries/useCategories';
import { Suspense } from 'react';

const PrintDocumentPage = () => {
  const { modalState, closeModal } = useModal();
  const { data: categories } = useCategories();

  return (
    <PageContainer scrollable>
      <Card>
        <CardContent>
          <CardHeader className='font-bold px-0 text-[1.125rem]'>
            Print Dokumen
          </CardHeader>
          <section className='space-y-1'>
            <Label
              htmlFor='agreement-no'
              className='block text-sm font-medium text-gray-700'
            >
              No. Agreement
            </Label>
            <div className='flex gap-x-4 flex-col gap-y-4 sm:flex-row'>
              <Select>
                <SelectTrigger className="max-w-[21.875rem] w-full">
                  <SelectValue placeholder="Pilih Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <Show when={Boolean(categories?.data && categories?.data.length > 0)}>
                    {categories?.data?.map(category => (
                      <SelectItem value={category.category_code} key={category.category_code} className="capitalize">
                        {category.category_name.split('_').join(' ')}
                      </SelectItem>
                    ))}
                  </Show>
                </SelectContent>
              </Select>
              <Input
                id="agreement-no"
                className="max-w-[21.875rem]"
                placeholder='Masukkan nomor agreement'
              />
              <Button
                onClick={() => { }}
                type='button'
                variant={"outline"}
                className='text-orange-500'
              >
                Lihat
              </Button>
            </div>
          </section>
        </CardContent>
      </Card>
      <Modal
        title={modalState.title}
        description={modalState.description}
        isOpen={modalState.isOpen}
        onClose={closeModal}
        type={modalState.type}
      />
    </PageContainer>
  );
};

export default function PrintDocument() {
  return (
    <Suspense>
      <PrintDocumentPage />
    </Suspense>
  );
}
