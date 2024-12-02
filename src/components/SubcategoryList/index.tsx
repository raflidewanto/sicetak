"use client";

import Show from "@/components/elements/Show";
import { Button } from "@/components/ui/Button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { useSubCategoriesByCategory } from "@/services/categories/queries/useSubCategoriesByCategory";
import { Edit } from "lucide-react";
import Link from "next/link";
import NoDataIcon from "@/assets/icons/ic-no-data.svg";

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
        <TableBody>
          <Show when={!subCategories?.success}>
            <TableRow className="p-4 grid place-items-center min-w-full">
              {subCategories?.message === "database empty" ? (
                <TableCell colSpan={2}>
                  <NoDataIcon />
                </TableCell>
              ) : (
                <TableCell colSpan={2}>
                  <p>{subCategories?.message ?? "Something went wrong"}</p>
                </TableCell>
              )}
            </TableRow>
          </Show>
          <Show when={!isPending && isError}>
            Something went wrong
          </Show>
          <Show when={subCategories?.data?.length === 0 && !isPending}>
            <NoDataIcon />
          </Show>
          <Show when={Boolean(subCategories?.data) && (subCategories?.data?.length ?? 0) > 0 && !isPending && !isError}>
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
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </Show>
        </TableBody>
      </Table>
    </div>
  );
};

export default SubCategoriesList;
