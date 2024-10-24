'use client';

import { DashboardNav } from '@/components/dashboard-nav';
import { navItems } from '@/constants/data';
import { useSidebar } from '@/hooks/useSidebar';
import { cn } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import Show from '../elements/show';
import PrinterIcon from '../icons/printer';

type SidebarProps = {
  className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
  const { isMinimized, toggle } = useSidebar();

  const handleToggle = () => {
    toggle();
  };

  return (
    <aside
      className={cn(
        `relative hidden h-screen flex-none border-r bg-white text-zinc-950 transition-[width] duration-500 md:block 
         dark:border-zinc-700 dark:bg-zinc-900 dark:text-slate-200`,
        !isMinimized ? 'w-72' : 'w-[72px]',
        className
      )}
    >
      <div className="hidden p-5 pt-10 lg:block">
        <Link href="/dashboard">
          <Show when={!isMinimized} fallback={<PrinterIcon className="text-orange-500" />}>
            <div className="flex items-center justify-start space-x-2">
              <span>
                <PrinterIcon className="text-orange-500 dark:text-orange-500" />
              </span>
              <p className="hidden text-start text-lg font-bold text-black md:block dark:text-slate-200">Si Cetak</p>
            </div>
          </Show>
        </Link>
      </div>
      <ChevronLeft
        className={cn(
          'absolute -right-3 top-10 z-50 cursor-pointer rounded-full border bg-white text-3xl text-zinc-950 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200', // Dark mode for Chevron
          isMinimized && 'rotate-180'
        )}
        onClick={handleToggle}
      />
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="mt-3 space-y-3">
            <DashboardNav items={navItems} />
          </div>
        </div>
      </div>
    </aside>
  );
}
