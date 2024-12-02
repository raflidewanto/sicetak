import { Icons } from '@/components/Icons';

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;

export type bracketPlaceholder = {
  placeholder: string;
  x: number;
  y: number;
  page: number;
  pag_width: number;
  page_height: number;
};

export type ReuploadDocumentPayload = {
  name: string,
  document_type: string,
  category: string,
  subcategory: string,
  description: string,
  placeholders: string,
  active: boolean,
  release: boolean,
  file: File,
};