'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icons } from '@/components/Icons';
import { cN } from '@/lib/utils';
import { NavItem } from '@/types';
import { Dispatch, SetStateAction } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/Tooltip';
import { useSidebar } from './contexts/SidebarContext';
import Show from './elements/Show';
import { ChevronDown, ChevronRight, User } from 'lucide-react';

interface DashboardNavProps {
  items: NavItem[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
  isMobileNav?: boolean;
}

export function DashboardNav({ items, setOpen, isMobileNav = false }: DashboardNavProps) {
  const path = usePathname();
  const { isMinimized } = useSidebar();
  const [isAdminOpen, setIsAdminOpen] = useState(true);
  const isActiveRoute = (route: string) => path.startsWith(route);

  if (!items?.length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-2">
      <TooltipProvider>
        <Show when={items.length > 0}>
          {items.map((item, index) => {
            const Icon = Icons[item.icon || 'arrowRight'];
            return (
              item.href && (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.disabled ? '/' : item.href}
                      className={cN(
                        `flex h-[3rem] items-center gap-2 overflow-hidden py-2 text-sm font-medium transition-all hover:border-l-4 hover:border-l-orange-600 hover:bg-sidebarBgHover`,
                        path === item.href || path.split('/')[1] === item.href.split('/')[1]
                          ? `border-l-4 border-l-orange-600 bg-sidebarBgHover text-white`
                          : 'transparent',
                        item.disabled && 'cursor-not-allowed opacity-80',
                        item.label?.toLowerCase() === 'logout' &&
                        `:border :border-red-500 :bg-red-950  hover:border hover:border-red-300 hover:text-red-500`
                      )}
                      onClick={() => {
                        if (setOpen) setOpen(false);
                      }}
                    >
                      <Icon className={`ml-3 size-5 flex-none `} />

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
                    className={cN(
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
        </Show>
        {/* admin collapsible menu */}
        <div>
          <button
            className={cN(`flex h-[3rem] items-center gap-2 overflow-hidden py-2 text-sm font-medium transition-all hover:border-l-4 hover:border-l-orange-600 hover:bg-sidebarBgHover justify-between w-full p-2`, {
              "border-l-4 border-l-orange-600 bg-sidebarBgHover text-white": isActiveRoute("/admin"),
            })}
            onClick={() => setIsAdminOpen(!isAdminOpen)}
          >
            <div className="flex items-center space-x-2">
              <span className="text-white">
                <User />
              </span>
              <span className="text-white">Admin</span>
            </div>
            <span className="text-white">{isAdminOpen ? <ChevronDown /> : <ChevronRight />}</span>
          </button>
          {isAdminOpen && (
            <div>
              {/* Child Links */}
              <a
                href="/admin/dashboard/documents"
                className={cN(`block py-[0.95rem] pl-9 text-[0.875rem]`, {
                  "bg-sidebarBgHover border-l-4 border-l-orange-600 text-white": isActiveRoute("/admin/dashboard/documents")
                })}
              >
                Dokumen
              </a>
              <a
                href="/admin/dashboard/parameters"
                className={`block py-[0.95rem] pl-9 text-[0.875rem] ${isActiveRoute("/admin/dashboard/parameter")
                  ? "bg-sidebarBgHover border-l-4 border-l-orange-600 text-white"
                  : "hover:bg-[#0f283b] text-gray-400"
                  }`}
              >
                Parameter
              </a>
              <a
                href="/admin/dashboard/category"
                className={`block py-[0.95rem] pl-9 text-[0.875rem] ${isActiveRoute("/admin/dashboard/categories")
                  ? "bg-sidebarBgHover border-l-4 border-l-orange-600 text-white"
                  : "hover:bg-[#0f283b] text-gray-400"
                  }`}
              >
                Kategori
              </a>
            </div>
          )}
        </div>
      </TooltipProvider>
    </nav>
  );
}
