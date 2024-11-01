import * as React from 'react';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { PlaceholderResponseDTO } from '@/features/documents/api';
import { Skeleton } from './ui/skeleton';

type Props = {
  placeholder: PlaceholderResponseDTO[];
};

export function PLaceholderScrollArea(props: Props) {
  const { placeholder } = props;
  return (
    <ScrollArea className="h-72 w-64 rounded-md border dark:border-zinc-700 dark:text-white">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Available Placeholders</h4>
        {placeholder.map((p, i) => (
          <>
            <div key={`${p.document_id}-${i}`} className="text-sm">
              {p.name}
            </div>
            <Separator className="my-2" />
          </>
        ))}
      </div>
    </ScrollArea>
  );
}

export function PlaceholderScrollAreaSkeleton() {
  return (
    <ScrollArea className="h-72 w-64 rounded-md border dark:border-zinc-700">
      <div className="p-4">
        <Skeleton className="mb-4 h-5 w-48" />
        {[...Array(5)].map((_, index) => (
          <React.Fragment key={index}>
            <Skeleton className="h-4 w-full" />
            <Separator className="my-2" />
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  );
}
