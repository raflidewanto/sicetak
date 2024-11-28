"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Switch } from "@/components/ui/Switch";
import { Edit } from "lucide-react"; // For edit icon
import { useCategories } from "@/services/categories/queries/useCategories";
import Show from "@/components/elements/Show";

const CategoriesPage = () => {
  const { data: categoriesData, isPending, isError } = useCategories();

  return (
    <div suppressHydrationWarning className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Kategori List</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Search and Add Category Row */}
          <div className="flex items-center justify-between mb-4">
            <Input placeholder="Search" className="w-1/3" />
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">Tambah Kategori</Button>
          </div>

          {/* Table */}
          <Table>
            <TableHeader className="bg-[#F2F5F6] text-[#676767] font-medium">
              <TableRow>
                <TableHead className="w-1/2 p-4">Nama Kategori</TableHead>
                <TableHead className="text-right p-4">Action</TableHead>
              </TableRow>
            </TableHeader>
            <Show when={Boolean(categoriesData?.data) && (categoriesData?.data?.length ?? 0) > 0 && !isPending && !isError}>
              <TableBody>
                {categoriesData?.data?.map(category => (
                  <TableRow key={category?.category_code}>
                    <TableCell className="capitalize">
                      {category.category_name?.replaceAll("_", " ")}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-4">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4 text-orange-500" />
                        </Button>
                        <Switch checked={category.category_active} />
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
  );
};

export default CategoriesPage;
