import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/Tooltip';

type ToolTipProps = {
  children: React.ReactNode;
  title: string;
}

const ToolTip = (props: ToolTipProps) => {
  const { children, title } = props;
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent>
          {title}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ToolTip;