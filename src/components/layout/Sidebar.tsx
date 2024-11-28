'use client';

import PrinterIcon from '@/assets/icons/ic-printer.svg';
import { DashboardNav } from '@/components/DashboardNav';
import { cN } from '@/lib/utils';
import Link from 'next/link';
import { useSidebar } from '../contexts/SidebarContext';
import Show from '../elements/Show';

type SidebarProps = {
  className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
  const { isMinimized } = useSidebar();

  return (
    <aside
      className={cN(
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
      <div className="space-y-4 py-4">
        <div className="py-2">
          <div className="mt-3 space-y-3">
            <DashboardNav />
          </div>
        </div>
      </div>
    </aside>
  );
}
