'use client';

import { DashboardNav } from '@/components/DashboardNav';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/Sheet';
import { navItems } from '@/constants/data';
import { MenuIcon } from 'lucide-react';
import React, { useState } from 'react';

export function MobileSidebar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <MenuIcon className="" />
        </SheetTrigger>
        <SheetContent side="left" className="bg-sidebarBackground !px-0 text-white ">
          <div className="space-y-4 py-4">
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Overview</h2>
              <div className="space-y-1">
                <DashboardNav items={navItems} isMobileNav={true} setOpen={setOpen} />
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
