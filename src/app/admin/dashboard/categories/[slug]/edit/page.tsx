"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { useParams } from "next/navigation";
import { useCategoryByCode } from "@/services/categories/queries/useCategories";
import { useEffect, useState } from "react";
import { useUpdateCategory } from "@/services/categories/mutations/useUpdateCategory";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/Modal";
import { AxiosError } from "axios";
import { getErrorMessage } from "@/utils/error";
import { useSubCategories } from "@/services/subcategories/queries/useSubcategories";
import Show from "@/components/elements/Show";
import { Skeleton } from "@/components/ui/Skeleton";
import SubCategoriesList from "@/components/SubcategoryList";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/Select";
import Link from "next/link";

const EditCategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: category } = useCategoryByCode(slug);
  const { data: subCategories, isPending: loadingSubCategories } = useSubCategories();

  const [categoryName, setCategoryName] = useState(category?.data?.category_name ?? "");
  const [categoryDescription, setCategoryDescription] = useState(category?.data?.category_description ?? "");

  const updateCategoryMutation = useUpdateCategory();

  // UI states
  const { closeModal, openModal, modalState } = useModal();

  useEffect(() => {
    setCategoryName(category?.data?.category_name ?? "");
    setCategoryDescription(category?.data?.category_description ?? "");
  }, [category]);

  function handleUpdateCategory(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!categoryName || !categoryDescription) {
      openModal("Warning", "Please fill all fields", "warning");
      return;
    }
    updateCategoryMutation.mutate({
      category_code: slug,
      category_name: categoryName,
      category_description: categoryDescription
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
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Ubah Kategori</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Tabs */}
          <Tabs defaultValue="detail" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger
                value="detail"
              >
                Detail
              </TabsTrigger>
              <TabsTrigger
                value="subcategory">
                Sub Kategori
              </TabsTrigger>
            </TabsList>

            {/* Tab Content */}
            <TabsContent value="detail">
              {/* Form */}
              <form onSubmit={handleUpdateCategory}>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="nama-kategori"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Nama Kategori
                    </label>
                    <Show
                      when={Boolean(categoryName)}
                      fallback={<Skeleton className="w-full h-10" />}
                    >
                      <Input
                        id="nama-kategori"
                        placeholder="Nama Kategori"
                        value={categoryName?.replaceAll("_", " ")}
                        onChange={e => setCategoryName(e.target.value)}
                        className="mt-1"
                      />
                    </Show>
                  </div>
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Description
                    </label>
                    <Show
                      when={Boolean(categoryDescription)}
                      fallback={<Skeleton className="w-full h-10" />}
                    >
                      <Textarea
                        id="description"
                        placeholder="Description"
                        value={categoryDescription}
                        onChange={e => setCategoryDescription(e.target.value)}
                        className="mt-1"
                      />
                    </Show>
                  </div>
                </div>
                {/* Buttons */}
                <div className="mt-6 flex justify-end space-x-4">
                  <Button variant="ghost">Kembali</Button>
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white">Simpan</Button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="subcategory">
              {/* filtering */}
              <section className="flex flex-wrap gap-4 flex-col sm:flex-row justify-end lg:-mt-14">
                <Select>
                  <SelectTrigger className="w-[8.5rem]">
                    Status
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <Input placeholder="Search" className="w-[14.063rem]" />
                <Link href="/admin/dashboard/categories/subcategories/new">
                  <Button>
                    Tambah Sub Kategori
                  </Button>
                </Link>
              </section>
              <SubCategoriesList categoryCode={slug} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Modal
        title={modalState.title}
        description={modalState.description}
        isOpen={modalState.isOpen}
        onClose={closeModal}
        type={modalState.type}
      />
    </div>
  );
};

export default EditCategoryPage;
