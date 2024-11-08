'use client';

import Show from '@/components/elements/show';
import EllipsisVertical from '@/components/icons/ellipsis-vertical';
import PageContainer from '@/components/layout/page-container';
import { AlertModal } from '@/components/modal/alert-modal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from '@/components/ui/use-toast';
import { productTypes } from '@/constants/data';
import { useDeleteDoc } from '@/features/documents/mutations/use-delete-doc';
import { useToggleActive } from '@/features/documents/mutations/use-toggle-active';
import { useToggleRelease } from '@/features/documents/mutations/use-toggle-release';
import { useDocuments } from '@/features/documents/queries/use-documents';
import { useDebounceValue } from '@/hooks/use-debounce-value';
import useDisclosure from '@/hooks/use-disclosure';
import { getErrorMessage } from '@/utils/error';
import Link from 'next/link';
import { useQueryState } from 'nuqs';

const DocumentsPage = () => {
  const [searchQuery, setSearchQuery] = useQueryState('docName');
  const [selectedType, setSelectedType] = useQueryState('docType');
  const [selectedProductType, setSelectedProductType] = useQueryState('docProduct');
  // Debounce the values with a delay of 1000ms then set the debounced values to the query state
  const [debouncedSearchQuery] = useDebounceValue(searchQuery, 1000);
  const [debouncedSelectedType] = useDebounceValue(selectedType, 1000);
  const [debouncedSelectedProductType] = useDebounceValue(selectedProductType, 1000);

  const { data, isLoading, isError } = useDocuments(
    debouncedSelectedType ?? '',
    debouncedSearchQuery ?? '',
    debouncedSelectedProductType ?? ''
  );

  const { isOpen, onClose, onOpen } = useDisclosure();
  const deleteDocMutation = useDeleteDoc();
  const toggleActiveMutation = useToggleActive();
  const releaseMutation = useToggleRelease();

  if (isError)
    return (
      <PageContainer>
        <p className="min-h-screen dark:text-white">Oops! Something went wrong, please try again in a few minutes</p>
      </PageContainer>
    );

  function handleDownload(file: string, docName: string) {
    try {
      // Decode the base64 string
      const byteString = atob(file);
      const byteArray = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; i++) {
        byteArray[i] = byteString.charCodeAt(i);
      }

      const blob = new Blob([byteArray], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const pdfWindow = window.open('') as WindowProxy;
      pdfWindow.document.write("<iframe width='100%' height='100%' src='" + url + "'></iframe>");
    } catch (error) {
      toast({
        title: `Error downloading the file: ${getErrorMessage(error)}`
      });
      return;
    }
  }

  function handleDelete(id: string) {
    deleteDocMutation.mutate(id, {
      onSuccess: () => {
        window.location.reload();
      },
      onError: ({ name, message, cause }) => {
        toast({
          title: `Error deleting the file: ${name} - ${message} - ${cause}`
        });
      }
    });
  }

  return (
    <PageContainer scrollable>
      <div className="flex w-full flex-col items-start justify-center gap-y-8">
        {/* Search and Filter Controls */}
        <div className="flex w-full flex-col items-start justify-start gap-x-4 gap-y-4">
          <Input
            className="w-3/4"
            type="text"
            placeholder="Search by document name..."
            value={searchQuery ?? ''}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="flex flex-wrap items-center justify-start gap-x-4 gap-y-4">
            <Select onValueChange={(value) => setSelectedType(value)}>
              <SelectTrigger className="w-[180px] py-4">
                <SelectValue placeholder="Pilih jenis dokumen" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Jenis Dokumen</SelectLabel>
                  <SelectItem value="">Semua</SelectItem>
                  <SelectItem value="personal">Perseorangan</SelectItem>
                  <SelectItem value="company">Perusahaan</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => setSelectedProductType(value)}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Pilih jenis produk" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Jenis Produk</SelectLabel>
                  {productTypes.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Show when={isLoading}>
          {/* Skeleton Table */}
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
                  <TableCell className="p-4 text-sm font-medium text-gray-900 dark:text-gray-100">{doc.name}</TableCell>
                  <TableCell className="p-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="flex items-center justify-center">
                        <EllipsisVertical className="self-center text-center" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDownload(doc.file, doc.name)}>Download</DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link href={`/dashboard/documents/print?id=${doc.file_id}`}>Print</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link href={`/dashboard/documents/reupload/${doc.file_id}`}>Reupload</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link href={`/dashboard/documents/custom-param/${doc.file_id}`}>Add Custom Param</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onOpen()}
                          className="text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900 dark:hover:text-red-300"
                        >
                          Delete
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
                  <AlertModal
                    actionName="Delete"
                    isOpen={isOpen}
                    onClose={() => onClose()}
                    onConfirm={() => handleDelete(doc.id)}
                    loading={deleteDocMutation.isPending}
                  />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Show>

        <Show when={data?.data?.length === 0 && !isLoading}>
          <p className="text-gray-600 dark:text-gray-300">No documents found matching the filters.</p>
        </Show>
      </div>
    </PageContainer>
  );
};

export default DocumentsPage;
