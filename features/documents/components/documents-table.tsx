'use client';

import React, { memo } from 'react';
import Show from '@/components/elements/show';
import DocumentsTableSkeleton from './documents-table-skeleton';
import { UseMutationResult } from '@tanstack/react-query';
import { Document, Response } from '@/features/documents/api';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import EllipsisVertical from '@/components/icons/ellipsis-vertical';
import Link from 'next/link';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

type DocumentsTableProps = {
  data: Response<Document[]> | undefined;
  isLoading: boolean;
  handleDownload: (file: string, docName: string) => void;
  handleDelete: (id: string) => void;
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
  toggleActiveMutation: UseMutationResult<Response<undefined>, Error, string, unknown>;
  releaseMutation: UseMutationResult<Response<undefined>, Error, string, unknown>;
  deleteDocMutation: UseMutationResult<Response<undefined>, Error, string, unknown>;
};

const DocumentsTable = (props: DocumentsTableProps) => {
  const { data, isLoading, handleDownload, toggleActiveMutation, releaseMutation } = props;

  return (
    <>
      <Show when={isLoading}>
        <DocumentsTableSkeleton />
      </Show>

      <Show when={(data?.data?.length ?? 0) > 0 && !isLoading}>
        <Table className="min-w-full rounded-xl bg-white shadow-md transition-all dark:bg-zinc-900">
          <TableCaption className="dark:text-gray-400">A list of your recent documents</TableCaption>
          <TableHeader>
            <TableRow className="rounded-lg bg-gray-50 dark:bg-zinc-800">
              <TableHead className="p-4 text-gray-700 dark:text-gray-300">Document</TableHead>
              <TableHead className="p-4 text-gray-700 dark:text-gray-300">Actions</TableHead>
              <TableHead className="p-4 text-gray-700 dark:text-gray-300">Status</TableHead>
              <TableHead className="p-4 text-gray-700 dark:text-gray-300">Release</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.map((doc, i) => (
              <TableRow
                key={doc.file_id}
                className="border-b border-gray-200 transition-all hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-zinc-800"
              >
                <TableCell className="p-2 text-xs font-medium text-gray-900 md:text-sm dark:text-gray-100">
                  {doc.name}
                </TableCell>
                <TableCell className="p-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center justify-center">
                      <EllipsisVertical className="self-center text-center" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer" onClick={() => handleDownload(doc.file, doc.name)}>
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/dashboard/documents/print?id=${doc.file_id}`}>Print</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/dashboard/documents/reupload/${doc.file_id}`}>Reupload</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/dashboard/documents/custom-param/${doc.file_id}`}>Add Custom Param</Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
                <TableCell className="p-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id={`is-active-${i}`}
                      defaultChecked={doc.active}
                      onCheckedChange={() => toggleActiveMutation.mutate(doc.file_id)}
                    />
                    <Label htmlFor={`is-active-${i}`} className="dark:text-gray-300">
                      {doc.active ? 'Active' : 'Inactive'}
                    </Label>
                  </div>
                </TableCell>
                <TableCell className="p-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id={`is-release-${i}`}
                      defaultChecked={doc.release}
                      onCheckedChange={() => releaseMutation.mutate(doc.file_id)}
                    />
                    <Label htmlFor={`is-release-${i}`} className="dark:text-gray-300">
                      {doc.release ? 'Release' : 'Unrelease'}
                    </Label>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Show>

      <Show when={data?.data?.length === 0 && !isLoading}>
        <p className="text-gray-600 dark:text-gray-300">No documents found matching the filters.</p>
      </Show>
    </>
  );
};

export default memo(DocumentsTable);
