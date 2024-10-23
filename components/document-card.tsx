'use client';

import { useDeleteDoc } from '@/features/documents/mutations/use-delete-doc';
import { Download, Printer, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Modal } from './ui/modal';
import useDisclosure from '@/hooks/use-disclosure';
import { Button } from './ui/button';

type DocumentCardProps = {
  id: string;
  file_id: string;
  name: string;
  file: string; // base64 encoded
};

export default function DocumentCard(props: DocumentCardProps) {
  const { id, file_id, name, file } = props;
  const router = useRouter();
  const deleteDocMutation = useDeleteDoc();
  const { isOpen, onClose, onOpen } = useDisclosure();

  function handleDownload(file: string) {
    try {
      // Decode the base64 string
      const byteString = atob(file);
      const byteArray = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; i++) {
        byteArray[i] = byteString.charCodeAt(i);
      }

      const blob = new Blob([byteArray], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${name}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  }

  function handleDelete(id: string) {
    deleteDocMutation.mutate(id, {
      onSuccess: () => {
        window.location.reload();
      },
      onError: ({ name, message, cause }) => {
        alert(`${name} - ${message} - ${cause}`);
      }
    });
  }

  return (
    <div className="w-full overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:border-zinc-300 hover:shadow-xl">
      <div className="p-6">
        <h3 className="mb-4 truncate text-lg font-semibold text-gray-800">{name}</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleDownload(file)}
            className="group flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-300 hover:border-teal-300 hover:bg-teal-50 hover:text-teal-600"
          >
            <Download size={16} className="mr-2 text-gray-400 group-hover:text-teal-500" />
            Download Template
          </button>
          <button
            onClick={() => router.push(`/dashboard/documents/print?id=${id}`)}
            className="group flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-300 hover:border-green-600 hover:bg-green-50 hover:text-green-600"
          >
            <Printer size={16} className="mr-2 text-gray-400 group-hover:text-green-500" />
            Print
          </button>
          <button
            onClick={() => onOpen()}
            className="group flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-300 hover:border-red-300 hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 size={16} className="mr-2 text-gray-400 group-hover:text-red-500" />
            Delete
          </button>
        </div>
      </div>
      <Modal title="Delete Document" description="" isOpen={isOpen} onClose={() => onClose()}>
        <div className="space-y-4">
          <p>Are you sure you want to delete this document?</p>
          <div className="space-x-4">
            <Button variant={'destructive'} onClick={() => handleDelete(id)}>
              Delete
            </Button>
            <Button variant={'ghost'} onClick={() => onClose()}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
