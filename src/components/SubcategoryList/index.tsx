"use client";

import NoDataIcon from "@/assets/icons/ic-no-data.svg";
import Show from "@/components/elements/Show";
import { Button } from "@/components/ui/Button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { CategoryDTOResponse } from "@/services/categories/types";
import { Edit } from "lucide-react";
import Link from "next/link";

type SubCategoriesListProps = {
  categoryCode: string
  subcategories: CategoryDTOResponse[] | [];
  search?: string
  active?: string
}

const SubCategoriesList = (props: SubCategoriesListProps) => {
  const { categoryCode, subcategories } = props;

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
          <Show when={subcategories?.length === 0}>
            <div className="p-4 grid place-items-center">
              <NoDataIcon />
            </div>
          </Show>
          <Show when={subcategories?.length > 0}>
            {subcategories?.map(subcategory => (
              <TableRow key={subcategory?.code}>
                <TableCell className="capitalize flex flex-col items-start justify-center gap-y-2 p-4">
                  {subcategory.name?.replaceAll("_", " ")}
                  <p className="text-sm text-gray-500">{subcategory.description}</p>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-4">
                    <Link
                      href={`/sicetak/admin/dashboard/categories/subcategories/${subcategory?.code}/edit?category-code=${categoryCode}`}
                    >
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
