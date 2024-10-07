import React from 'react';

type Template = {
  doc_name: string;
  doc_html: string;
  doc_editor_config: string;
  doc_created_at: number;
  doc_updated_at: number;
  doc_templ_id: string;
};

// Fetch the template from the API
async function getTemplate(slug: string): Promise<Template | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_DEV_BASE_API}/templates/${slug}`, {
      cache: 'no-store' // To prevent caching and always get the latest data
    });

    if (!res.ok) {
      throw new Error('Failed to fetch the template');
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching template:', error);
    return null;
  }
}

const TemplateDetailPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  // Fetch template data from the server
  const template = await getTemplate(slug);

  if (!template) {
    return <p className="text-red-500">Error: Failed to load the template.</p>;
  }

  return <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: template.doc_html ?? '' }}></div>;
};

export default TemplateDetailPage;
