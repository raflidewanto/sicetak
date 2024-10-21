'use client';

import { Download, Printer, Trash2 } from 'lucide-react';

export default function DocumentCard() {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:border-orange-300 hover:shadow-xl">
      <div className="p-6">
        <h3 className="mb-4 truncate text-lg font-semibold text-gray-800">Surat Kuasa</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => console.log()}
            className="group flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-300 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
          >
            <Download size={16} className="mr-2 text-gray-400 group-hover:text-orange-500" />
            Template
          </button>
          <button
            onClick={() => {}}
            className="group flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-300 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
          >
            <Printer size={16} className="mr-2 text-gray-400 group-hover:text-orange-500" />
            Print
          </button>
          <button
            onClick={() => {}}
            className="group flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-300 hover:border-red-300 hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 size={16} className="mr-2 text-gray-400 group-hover:text-red-500" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
