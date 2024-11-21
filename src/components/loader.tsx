import { cn } from '@/lib/utils';

interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export default function Loader({ size = 'medium', className }: LoaderProps = {}) {
  const sizeClasses = {
    small: 'w-4 h-4 border-2',
    medium: 'w-8 h-8 border-3',
    large: 'w-12 h-12 border-4'
  };

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div
        className={cn(
          'animate-spin rounded-full border-solid border-orange-500',
          'border-t-transparent',
          sizeClasses[size]
        )}
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
