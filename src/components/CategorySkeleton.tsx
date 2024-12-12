import React from 'react';
import { Skeleton } from './ui/Skeleton';
import { Separator } from './ui/Separator';

const CategorySkeleton = () => {
  return (
    <div className='grid place-content-center'>
      {Array.from({ length: 10 }).map((_, i) => (
        <React.Fragment key={i}>
          <Skeleton className='lg:w-52 h-14 rounded-none w-full' />
          <Separator />
        </React.Fragment>
      ))}
    </div>
  );
};

export default CategorySkeleton;