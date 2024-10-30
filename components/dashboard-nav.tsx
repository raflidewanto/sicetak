'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import { NavItem } from '@/types';
import { Dispatch, SetStateAction } from 'react';
import { useSidebar } from '@/hooks/useSidebar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

interface DashboardNavProps {
  items: NavItem[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
  isMobileNav?: boolean;
}

export function DashboardNav({ items, setOpen, isMobileNav = false }: DashboardNavProps) {
  const path = usePathname();
  const { isMinimized } = useSidebar();

  if (!items?.length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-2">
      <TooltipProvider>
        {items.map((item, index) => {
          const Icon = Icons[item.icon || 'arrowRight'];
          return (
            item.href && (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.disabled ? '/' : item.href}
                    className={cn(
                      `flex items-center gap-2 overflow-hidden rounded-md py-2 text-sm font-medium transition-all hover:border hover:border-orange-300 hover:bg-white hover:text-orange-500 dark:hover:border-orange-800 dark:hover:bg-zinc-900 dark:hover:text-orange-500`,
                      path === item.href
                        ? `bg-orange-500 text-white dark:border dark:border-orange-800 dark:bg-orange-950 dark:text-white dark:hover:border-amber-950 dark:hover:bg-orange-900 dark:hover:text-white`
                        : 'transparent',
                      item.disabled && 'cursor-not-allowed opacity-80',
                      item.label?.toLowerCase() === 'logout' &&
                        `hover:border hover:border-red-300 hover:text-red-500 dark:text-white dark:hover:border dark:hover:border-red-500 dark:hover:bg-red-950`
                    )}
                    onClick={() => {
                      if (setOpen) setOpen(false);
                    }}
                  >
                    <Icon className={`ml-3 size-5 flex-none dark:text-orange-600`} />

                    {isMobileNav || (!isMinimized && !isMobileNav) ? (
                      <span className="mr-2 truncate">{item.title}</span>
                    ) : (
                      ''
                    )}
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  align="center"
                  side="right"
                  sideOffset={8}
                  className={cn(
                    !isMinimized ? 'hidden' : 'inline-block',
                    item.label?.toLowerCase() === 'logout' ? 'bg-red-500' : ''
                  )}
                >
                  {item.title}
                </TooltipContent>
              </Tooltip>
            )
          );
        })}
      </TooltipProvider>
    </nav>
  );
}
