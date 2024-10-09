'use client';

import Show from '@/components/elements/show';
import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import TemplateCard from '@/features/templates/components/template-card';
import { useFetchTemplates } from '@/features/templates/queries/use-fetch-templates';
import Link from 'next/link';

const TemplatesPage = () => {
  const { data: templates, error, isLoading } = useFetchTemplates();

  return (
    <PageContainer scrollable>
      <section className="grid grid-cols-1 gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Templates</h1>
          <Link href="/dashboard/templates/new">
            <Button variant={'ringHover'} className="rounded-md px-4 py-2">
              Create New Template
            </Button>
          </Link>
        </div>
        <Show when={isLoading || templates == null}>
          <p>Loading templates...</p>
        </Show>
        <Show when={!!error}>
          <p className="text-red-500">Error: {error?.message}</p>
        </Show>
        n{templates?.map((template) => <TemplateCard {...template} key={template.doc_templ_id} />)}
      </section>
    </PageContainer>
  );
};

export default TemplatesPage;
