'use client';

import { VISUAL_EDITOR_CONFIG, VISUAL_EDITOR_HTML } from '@/constants/data';
import { useReadLocalStorage } from '@/hooks/use-read-local-storage';
import { FormEvent, useState } from 'react';

const ConfirmCreateTemplatePage = () => {
  const html = useReadLocalStorage(VISUAL_EDITOR_HTML);
  const editorConfig = useReadLocalStorage(VISUAL_EDITOR_CONFIG);
  const [docName, setDocName] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log('submitted');

    try {
      const res = await fetch(`${String(process.env.NEXT_PUBLIC_DEV_BASE_API)}/templates`, {
        method: 'POST',
        body: JSON.stringify({
          doc_name: docName,
          doc_html: html ?? '',
          doc_editor_config: editorConfig
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      window.location.replace('/dashboard/templates');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <h1>Please fill this form to proceed generating the template</h1>
      <form onSubmit={handleSubmit} className="mb-0 mt-8 max-w-md space-y-4">
        <div>
          <label htmlFor="template" className="sr-only">
            Nama template
          </label>
          <div className="relative">
            <input
              onChange={(e) => setDocName(e.target.value)}
              type="template"
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Nama template"
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default ConfirmCreateTemplatePage;
