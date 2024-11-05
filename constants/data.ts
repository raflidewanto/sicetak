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
// =====================================================

export const navItems: NavItem[] = [
  {
    title: 'Upload Dokumen',
    href: '/dashboard/documents/upload',
    icon: 'fileUp',
    label: 'Upload'
  },
  {
    title: 'Cetak Dokumen',
    href: '/dashboard/documents',
    icon: 'page',
    label: 'Documents'
  },
  {
    title: 'Logout',
    href: '/',
    icon: 'login',
    label: 'logout'
  }
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
