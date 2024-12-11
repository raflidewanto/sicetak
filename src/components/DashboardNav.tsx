'use client';

import { basicPlaceholders, LS_IN_TOOLS_MENU, LS_USER_ROLES, Menu, Roles } from '@/constants/data';
import { cN } from '@/lib/utils';
import { decryptLS } from '@/utils/crypto';
import { ChevronDown, ChevronRight, Newspaper, User } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ScrollArea } from './ui/ScrollArea';
import { Separator } from './ui/Separator';

export function DashboardNav() {
  const path = usePathname();
  const router = useRouter();
  const [openMenuCode, setOpenMenuCode] = useState<string | null>(null);
  const [menus, setMenus] = useState<Array<Menu>>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedMenus = localStorage.getItem(LS_IN_TOOLS_MENU);
      const storedRoles = localStorage.getItem(LS_USER_ROLES);
      
      if (storedMenus) {
        const decryptedMenus = JSON.parse(decryptLS(storedMenus)) as Menu[];
        setMenus(decryptedMenus);
      }

      if (storedRoles) {
        const decryptedRoles = JSON.parse(decryptLS(storedRoles)) as Roles;
        setIsAdmin(decryptedRoles.some((role) => role.role_code === 'admin-sicetak'));
      }
    }
  }, []);

  const sicetakMenu = menus.find((m) => m.app_code === 'sicetak');

  const isActiveRoute = (route: string) => path.startsWith(route);

  const handleMenuClick = (menu: Menu) => {
    if (menu.sub_menu && menu.sub_menu.length > 0) {
      setOpenMenuCode((prev) => (prev === menu.menu_code ? null : menu.menu_code));
    } else if (menu.url) {
      router.push('/sicetak' + menu.url);
    }
  };

  return (
    <nav className="grid items-start gap-2">
      <div>
        {sicetakMenu?.sub_menu
          ?.filter((menu) => isAdmin || menu.menu_code === 'm-sicetak-dashboard-documents')
          .map((menu) => {
            const isOpen = openMenuCode === menu.menu_code;
            const isActive =
              isActiveRoute('/sicetak' + menu.url || '') ||
              menu.sub_menu?.some((sub) => isActiveRoute('/sicetak' + sub.url || ''));

            return (
              <div key={menu.menu_code}>
                <button
                  className={cN(
                    `flex h-[3rem] items-center gap-2 overflow-hidden py-2 text-sm font-medium transition-all hover:border-l-4 hover:border-l-[#F68833] hover:bg-sidebarBgHover justify-between w-full p-2`,
                    {
                      'border-l-4 border-l-[#F68833] bg-sidebarBgHover text-white': isActive,
                    }
                  )}
                  onClick={() => handleMenuClick(menu)}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-white">
                      {menu.menu_code === 'm-sicetak-dashboard-documents' ? <Newspaper /> : <User />}
                    </span>
                    <span className="text-white">{menu.menu_name}</span>
                  </div>
                  {menu.sub_menu && (
                    <span className="text-white">{isOpen ? <ChevronDown /> : <ChevronRight />}</span>
                  )}
                </button>
                {isOpen && menu.sub_menu && (
                  <div>
                    {menu.sub_menu.map((sub) => (
                      <a
                        key={sub.menu_id}
                        href={'/sicetak' + sub.url}
                        className={cN(
                          `block py-[0.95rem] pl-9 text-[0.875rem] capitalize hover:border-l-4 hover:border-l-[#F68833] hover:bg-sidebarBgHover transition-all`,
                          {
                            'bg-sidebarBgHover border-l-4 border-l-[#F68833] text-white': isActiveRoute(
                              '/sicetak' + sub.url
                            ),
                          }
                        )}
                      >
                        {sub.menu_name}
                      </a>
                    ))}
                  </div>
                )}
                <Separator color="#15374C" className="bg-slate-500 my-2" />
              </div>
            );
          })}
      </div>
      <ScrollArea className="h-72 w-48 rounded-md border mx-auto my-2 bg-white text-zinc-950">
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
