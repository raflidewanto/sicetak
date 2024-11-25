import React from 'react';
import { cN } from '@/lib/utils';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cN('animate-pulse rounded-md bg-gray-300/80', className)} {...props} />;
}

export { Skeleton };
