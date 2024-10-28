import { Skeleton } from '@/components/ui/skeleton';

export function DocumentCardSkeleton() {
  return (
    <div className="w-full space-y-6">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
      <div className="p-6">
        <Skeleton className="mb-4 h-6 w-3/4" />
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-9 w-32 sm:w-36" />
          <Skeleton className="h-9 w-32 sm:w-24" />
          <Skeleton className="h-9 w-32 sm:w-24" />
          <Skeleton className="h-9 w-32 sm:w-24" />
        </div>
      </div>
    </div>
  );
}
