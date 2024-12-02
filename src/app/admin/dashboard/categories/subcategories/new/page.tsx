'use client';

import Show from '@/components/elements/Show';
import PageContainer from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Switch } from '@/components/ui/Switch';
import { useModal } from '@/hooks/useModal';
import { useCategories } from '@/services/categories/queries/useCategories';
import { useCreateSubcategory } from '@/services/subcategories/mutations/useCreateSubcategories';
import { getErrorMessage } from '@/utils/error';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const AddSubCategoryPage = () => {
  const {
    data: categories,
    isPending: categoriesPending,
    isError: categoriesError
  } = useCategories();
  const createSubcategoryMutation = useCreateSubcategory();
  const router = useRouter();

  // form  states
  const [subcategoryName, setSubcategoryName] = useState("");
  const [subcategoryDescription, setSubcategoryDescription] = useState("");
  const [categoryCode, setCategoryCode] = useState("");
  const [subcategoryActive, setSubcategoryActive] = useState(false);

  const { closeModal, openModal, modalState } = useModal();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    createSubcategoryMutation.mutate({
      subcategory_name: subcategoryName,
      category_code: categoryCode,
      subcategory_active: subcategoryActive,
      subcategory_desc: subcategoryDescription
    }, {
      onSuccess: (data) => {
        if (!data.success) {
          openModal("Error", data.message, "error");
          return;
        }
        router.back();
        return;
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          openModal("Error", error?.response?.data?.message, "error");
          return;
        }
        if (error instanceof Error) {
          openModal("Error", error?.message ?? "Something went wrong", "error");
          return;
        }
        const errMessage = getErrorMessage(error);
        openModal("Error", errMessage, "error");
        return;
      }
    });
  }

  return (
    <PageContainer>
      <Card>
        <CardContent className="p-5">
          <h1 className="text-lg font-bold capitalize">Tambah Sub Kategori</h1>
          <div className="p-4">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className='space-y-2'>
                <label htmlFor="subcategory-category-select" className="block text-sm font-medium text-gray-700">
                  Pilih Kategori
                </label>
                <Select
                  value={categoryCode}
                  onValueChange={v => setCategoryCode(v)}
                >
                  <SelectTrigger className="text-zinc-950">
                    <SelectValue placeholder="Pilih Kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <Show when={categoriesPending}>
                      <p>Loading...</p>
                    </Show>
                    <Show when={!categoriesPending && categoriesError}>
                      <p>Failed to load data</p>
                    </Show>
                    <Show when={(categories?.data?.length ?? 0) > 0 && !categoriesPending}>
                      {categories?.data?.map((category) => (
                        <SelectItem key={category.category_code} value={category.category_code} className="capitalize">
                          {category.category_name.replaceAll("_", " ")}
                        </SelectItem>
                      ))}
                    </Show>
                  </SelectContent>
                </Select>
              </div>
              <div className='space-y-2'>
                <label htmlFor="subcategory-name" className="block text-sm font-medium text-gray-700">
                  Nama Sub Kategori
                </label>
                <Input
                  id="subcategory-name"
                  placeholder="Value"
                  className="mt-1"
                  value={subcategoryName}
                  onChange={e => setSubcategoryName(e.target.value)}
                />
              </div>
              <div className='space-y-2'>
                <label htmlFor="subcategory-description" className="block text-sm font-medium text-gray-700">
                  Deskripsi
                </label>
                <Input
                  id="subcategory-description"
                  placeholder="Value"
                  className="mt-1"
                  value={subcategoryDescription}
                  onChange={e => setSubcategoryDescription(e.target.value)}
                />
              </div>
              <div className='space-y-2'>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <Switch
                  id="status"
                  onCheckedChange={v => setSubcategoryActive(v)}
                  placeholder="Status"
                  value={subcategoryActive.valueOf().toString()}
                  className="mt-1"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <Button onClick={() => router.back()} type="button" variant="ghost" className="border border-gray-300 bg-white">
                  Kembali
                </Button>
                <Button type="submit" className="bg-orange-500 text-white">
                  Simpan
                </Button>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>

      <Modal
        type={modalState?.type}
        title={modalState?.title}
        description={modalState?.description}
        isOpen={modalState?.isOpen}
        onClose={closeModal}
      />
    </PageContainer>
  );
};

export default AddSubCategoryPage;
