import React from 'react';
import Link from 'next/link';

type Props = {
  doc_name: string;
  doc_html: string;
  doc_editor_config: string;
  doc_created_at: number;
  doc_updated_at: number;
  doc_templ_id: string;
};

const TemplateCard = (props: Props) => {
  const { doc_created_at, doc_name, doc_templ_id, doc_updated_at } = props;

  return (
    <article className="rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg">
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold text-indigo-600">{doc_name}</h3>

        <p className="mt-2 text-sm text-gray-600">Created at: {new Date(doc_created_at * 1000).toLocaleDateString()}</p>
        <p className="text-sm text-gray-600">Updated at: {new Date(doc_updated_at * 1000).toLocaleDateString()}</p>

        <div className="mt-4 flex items-center justify-between">
          {/* Link to view/edit the template */}
          <Link
            href={`/print/${doc_templ_id}`}
            className="inline-block rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium transition-colors hover:bg-indigo-600"
          >
            View Template
          </Link>

          <div className="flex items-center text-xs text-gray-500">
            <svg
              className="mr-1 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p>{new Date(doc_updated_at * 1000).toLocaleTimeString()}</p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default TemplateCard;
