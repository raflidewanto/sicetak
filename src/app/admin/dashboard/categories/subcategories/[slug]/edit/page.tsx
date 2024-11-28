'use client';

import Show from '@/components/elements/Show';
import PageContainer from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Switch } from '@/components/ui/Switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Textarea } from '@/components/ui/Textarea';
import { CATEGORY_CODE } from '@/constants/data';
import { useModal } from '@/hooks/useModal';
import { useCategories, useCategoryByCode } from '@/services/categories/queries/useCategories';
import { useUpdateSubCategory } from '@/services/subcategories/mutations/useUpdateSubCategory';
import { useSubCategory } from '@/services/subcategories/queries/useSubcategories';
import { getErrorMessage } from '@/utils/error';
import { AxiosError } from 'axios';
import { useParams } from 'next/navigation';
import { useQueryState } from 'nuqs';
import { useEffect, useMemo, useState } from 'react';

const EditSubCategoryPage = () => {
  const { slug: subcategoryCode } = useParams<{ slug: string }>();
  const [categoryCode,] = useQueryState(CATEGORY_CODE)
  const { data: subcategory } = useSubCategory(subcategoryCode);
  const { data: defaultCategory } = useCategoryByCode(categoryCode ?? "");
  const { data: categories } = useCategories();

  // form  states
  const [subcategoryName, setSubcategoryName] = useState(subcategory?.data?.subcategory_name ?? "");
  const [subcategoryActive, setSubcategoryActive] = useState(subcategory?.data?.subcategory_active ?? false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const { closeModal, openModal, modalState } = useModal();

  useEffect(() => {
    setSubcategoryName(subcategory?.data?.subcategory_name ?? "");
    setSubcategoryActive(subcategory?.data?.subcategory_active ?? false);
  }, [subcategory]);

  useEffect(() => {
    if (defaultCategory?.data?.category_code) {
      setSelectedCategory(defaultCategory.data.category_code);
    }
  }, [defaultCategory]);

  const updateSubcategoryMutation = useUpdateSubCategory();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!categoryCode) {
      openModal("Error", "Invalid category", "error");
      return;
    }
    updateSubcategoryMutation.mutate({
      category_code: categoryCode,
      subcategory_code: subcategoryCode,
      subcategory_name: subcategoryName,
    }, {
      onSuccess: (data) => {
        if (!data.success) {
          openModal("Error", data.message, "error");
          return;
        }
        openModal("Success", data?.message, "success");
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
          <h1 className="text-lg font-bold capitalize">Edit Sub Kategori</h1>
          <div className="p-4 w-full">
            <Tabs defaultValue="detail">
              <TabsList>
                <TabsTrigger value="detail">
                  Detail
                </TabsTrigger>
                <TabsTrigger value="documents">
                  Dokumen
                </TabsTrigger>
              </TabsList>
              <TabsContent value="detail" className='w-full'>
                <form className="space-y-4 w-full py-4" onSubmit={handleSubmit}>
                  <section className='gap-y-4 flex flex-row gap-x-4 items-center justify-start w-full'>
                    <div className="w-1/2">
                      <label htmlFor="subcategory-name" className="block text-sm font-medium text-gray-700">
                        Nama Sub Kategori
                      </label>
                      <Input
                        id="subcategory-name"
                        placeholder="Value"
                        className="mt-1 capitalize"
                        value={subcategoryName.replaceAll("_", " ")}
                        onChange={e => setSubcategoryName(e.target.value)}
                      />
                    </div>
                    <div className="w-1/2">
                      <label htmlFor="category-name" className="block text-sm font-medium text-gray-700">
                        Pilih Kategori
                      </label>
                      <Select
                        value={selectedCategory}
                        onValueChange={v => setSelectedCategory(v)}
                      >
                        <SelectTrigger>
                          <SelectValue
                            className='capitalize'
                            placeholder="Pilih Kategori"
                            aria-label={selectedCategory?.replaceAll("_", " ")} />
                        </SelectTrigger>
                        <SelectContent>
                          <Show when={(categories?.data?.length ?? 0) > 0}>
                            {categories?.data?.map(category => (
                              <SelectItem
                                className='capitalize'
                                key={category?.category_code}
                                value={category?.category_code}
                              >
                                {category?.category_name?.replaceAll("_", " ")}
                              </SelectItem>
                            ))}
                          </Show>
                        </SelectContent>
                      </Select>
                    </div>
                  </section>
                  <section className='w-full'>
                    <div>
                      <label htmlFor="subcategory-description" className="block text-sm font-medium text-gray-700">
                        Deskripsi
                      </label>
                      <Textarea
                        id="subcategory-description"
                        placeholder="Value"
                        className="mt-1 capitalize"
                        value={subcategoryName.replaceAll("_", " ")}
                        onChange={e => setSubcategoryName(e.target.value)}
                      />
                    </div>
                  </section>
                  <div className='space-y-2'>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <Switch
                      id="status"
                      onCheckedChange={v => setSubcategoryActive(v)}
                      placeholder="Status"
                      checked={subcategoryActive.valueOf()}
                      className="mt-1"
                    />
                  </div>
                  <div className="flex justify-end space-x-4">
                    <Button type="button" variant="ghost" className="border border-gray-300 bg-white">
                      Kembali
                    </Button>
                    <Button type="submit" className="bg-orange-500 text-white">
                      Simpan
                    </Button>
                  </div>
                </form>
              </TabsContent>
              <TabsContent value="documents">

              </TabsContent>
            </Tabs>
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

export default EditSubCategoryPage;
