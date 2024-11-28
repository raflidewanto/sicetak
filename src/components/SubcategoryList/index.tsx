"use client";

import Show from "@/components/elements/Show";
import { Button } from "@/components/ui/Button";
import { Switch } from "@/components/ui/Switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { useSubCategoriesByCategory } from "@/services/categories/queries/useSubCategoriesByCategory";
import { Edit } from "lucide-react";
import Link from "next/link";

type SubCategoriesListProps = {
  categoryCode: string
}

const SubCategoriesList = (props: SubCategoriesListProps) => {
  const { categoryCode } = props;
  const { data: subCategories, isPending, isError } = useSubCategoriesByCategory(categoryCode);

  return (
    <div className="py-4">
      <Table>
        <TableHeader className="bg-[#F2F5F6] text-[#676767] font-medium">
          <TableRow>
            <TableHead className="w-1/2 p-4">Nama Sub Kategori</TableHead>
            <TableHead className="text-right p-4">Action</TableHead>
          </TableRow>
        </TableHeader>
        <Show when={!isPending && isError}>
          Something went wrong
        </Show>
        <Show when={subCategories?.data?.length === 0 && !isPending}>
          No data
        </Show>
        <Show when={Boolean(subCategories?.data) && (subCategories?.data?.length ?? 0) > 0 && !isPending && !isError}>
          <TableBody>
            {subCategories?.data?.map(subcategory => (
              <TableRow key={subcategory?.category_code}>
                <TableCell className="capitalize">
                  {subcategory.subcategory_name?.replaceAll("_", " ")}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-4">
                    <Link href={`/admin/dashboard/categories/subcategories/${subcategory?.subcategory_code}/edit?category-code=${categoryCode}`}>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4 text-orange-500" />
                      </Button>
                    </Link>
                    <Switch checked={subcategory.subcategory_active} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Show>
      </Table>
    </div>
  );
};

export default SubCategoriesList;
