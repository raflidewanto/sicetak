'use client';

import { basicPlaceholders } from '@/constants/data';
import useDisclosure from '@/hooks/useDisclosure';
import { cN } from '@/lib/utils';
import { ChevronDown, ChevronRight, Newspaper, User } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Show from './elements/Show';
import { ScrollArea } from './ui/ScrollArea';
import { Separator } from './ui/Separator';
import { TooltipProvider } from './ui/Tooltip';
import { useCategories } from '@/services/categories/queries/useCategories';

export function DashboardNav() {
  const path = usePathname();
  const { data: categories } = useCategories();
  const isActiveRoute = (route: string) => path.startsWith(route);
  const [isAdminOpen, setIsAdminOpen] = useState(true);
  const { isOpen, toggle } = useDisclosure(isActiveRoute('/dashboard'));

  return (
    <nav className="grid items-start gap-2">
      <TooltipProvider>
        {/* user collapsible menu */}
        <div>
          <button
            className={cN(`flex h-[3rem] items-center gap-2 overflow-hidden py-2 text-sm font-medium transition-all hover:border-l-4 hover:border-l-[#F68833] hover:bg-sidebarBgHover justify-between w-full p-2`, {
              "border-l-4 border-l-[#F68833] bg-sidebarBgHover text-white": isActiveRoute("/dashboard"),
            })}
            onClick={() => toggle()}
          >
            <div className="flex items-center space-x-2">
              <span className="text-white">
                <Newspaper />
              </span>
              <span className="text-white">Dokumen</span>
            </div>
            <span className="text-white">{isOpen ? <ChevronDown /> : <ChevronRight />}</span>
          </button>
          <Show when={isOpen}>
            <Show when={Boolean(categories)}>
              <ScrollArea className="max-h-[15rem] overflow-y-scroll">
                {categories?.data?.map((category) => (
                  <a
                    key={category?.category_code}
                    href={`/dashboard/documents/${category?.category_code}`}
                    className={cN(`hover:bg- block py-[0.95rem] pl-9 capitalize text-[0.875rem] hover:border-l-4 hover:border-l-[#F68833] transition-all`, {
                      "bg-sidebarBgHover border-l-4 border-l-[#F68833] text-white": path.startsWith(`/dashboard/documents/${category?.category_code}`)
                    })}
                  >
                    {category?.category_name?.replaceAll("_", " ")}
                  </a>
                ))}
              </ScrollArea>
            </Show>
          </Show>
        </div>
        <Separator color='#15374C' className='bg-slate-500' />
        {/* admin collapsible menu */}
        <div>
          <button
            className={cN(`flex h-[3rem] items-center gap-2 overflow-hidden py-2 text-sm font-medium transition-all hover:border-l-4 hover:border-l-[#F68833] hover:bg-sidebarBgHover justify-between w-full p-2`, {
              "border-l-4 border-l-[#F68833] bg-sidebarBgHover text-white": isActiveRoute("/admin"),
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
          <Show when={isAdminOpen}>
            <div>
              {/* Child Links */}
              <a
                href="/admin/dashboard/documents"
                className={cN(`block py-[0.95rem] pl-9 text-[0.875rem] hover:border-l-4 hover:border-l-[#F68833] transition-all`, {
                  "bg-sidebarBgHover border-l-4 border-l-[#F68833] text-white": isActiveRoute("/admin/dashboard/documents")
                })}
              >
                Dokumen
              </a>
              {/* <a
                href="/admin/dashboard/parameters"
                className={cN(`block py-[0.95rem] pl-9 text-[0.875rem] hover:border-l-4 hover:border-l-[#F68833] transition-all`, {
                  "bg-sidebarBgHover border-l-4 border-l-[#F68833] text-white": isActiveRoute("/admin/dashboard/parameters")
                })}
              >
                Parameter
              </a> */}
              <a
                href="/admin/dashboard/categories"
                className={cN(`block py-[0.95rem] pl-9 text-[0.875rem] hover:border-l-4 hover:border-l-[#F68833] transition-all`, {
                  "bg-sidebarBgHover border-l-4 border-l-[#F68833] text-white": isActiveRoute("/admin/dashboard/categories")
                })}
              >
                Kategori
              </a>
            </div>
          </Show>
          <Separator color='#15374C' className='bg-slate-500' />
        </div>
      </TooltipProvider>
      <div>
        <ScrollArea className="h-72 w-48 rounded-md border mx-auto my-2">
          <div className="p-4">
            <h4 className="mb-4 text-sm font-medium leading-none">
              Basic Placeholders
            </h4>
            {basicPlaceholders?.map((placeholder) => (
              <div key={placeholder}>
                <div className="text-sm">{placeholder}</div>
                <Separator className="my-2" />
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </nav>
  );
}
