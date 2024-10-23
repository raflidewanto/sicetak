'use client';

import DocumentCard from '@/components/document-card';
import PageContainer from '@/components/layout/page-container';
import Loader from '@/components/loader';
import { Button } from '@/components/ui/button';
import { useDocuments } from '@/features/documents/queries/use-documents';
import Link from 'next/link';

const DocumentsPage = () => {
  const { data, isLoading, isError } = useDocuments();

  if (isLoading)
    return (
      <PageContainer>
        <Loader size="large" />
      </PageContainer>
    );
  if (isError) return <div>Error</div>;

  return (
    <PageContainer scrollable>
      <div className="flex w-full flex-col items-start justify-center gap-y-8">
        <Link href="/dashboard/documents/upload">
          <Button variant={'linkHover1'}>Upload Document</Button>
        </Link>
        {data?.data.map((data) => (
          <DocumentCard key={data.file_id} file={data.file} file_id={data.file_id} name={data.name} id={data.file_id} />
        ))}
      </div>
    </PageContainer>
  );
};

export default DocumentsPage;
