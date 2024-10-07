'use client';

import PageContainer from '@/components/layout/page-container';
import TemplateCard from '@/features/templates/components/template-card';
import { getErrorMessage } from '@/utils/error';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

type Template = {
  doc_name: string;
  doc_html: string;
  doc_editor_config: string;
  doc_created_at: number;
  doc_updated_at: number;
  doc_templ_id: string;
};

const TemplatesPage = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTemplates() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_DEV_BASE_API}/templates`);
        if (!res.ok) {
          throw new Error('Failed to fetch templates');
        }
        const data = await res.json();
        setTemplates(data);
      } catch (err) {
        setError(getErrorMessage(error));
      } finally {
        setLoading(false);
      }
    }

    fetchTemplates();
  }, []);

  return (
    <PageContainer scrollable>
      <section className="grid grid-cols-1 gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Templates</h1>
          <Link href="/dashboard/templates/new">
            <button className="rounded-md bg-blue-500 px-4 py-2 text-white">Create New Template</button>
          </Link>
        </div>

        {loading && <p>Loading templates...</p>}

        {error && <p className="text-red-500">Error: {error}</p>}

        {!loading && !error && templates.length > 0
          ? templates.map((template) => <TemplateCard {...template} key={template.doc_templ_id} />)
          : !loading && <p>No templates available.</p>}
      </section>
    </PageContainer>
  );
};

export default TemplatesPage;
