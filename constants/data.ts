import { NavItem } from '@/types';

// =====================================================
// local storage
export const VISUAL_EDITOR_CONFIG = '__puckConfig';
export const VISUAL_EDITOR_PREVIEW = '__puckVisualEditorPreview';
export const VISUAL_EDITOR_HTML = '__puckHtml';
// =====================================================
// search params
export const AGREEMENT_NO_QUERY = 'agreement-no';
export const DOCUMENT_ID_QUERY = 'id';
export const CATEGORY = 'category';
export const SUBCATEGORY = 'subcategory';
export const DOCUMENT_NAME = 'document-name';
export const DOCUMENT_TYPE = 'document-type'; // personal or corporate
// =====================================================

export const navItems: NavItem[] = [
  {
    title: 'Dokumen',
    href: '/dashboard/documents',
    icon: 'fileUp',
    label: 'Dokumen'
  },
  {
    title: 'Admin',
    href: '/admin/dashboard/documents',
    icon: 'user',
    label: 'Admin'
  }
  // {
  //   title: 'Upload Dokumen',
  //   href: '/dashboard/documents/upload',
  //   icon: 'fileUp',
  //   label: 'Upload'
  // },
  // {
  //   title: 'Cetak Dokumen',
  //   href: '/dashboard/documents',
  //   icon: 'page',
  //   label: 'Documents'
  // }
];

export const validPlaceholders = [
  '{{ $name }}',
  '{{ $nik }}',
  '{{ $address }}',
  '{{ $phone }}',
  '{{ $agreement_no }}',
  '{{ $date }}',
  '{{ $type }}',
  '{{ $machine_no }}',
  '{{ $chassis_no }}',
  '{{ $police_no }}',
  '{{ $bpkb_no }}',
  '{{ $color }}',
  '{{ $production_year }}',
  '{{ $bpkb_owner }}',
  '{{ $condition }}'
];

export const customParamPlaceholders = ['{{ $content1 }}', '{{ $content2 }}', '{{ $content3 }}', '{{ $content4 }}'];

export const productTypes = [
  {
    label: 'Semua',
    value: ''
  },
  {
    label: 'Fasilitas Dana',
    value: 'fund_facilities'
  },
  {
    label: 'Fasilitas Modal Usaha',
    value: 'business_capital_facilities'
  },
  {
    label: 'Installment Financing',
    value: 'installment_financing'
  },
  {
    label: 'SLB',
    value: 'slb'
  },
  {
    label: 'Mitra Loyal Carfin',
    value: 'carfin_loyal_partnership'
  },
  {
    label: 'Flash Cash R2',
    value: 'flash_cash_r2'
  }
] as const;

export type ProductTypeValue =
  | ''
  | 'fund_facilities'
  | 'business_capital_facilities'
  | 'installment_financing'
  | 'slb'
  | 'carfin_loyal_partnership'
  | 'flash_cash_r2';

export type DocumentType = 'corporate' | 'personal';

export type bracketPlaceholder = {
  placeholder: string;
  x: number;
  y: number;
  page: number;
  pageWidth: number;
  pageHeight: number;
};
