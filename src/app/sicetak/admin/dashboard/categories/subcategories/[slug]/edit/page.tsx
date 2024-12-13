'use client';

import NoDataIcon from '@/assets/icons/ic-no-data.svg';
import Show from '@/components/elements/Show';
import PageContainer from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Switch } from '@/components/ui/Switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Textarea } from '@/components/ui/Textarea';
import { CATEGORY_CODE_QUERY, LS_TOKEN } from '@/constants/data';
import { useModal } from '@/hooks/useModal';
import { useUpdateCategory } from '@/services/categories/mutations/useUpdateCategory';
import { useCategories } from '@/services/categories/queries/useCategories';
import { useDocuments } from '@/services/documents/queries/useDocuments';
import { decryptLS } from '@/utils/crypto';
import { getErrorMessage } from '@/utils/error';
import { AxiosError } from 'axios';
import CryptoJS from 'crypto-js';
import { Edit } from 'lucide-react';
import moment from 'moment';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useQueryState } from 'nuqs';
import { useEffect, useState } from 'react';

const EditSubCategoryPage = () => {
  const router = useRouter();
  const [token, setToken] = useState<string>("");
  const { slug: subcategoryCode } = useParams<{ slug: string }>();
  const [categoryCode,] = useQueryState(CATEGORY_CODE_QUERY);
  const { data: subcategory } = useCategories(undefined, subcategoryCode);
  const { data: categories } = useCategories();
  const { data: documents } = useDocuments(subcategoryCode);

  // mutations
  const updateSubcategoryMutation = useUpdateCategory();

  // form  states
  const [subcategoryName, setSubcategoryName] = useState(subcategory?.data?.[0]?.name ?? "");
  const [subcategoryActive, setSubcategoryActive] = useState(subcategory?.data?.[0]?.status ?? "0");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [subcategoryDescription, setSubcategoryDescription] = useState(subcategory?.data?.[0]?.description ?? "");

  const { closeModal, openModal, modalState } = useModal();

  useEffect(() => {
    setSubcategoryName(subcategory?.data?.[0]?.name ?? "");
    setSubcategoryActive(subcategory?.data?.[0]?.status ?? "0");
    setSelectedCategory(categories?.data?.find(c => c.code === categoryCode)?.code ?? "");
    setSubcategoryDescription(subcategory?.data?.[0]?.description ?? "");
  }, [subcategory, categoryCode, categories]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const tokenStr = localStorage.getItem(LS_TOKEN);
      if (tokenStr) {
        setToken(decryptLS(tokenStr));
      }
    }
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!categoryCode) {
      openModal("Error", "Invalid category", "error");
      return;
    }
    const date = moment().format("YYYY-MM-DD HH:mm:ss");
    const cryptoKey = process.env.NEXT_PUBLIC_CRYPTO_KEY as string;
    const message = `${token}${subcategoryCode}${date}`;
    updateSubcategoryMutation.mutate({
      code: subcategoryCode,
      signature: CryptoJS.HmacSHA256(message, cryptoKey).toString(),
      name: subcategoryName,
      desc: subcategoryDescription,
      status: subcategoryActive === "1" ? "1" : "0",
      datetime: date,
      category_code: selectedCategory,
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
          <h1 className="text-lg font-bold capitalize">Ubah Sub Kategori</h1>
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
                        value={subcategoryName}
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
                            aria-label={selectedCategory?.replaceAll("_", " ")}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <Show when={(categories?.data?.length ?? 0) > 0}>
                            {categories?.data?.map(category => (
                              <SelectItem
                                className='capitalize'
                                key={category?.code}
                                value={category?.code}
                              >
                                {category?.name?.replaceAll("_", " ")}
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
                        value={subcategoryDescription}
                        onChange={e => setSubcategoryDescription(e.target.value)}
                      />
                    </div>
                  </section>
                  <div className='space-y-2'>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <Switch
                      id="status"
                      onCheckedChange={v => setSubcategoryActive(v ? "1" : "0")}
                      placeholder="Status"
                      checked={subcategoryActive === "1"}
                      className="mt-1"
                    />
                  </div>
                  <div className="flex justify-end space-x-4">
                    <Button
                      onClick={() => router.back()}
                      type="button"
                      variant="ghost"
                      className="border border-gray-300 bg-white"
                    >
                      Kembali
                    </Button>
                    <Button type="submit" className="bg-orange-500 text-white">
                      Simpan
                    </Button>
                  </div>
                </form>
              </TabsContent>
              <TabsContent value="documents">
                <Show when={Boolean(documents?.data?.length)} fallback={<div className='grid place-items-center'><NoDataIcon /></div>}>
                  <Table>
                    <TableHeader className="bg-[#F2F5F6] text-[#676767] font-medium">
                      <TableRow>
                        <TableHead className="w-1/2 p-4">Nama Dokumen</TableHead>
                        <TableHead className="text-right p-4">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <Show when={Boolean(documents?.data?.length)}>
                      <TableBody>
                        {documents?.data?.map(doc => (
                          <TableRow key={doc?.code}>
                            <TableCell className="capitalize">
                              {doc?.name?.replaceAll("_", " ")}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end space-x-4">
                                <Link href={`/sicetak/admin/dashboard/documents/${doc?.code}/edit`}>
                                  <Button variant="ghost" size="sm">
                                    <Edit className="h-4 w-4 text-orange-500" />
                                  </Button>
                                </Link>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Show>
                  </Table>
                </Show>
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
