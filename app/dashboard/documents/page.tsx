'use client';

import { DocumentCardSkeleton } from '@/components/card-skeleton';
import DocumentCard from '@/components/document-card';
import Show from '@/components/elements/show';
import PageContainer from '@/components/layout/page-container';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useDocuments } from '@/features/documents/queries/use-documents';
import { useDebounceValue } from '@/hooks/use-debounce-value';
import { useQueryState } from 'nuqs';

const DocumentsPage = () => {
  const [searchQuery, setSearchQuery] = useQueryState('docName');
  const [selectedType, setSelectedType] = useQueryState('docType');
  // Debounce the values with a delay of 1000ms then set the debounced values to the query state
  const [debouncedSearchQuery] = useDebounceValue(searchQuery, 1000);
  const [debouncedSelectedType] = useDebounceValue(selectedType, 1000);

  const { data, isLoading, isError } = useDocuments(debouncedSelectedType ?? '', debouncedSearchQuery ?? '');

  if (isError)
    return (
      <PageContainer>
        <p className="min-h-screen dark:text-white">Oops! Something went wrong, please try again in a few minutes</p>
      </PageContainer>
    );

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
        </div>

        <Show when={isLoading}>
          <DocumentCardSkeleton />
        </Show>

        <Show when={(data?.data?.length ?? 0) > 0 && !isLoading}>
          {data?.data?.map((doc, i) => (
            <DocumentCard
              key={`${doc.file_id}-${i}`}
              file={doc.file}
              file_id={doc.file_id}
              name={doc.name}
              id={doc.file_id}
            />
          ))}
        </Show>

        <Show when={data?.data?.length === 0 && !isLoading}>
          <p className="text-gray-600 dark:text-gray-300">No documents found matching the filters.</p>
        </Show>
      </div>
    </PageContainer>
  );
};

export default DocumentsPage;
