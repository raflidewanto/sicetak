'use client';

import Show from '@/components/elements/show';
import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Modal } from '@/components/ui/modal';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { customParamPlaceholders, validPlaceholders } from '@/constants/data';
import { usePlaceholderUpdate } from '@/features/documents/mutations/use-placeholder-update';
import { useDocumentById } from '@/features/documents/queries/use-documents';
import { usePlaceholders } from '@/features/documents/queries/use-placeholders';
import { AxiosError } from 'axios';
import { useParams } from 'next/navigation';
import { useMemo, useState } from 'react';

export default function CustomParamPage() {
  const { slug: docID } = useParams<{ slug: string }>();
  const { data: placeholders, isLoading: isLoadingPlaceholders, error: errorPlaceholders } = usePlaceholders(docID);
  const { data: document, isLoading: isLoadingDocument } = useDocumentById(docID);
  const updatePlaceholderMutation = usePlaceholderUpdate();

  const [selectedPlaceholder, setSelectedPlaceholder] = useState(placeholders?.data?.[0]?.name ?? '');
  const [newValue, setNewValue] = useState(placeholders?.data?.[0]?.custom_value ?? '');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const customParam = useMemo(() => {
    if (!placeholders?.data?.length) {
      return [];
    }
    return placeholders?.data?.filter((placeholder) => customParamPlaceholders.includes(placeholder.name));
  }, [placeholders]);

  const openModal = (placeholderName: string) => {
    setSelectedPlaceholder(placeholderName);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPlaceholder('');
    setNewValue('');
    setIsModalOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newValue === undefined || !document?.data?.id) {
      toast({
        title: 'Error',
        description: 'Please enter a new value, and upload a document.',
        variant: 'destructive'
      });
      return;
    }

    try {
      if (!placeholders?.data?.length) {
        toast({
          title: 'Error',
          description: 'No placeholders found',
          variant: 'destructive'
        });
        return;
      }

      updatePlaceholderMutation.mutate(
        {
          doc_id: docID,
          placeholder_name: selectedPlaceholder,
          value: newValue,
          placeholder_id: placeholders?.data?.[0].placeholder_id
        },
        {
          onSuccess: (data) => {
            if (data.success) {
              toast({
                title: 'Success',
                description: 'Placeholder updated successfully.'
              });
              closeModal();
            } else {
              toast({
                title: 'Error',
                description: `Failed to update placeholder: ${data.message}`,
                variant: 'destructive'
              });
            }
          },
          onError: (error) => {
            if (error instanceof AxiosError) {
              const status = error.response?.status;
              if (status?.toString().startsWith('4')) {
                toast({
                  title: 'Error',
                  description: `Failed to update placeholder: ${error.response?.data.message}`,
                  variant: 'destructive'
                });
                return;
              } else {
                toast({
                  title: 'Error',
                  description: `Something went wrong. ${error.response?.data.message}`,
                  variant: 'destructive'
                });
                return;
              }
            }
            toast({
              title: 'Error',
              description: `Something went wrong. ${error.message}`,
              variant: 'destructive'
            });
          }
        }
      );
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update placeholder. Please try again.',
        variant: 'destructive'
      });
    }
  };

  return (
    <PageContainer scrollable>
      <div className="mt-8 flex min-h-screen w-full max-w-screen-lg flex-col space-y-6 md:flex-row md:space-x-6 md:space-y-0 dark:text-white">
        <div className="w-full md:w-[60%]">
          <h2 className="mb-4 text-2xl font-semibold">Custom Parameters</h2>

          <div className="space-y-4">
            <Show when={!!errorPlaceholders}>
              <p>{errorPlaceholders?.message}</p>
            </Show>
            <Show when={customParam.length > 0 && !isLoadingPlaceholders}>
              {customParam.map((placeholder, index) => (
                <div key={index} className="flex items-center justify-between">
                  <p>{placeholder.name}</p>
                  <Button onClick={() => openModal(placeholder.name)} className="ml-4">
                    Edit
                  </Button>
                  {/* Edit Modal */}
                  <Modal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    title="Edit Placeholder"
                    description="Edit the placeholder value."
                  >
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <Label htmlFor="custom-value">Custom Value for {selectedPlaceholder}</Label>
                      <ScrollArea className="h-24 w-full rounded-md border">
                        <div className="p-4">
                          <h4 className="mb-4 text-sm font-medium leading-none">Basic Placeholders</h4>
                          {validPlaceholders.map((tag) => (
                            <>
                              <div key={tag} className="text-sm">
                                {tag}
                              </div>
                              <Separator className="my-2" />
                            </>
                          ))}
                        </div>
                      </ScrollArea>
                      <Textarea
                        id="custom-value"
                        defaultValue={placeholder.custom_value}
                        onChange={(e) => setNewValue(e.target.value)}
                        placeholder="Enter new value for the placeholder"
                        className="h-32"
                      />
                      <Button type="submit" className="w-full">
                        Save Changes
                      </Button>
                    </form>
                  </Modal>
                </div>
              ))}
            </Show>
          </div>
        </div>

        <div className="flex w-full items-start justify-center">
          <Show
            when={Boolean(document?.data?.raw_file) && !isLoadingDocument && Boolean(document?.success)}
            fallback={<p className="text-gray-600 dark:text-gray-300">{document?.message}</p>}
          >
            <iframe
              src={`data:application/pdf;base64,${document?.data?.raw_file}`}
              className="h-96 w-full border dark:border-zinc-800"
              title="PDF Preview"
            />
          </Show>
        </div>
      </div>
    </PageContainer>
  );
}
