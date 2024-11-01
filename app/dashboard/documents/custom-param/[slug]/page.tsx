'use client';

import Show from '@/components/elements/show';
import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { usePlaceholderUpdate } from '@/features/documents/mutations/use-placeholder-update';
import { useDocumentById } from '@/features/documents/queries/use-documents';
import { usePlaceholders } from '@/features/documents/queries/use-placeholders';
import { AxiosError } from 'axios';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function CustomParamPage() {
  const { slug: docID } = useParams<{ slug: string }>();
  const { data: placeholders, isLoading: isLoadingPlaceholders, error: errorPlaceholders } = usePlaceholders(docID);
  const { data: document, isLoading: isLoadingDocument, error: errorDocument } = useDocumentById(docID);
  const updatePlaceholderMutation = usePlaceholderUpdate();

  const [selectedPlaceholder, setSelectedPlaceholder] = useState('');
  const [newValue, setNewValue] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlaceholder || !newValue) {
      toast({
        title: 'Error',
        description: 'Please select a placeholder and enter a new value.',
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
              // Reset form
              setSelectedPlaceholder('');
              setNewValue('');
              return;
            }
            toast({
              title: 'Error',
              description: 'Failed to update placeholder. Please try again.',
              variant: 'destructive'
            });
          },
          onError: (error) => {
            if (error instanceof AxiosError) {
              const status = error.response?.status;
              if (status?.toString().startsWith('4')) {
                toast({
                  title: 'Error',
                  description: 'Failed to update placeholder. Please try again.',
                  variant: 'destructive'
                });
                return;
              } else {
                toast({
                  title: 'Error',
                  description: `Something went wrong. Please try again later.`,
                  variant: 'destructive'
                });
                return;
              }
            }
            toast({
              title: 'Error',
              description: `Something went wrong. Please try again later.`,
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
        {/* Form */}
        <div className="w-full md:w-[60%]">
          <h2 className="mb-4 text-2xl font-semibold">Add Custom param</h2>
          <p className="mb-6">Select a placeholder and enter the custom value.</p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="placeholder-select">Select Placeholder</Label>
              <Select value={selectedPlaceholder} onValueChange={setSelectedPlaceholder}>
                <Show
                  when={!!placeholders?.data?.length && !isLoadingPlaceholders && placeholders.data.length > 0}
                  fallback={<Skeleton className="h-10 w-full" />}
                >
                  <SelectTrigger id="placeholder-select">
                    <SelectValue placeholder="Select a placeholder" />
                  </SelectTrigger>
                </Show>
                <Show when={!!errorPlaceholders as boolean}>
                  <p className="text-red-500 dark:text-red-400">
                    Error loading placeholders:
                    {errorPlaceholders instanceof Error
                      ? errorPlaceholders.message
                      : errorPlaceholders || 'Something went wrong'}
                  </p>
                </Show>
                <SelectContent className="max-h-64 overflow-auto">
                  {placeholders?.data?.map((placeholder, i) => (
                    <SelectItem key={`${placeholder.document_id}-${i}`} value={placeholder.name}>
                      {placeholder.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="custom-value">Custom Value</Label>
              <Textarea
                id="custom-value"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                placeholder="e.g., saya yang bertandatangan di bawah ini {{ $name }} dengan nik {{ $nik }}"
                className="h-32"
              />
            </div>
            <Button onClick={handleSubmit} className="w-full">
              Update Placeholder
            </Button>
          </form>
        </div>

        {/* PDF Preview */}
        <div className="flex w-full items-start justify-center">
          <Show when={!!document?.data?.raw_file && !isLoadingDocument} fallback={<Skeleton className="h-96 w-full" />}>
            <iframe
              src={`data:application/pdf;base64,${document?.data?.raw_file}`}
              className="h-96 w-full border dark:border-zinc-800"
              title="PDF Preview"
            />
          </Show>
          <Show when={!isLoadingDocument && !!errorDocument}>
            <p className="text-gray-600 dark:text-gray-300">Error loading document: {errorDocument?.message}</p>
          </Show>
        </div>
      </div>
    </PageContainer>
  );
}
