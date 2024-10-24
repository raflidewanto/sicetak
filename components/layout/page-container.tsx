import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function PageContainer({
  children,
  scrollable = false
}: {
  children: React.ReactNode;
  scrollable?: boolean;
}) {
  return (
    <>
      {scrollable ? (
        <ScrollArea className="h-[calc(100dvh-52px)] bg-white dark:bg-zinc-900">
          <div className="h-full  p-4 md:px-8">{children}</div>
        </ScrollArea>
      ) : (
        <div className="h-full  bg-white p-4 md:px-8 dark:bg-zinc-900">{children}</div>
      )}
    </>
  );
}
