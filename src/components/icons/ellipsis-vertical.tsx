import { cn } from '@/lib/utils';
import React from 'react';

interface EllipsisVerticalProps {
  className?: string;
  strokeColor?: string;
  width?: number;
  height?: number;
}

const EllipsisVertical: React.FC<EllipsisVerticalProps> = ({
  className,
  strokeColor = 'text-zinc-950 ', // Default Tailwind classes for colors
  width = 24, // Default width
  height = 24 // Default height
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(strokeColor, className)} // Allows custom color and other class names
    >
      {/* Ellipsis Vertical Shape */}
      <circle cx="12" cy="5" r="1"></circle>
      <circle cx="12" cy="12" r="1"></circle>
      <circle cx="12" cy="19" r="1"></circle>
    </svg>
  );
};

export default EllipsisVertical;
