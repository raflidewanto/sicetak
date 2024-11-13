import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

const DocumentsTableSkeleton = () => {
  return (
    <Table className="min-w-full rounded-xl bg-white shadow-md transition-all dark:bg-zinc-900">
      <TableCaption className="dark:text-gray-400">Loading documents...</TableCaption>
      <TableHeader>
        <TableRow className="rounded-lg bg-gray-50 dark:bg-zinc-800">
          <TableHead className="p-4 text-gray-700 dark:text-gray-300">
            <Skeleton className="h-4 w-20 bg-gray-200 dark:bg-zinc-700" />
          </TableHead>
          <TableHead className="p-4 text-gray-700 dark:text-gray-300">
            <Skeleton className="h-4 w-20 bg-gray-200 dark:bg-zinc-700" />
          </TableHead>
          <TableHead className="p-4 text-gray-700 dark:text-gray-300">
            <Skeleton className="h-4 w-20 bg-gray-200 dark:bg-zinc-700" />
          </TableHead>
          <TableHead className="p-4 text-gray-700 dark:text-gray-300">
            <Skeleton className="h-4 w-20 bg-gray-200 dark:bg-zinc-700" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* Skeleton Rows */}
        {Array(5)
          .fill(null)
          .map((_, i) => (
            <TableRow key={i} className="border-b border-gray-200 dark:border-gray-700">
              <TableCell className="p-4">
                <Skeleton className="h-4 w-3/4 bg-gray-200 dark:bg-zinc-700" />
              </TableCell>
              <TableCell className="p-4">
                <Skeleton className="h-4 w-1/2 bg-gray-200 dark:bg-zinc-700" />
              </TableCell>
              <TableCell className="p-4">
                <Skeleton className="h-4 w-1/4 bg-gray-200 dark:bg-zinc-700" />
              </TableCell>
              <TableCell className="p-4">
                <Skeleton className="h-4 w-1/4 bg-gray-200 dark:bg-zinc-700" />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default DocumentsTableSkeleton;
