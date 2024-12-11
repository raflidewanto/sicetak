'use client';

import Show from '@/components/elements/Show';
import PageContainer from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { CATEGORY_CODE_QUERY, LS_TOKEN } from '@/constants/data';
import { useModal } from '@/hooks/useModal';
import { useCreateCategory } from '@/services/categories/mutations/useCreateCategory';
import { useCategories } from '@/services/categories/queries/useCategories';
import { decryptLS } from '@/utils/crypto';
import { getErrorMessage } from '@/utils/error';
import { AxiosError } from 'axios';
import CryptoJS from 'crypto-js';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useQueryState } from 'nuqs';
import { Suspense, useEffect, useState } from 'react';

const AddSubCategoryPage = () => {
  const [categoryCodeQuery] = useQueryState(CATEGORY_CODE_QUERY);
  const [token, setToken] = useState("");

  const {
    data: categories,
    isPending: categoriesPending,
    isError: categoriesError
  } = useCategories();
  const createSubcategoryMutation = useCreateCategory();
  const router = useRouter();

  // form  states
  const [subcategoryName, setSubcategoryName] = useState("");
  const [subcategoryDescription, setSubcategoryDescription] = useState("");
  const [categoryCode, setCategoryCode] = useState(categoryCodeQuery ?? "");

  const { closeModal, openModal, modalState } = useModal();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(decryptLS(localStorage.getItem(LS_TOKEN) as string));
    }
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!token) {
      openModal("Error", "Invalid token", "error");
      return;
    }
    const date = moment().format('YYYY-MM-DD HH:mm:ss');
    const formattedCategoryName = subcategoryName.toLocaleLowerCase().replaceAll(' ', '_');
    const stringToSign = `${decryptLS(token)}${formattedCategoryName}${date}`;
    const cryptoKey = process.env.NEXT_PUBLIC_CRYPTO_KEY as string;

    createSubcategoryMutation.mutate({
      name: subcategoryName,
      master_detail_code: categoryCode,
      desc: subcategoryDescription,
      datetime: moment().format('YYYY-MM-DD HH:mm:ss'),
      signature: CryptoJS.HmacSHA256(stringToSign, cryptoKey).toString(),
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
                        <SelectItem key={category.code} value={category.code} className="capitalize">
                          {category.name.replaceAll("_", " ")}
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

export default function AddSubCategoryPageSuspensed() {
  return (
    <Suspense>
      <AddSubCategoryPage />
    </Suspense>
  );
}
