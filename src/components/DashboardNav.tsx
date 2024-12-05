'use client';

import { basicPlaceholders, dummyMenu, Menu } from '@/constants/data';
import { cN } from '@/lib/utils';
import { useCategories } from '@/services/categories/queries/useCategories';
import { ChevronDown, ChevronRight, User } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Show from './elements/Show';
import { ScrollArea } from './ui/ScrollArea';
import { Separator } from './ui/Separator';

export function DashboardNav() {
  const path = usePathname();
  const { data: categories } = useCategories();
  const [openMenuCode, setOpenMenuCode] = useState<string | null>(null); // Track which menu is open
  const [sicetakMenu, setSiCetakMenu] = useState<Menu[]>([]);

  const isActiveRoute = (route: string) => path.startsWith(route);

  useEffect(() => {
    let categoriesMenu: Menu[] = [];
    const categoriesLength = categories?.data?.length ?? 0;

    if (categoriesLength > 0) {
      for (let i = 0; i < categoriesLength; i++) {
        const category = categories?.data?.[i];
        categoriesMenu.push({
          menu_id: i,
          menu_code: `m-sicetak-dashboard-documents-${category?.category_code}`,
          menu_name: category?.category_name ?? '',
          menu_description: category?.category_description ?? '',
          menu_priority: i,
          url: `/sicetak/dashboard/documents/${category?.category_code}`,
          app_code: 'sicetak',
          sub_menu: null,
        });
      }
    }

    const menu = dummyMenu.find((menu) => menu.menu_code === 'm-sicetak');
    const newMenu = menu?.sub_menu?.map((m): Menu => {
      if (m?.menu_code === 'm-sicetak-dashboard-documents') {
        return { ...m, sub_menu: categoriesMenu };
      }
      return m;
    });

    if (newMenu) {
      setSiCetakMenu(newMenu);
    }
  }, [categories]);

  const toggleMenu = (menuCode: string) => {
    setOpenMenuCode((prev) => (prev === menuCode ? null : menuCode)); // Toggle menu open state
  };

  return (
    <nav className="grid items-start gap-2">
      {sicetakMenu?.map((menu) => {
        const isOpen = openMenuCode === menu.menu_code;
        const isActive = isActiveRoute(menu.url || '');

        return (
          <div key={menu?.menu_code}>
            <button
              className={cN(
                `flex h-[3rem] items-center gap-2 overflow-hidden py-2 text-sm font-medium transition-all hover:border-l-4 hover:border-l-[#F68833] hover:bg-sidebarBgHover justify-between w-full p-2`,
                {
                  'border-l-4 border-l-[#F68833] bg-sidebarBgHover text-white': isActive,
                }
              )}
              onClick={() => toggleMenu(menu.menu_code || '')}
            >
              <div className="flex items-center space-x-2">
                <span className="text-white">
                  <User />
                </span>
                <span className="text-white">{menu?.menu_name}</span>
              </div>
              <span className="text-white">{isOpen ? <ChevronDown /> : <ChevronRight />}</span>
            </button>
            <Show when={isOpen}>
              <div>
                {menu?.sub_menu?.map((sub) => (
                  <a
                    key={sub?.menu_id}
                    href={sub?.url}
                    className={cN(
                      `block py-[0.95rem] pl-9 text-[0.875rem] hover:border-l-4 hover:border-l-[#F68833] transition-all`,
                      {
                        'bg-sidebarBgHover border-l-4 border-l-[#F68833] text-white': isActiveRoute(sub?.url),
                      }
                    )}
                  >
                    {sub?.menu_name?.replaceAll('_', ' ')}
                    <Show when={!!sub?.sub_menu?.length}>
                      <ChevronRight />
                    </Show>
                  </a>
                ))}
              </div>
            </Show>
            <Separator color="#15374C" className="bg-slate-500 my-2" />
          </div>
        );
      })}
      <ScrollArea className="h-72 w-48 rounded-md border mx-auto my-2">
        <div className="p-4">
          <h4 className="mb-4 text-sm font-medium leading-none">Basic Placeholders</h4>
          {basicPlaceholders?.map((placeholder) => (
            <div key={placeholder}>
              <div className="text-sm">{placeholder}</div>
              <Separator className="my-2" />
            </div>
          ))}
        </div>
      </ScrollArea>
    </nav>
  );
}
