'use client';

import DocumentCard from '@/components/document-card';
import Show from '@/components/elements/show';
import PageContainer from '@/components/layout/page-container';
import Loader from '@/components/loader';
import { Button } from '@/components/ui/button';
import { useDocuments } from '@/features/documents/queries/use-documents';
import { Plus } from 'lucide-react';
import Link from 'next/link';

const DocumentsPage = () => {
  const { data, isLoading, isError } = useDocuments();

  if (isLoading)
    return (
      <PageContainer>
        <div className="flex min-h-screen items-center justify-center">
          <Loader size="large" />
        </div>
      </PageContainer>
    );

  if (isError)
    return (
      <PageContainer>
        <p className="min-h-screen dark:text-white">Oops! Something went wrong, please try again in a few minutes</p>
      </PageContainer>
    );

  return (
    <PageContainer scrollable>
      <div className="flex w-full flex-col items-start justify-center gap-y-8">
        <Link href="/dashboard/documents/upload">
          <Button variant={'linkHover1'}>
            <p className="flex items-center justify-start gap-x-1 space-x-2 text-gray-950 dark:text-gray-200">
              Upload Document
              <Plus size={16} />
            </p>
          </Button>
        </Link>
        <Show
          when={(data?.data?.length ?? 0) > 0}
          fallback={
            <div>
              <p className="text-gray-950 dark:text-gray-200">No documents found</p>
            </div>
          }
        >
          {data?.data?.map((data) => (
            <DocumentCard
              key={data.file_id}
              file={data.file}
              file_id={data.file_id}
              name={data.name}
              id={data.file_id}
            />
          ))}
        </Show>
      </div>
    </PageContainer>
  );
};

export default DocumentsPage;
