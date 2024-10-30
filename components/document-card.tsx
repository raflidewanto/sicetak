'use client';

import { useDeleteDoc } from '@/features/documents/mutations/use-delete-doc';
import useDisclosure from '@/hooks/use-disclosure';
import { getErrorMessage } from '@/utils/error';
import { Download, Printer, Trash2, FileUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { AlertModal } from './modal/alert-modal';
import { useToast } from './ui/use-toast';

type DocumentCardProps = {
  id: string;
  file_id: string;
  name: string;
  file: string; // base64 encoded
};

export default function DocumentCard(props: DocumentCardProps) {
  const { id, name, file, file_id } = props;
  const router = useRouter();
  const deleteDocMutation = useDeleteDoc();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const toast = useToast();

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
      toast.toast({
        title: `Error downloading the file: ${getErrorMessage(error)}`
      });
      return;
    }
  }

  function handleDelete(id: string) {
    deleteDocMutation.mutate(id, {
      onSuccess: () => {
        window.location.reload();
      },
      onError: ({ name, message, cause }) => {
        toast.toast({
          title: `Error deleting the file: ${name} - ${message} - ${cause}`
        });
      }
    });
  }

  return (
    <div className="w-full overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:border-zinc-300 hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-gray-600">
      <div className="p-6">
        <h3 className="mb-4 truncate text-lg font-semibold text-gray-800 dark:text-gray-100">{name}</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleDownload(file)}
            className="group flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-300 hover:border-teal-300 hover:bg-teal-50 hover:text-teal-600 dark:border-gray-600 dark:bg-gray-950 dark:text-gray-200 dark:hover:border-teal-500 dark:hover:bg-teal-900 dark:hover:text-teal-300"
          >
            <Download
              size={16}
              className="mr-2 text-gray-400 group-hover:text-teal-500 dark:text-gray-400 dark:group-hover:text-teal-300"
            />
            Download Template
          </button>
          <button
            onClick={() => router.push(`/dashboard/documents/print?id=${id}`)}
            className="group flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-300 hover:border-green-600 hover:bg-green-50 hover:text-green-600 dark:border-gray-600 dark:bg-gray-950 dark:text-gray-200 dark:hover:border-green-500 dark:hover:bg-green-900 dark:hover:text-green-300"
          >
            <Printer
              size={16}
              className="mr-2 text-gray-400 group-hover:text-green-500 dark:text-gray-400 dark:group-hover:text-green-300"
            />
            Print
          </button>
          <button
            onClick={() => router.push(`/dashboard/documents/reupload/${file_id}`)}
            className="group flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-300 hover:border-orange-600 hover:bg-orange-50 hover:text-orange-600 dark:border-gray-600 dark:bg-gray-950 dark:text-gray-200 dark:hover:border-orange-500 dark:hover:bg-orange-900 dark:hover:text-orange-300"
          >
            <FileUp
              size={16}
              className="mr-2 text-gray-400 group-hover:text-orange-500 dark:text-gray-400 dark:group-hover:text-orange-300"
            />
            Reupload
          </button>
          <button
            onClick={() => router.push(`/dashboard/documents/custom-param/${file_id}`)}
            className="group flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-300 hover:border-indigo-600 hover:bg-indigo-50 hover:text-indigo-600 dark:border-gray-600 dark:bg-gray-950 dark:text-gray-200 dark:hover:border-indigo-500 dark:hover:bg-indigo-900 dark:hover:text-indigo-300"
          >
            Add Custom Parameter
          </button>
          <button
            onClick={() => onOpen()}
            className="group flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-300 hover:border-red-300 hover:bg-red-50 hover:text-red-600 dark:border-gray-600 dark:bg-gray-950 dark:text-gray-200 dark:hover:border-red-500 dark:hover:bg-red-900 dark:hover:text-red-300"
          >
            <Trash2
              size={16}
              className="mr-2 text-gray-400 group-hover:text-red-500 dark:text-gray-400 dark:group-hover:text-red-300"
            />
            Delete
          </button>
        </div>
      </div>
      <AlertModal
        actionName="Delete"
        isOpen={isOpen}
        onClose={() => onClose()}
        onConfirm={() => handleDelete(id)}
        loading={deleteDocMutation.isPending}
      />
    </div>
  );
}
