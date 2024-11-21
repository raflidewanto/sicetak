'use client';

import { DashboardNav } from '@/components/DashboardNav';
import { navItems } from '@/constants/data';
import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import Show from '../elements/Show';
import PrinterIcon from '@/assets/icons/ic-printer.svg';
import { useSidebar } from '../contexts/SidebarContext';

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
        `relative hidden h-screen flex-none border-r bg-sidebarBackground text-sidebarForeground transition-[width] duration-500 md:block`,
        !isMinimized ? 'w-[14.125rem]' : 'w-[72px]',
        className
      )}
    >
      <div className="hidden px-5 pt-6 lg:block">
        <Link href="/dashboard">
          <Show when={!isMinimized} fallback={<PrinterIcon />}>
            <div className="flex items-center justify-start space-x-2">
              <span>
                <PrinterIcon />
              </span>
              <p className="hidden text-start text-[1.5rem] font-bold text-white md:block">SiCetak</p>
            </div>
            <p className="text-xs">
              By SMS<span className="text-orange-500">Finance</span>
            </p>
          </Show>
        </Link>
      </div>
      <ChevronLeft
        className={cn(
          'absolute -right-3 top-10 z-50 cursor-pointer rounded-full border bg-white text-3xl text-zinc-950   ', // Dark mode for Chevron
          isMinimized && 'rotate-180'
        )}
        onClick={handleToggle}
      />
      <div className="space-y-4 py-4">
        <div className="py-2">
          <div className="mt-3 space-y-3">
            <DashboardNav items={navItems} />
          </div>
        </div>
      </div>
    </aside>
  );
}
