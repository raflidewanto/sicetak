"use client";

import Show from "@/components/elements/Show";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { CATEGORY_QUERY } from "@/constants/data";
import { useDebounceValue } from "@/hooks/useDebounceValue";
import { useCategories } from "@/services/categories/queries/useCategories";
import { Edit } from "lucide-react";
import Link from "next/link";
import { useQueryState } from "nuqs";
import NoDataIcon from '@/assets/icons/ic-no-data.svg';
import PageContainer from "@/components/layout/PageContainer";
import { Suspense } from "react";

const CategoriesPage = () => {
  const [categoryQuery, setCategoryQuery] = useQueryState(CATEGORY_QUERY);
  const [categoryDebouncedQuery] = useDebounceValue(categoryQuery, 1000);

  const { data: categoriesData, isPending, isError } = useCategories(categoryDebouncedQuery ?? "");

  return (
    <PageContainer scrollable>
      <div suppressHydrationWarning>
        <Card>
          <CardHeader>
            <CardTitle>Kategori List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <Input
                placeholder="Search"
                className="w-1/3"
                value={categoryQuery ?? ""}
                onChange={(e) => setCategoryQuery(e.target.value)}
              />
              <Link href="/sicetak/admin/dashboard/categories/new">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">Tambah Kategori</Button>
              </Link>
            </div>

            {/* Table */}
            <Table>
              <TableHeader className="bg-[#F2F5F6] text-[#676767] font-medium">
                <TableRow>
                  <TableHead className="w-1/2 p-4">Nama Kategori</TableHead>
                  <TableHead className="text-right p-4">Action</TableHead>
                </TableRow>
              </TableHeader>
              <Show when={!isPending && isError}>
                Something went wrong
              </Show>
              <Show when={categoriesData?.data?.length === 0 && !isPending}>
                <NoDataIcon />
              </Show>
              <Show when={Boolean(categoriesData?.data) && (categoriesData?.data?.length ?? 0) > 0 && !isPending && !isError}>
                <TableBody>
                  {categoriesData?.data?.map(category => (
                    <TableRow key={category?.code}>
                      <TableCell className="capitalize">
                        {category.name?.replaceAll("_", " ")}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-4">
                          <Link href={`/sicetak/admin/dashboard/categories/${category?.code}/edit`}>
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
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default function CategoriesPageSuspensed() {
  return (
    <Suspense>
      <CategoriesPage />
    </Suspense>
  );
}
