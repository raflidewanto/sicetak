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
    title: 'Cetak Dokumen',
    href: '/dashboard/documents',
    icon: 'page',
    label: 'Documents'
  },
  {
    title: 'Approval',
    href: '/dashboard/approval',
    icon: 'check',
    label: 'Approval'
  },
  {
    title: 'Logout',
    href: '/',
    icon: 'login',
    label: 'logout'
  }
];

export const productsTemplate = {
  fasilitas_dana: {
    FD01: 'Formulir Permohonan Pembiayaan Laporan Survei Analisa Pembiayaan',
    FD02: 'Offering Letter dan Informasi Penting',
    FD03: 'Perjanjian Pembiayaan, Syarat dan Ketentuan Perjanjian Pembiayaan, Ilustrasi',
    FD04: 'Surat Kuasa Fidusia',
    FD05: 'Surat Kuasa Lalai',
    FD06: 'Surat Pernyataan Transfer',
    FD07: 'Form Gesekan Nomor Rangka dan Nomor Mesin',
    FD08: 'Perjanjian Jual Beli Objek Jaminan',
    FD09: 'Surat Pernyataan Kepemilikan Kendaraan dan BPKB Objek Pembiayaan ( SOBAT, XTRA dan OTU)',
    FD010: 'Slip Kelengkapan Aplikasi',
    FD011:
      'Surat Persetujuan Pemberian Data dan/atau Informasi dan/atau Dokumen Debitur/Konsumen Pemasaran Produk/Program oleh Perusahaan Pembiayaan'
  },
  fasilitas_modal_usaha: {
    FMU01: 'Formulir Permohonan Pembiayaan Laporan Survei Analisa Pembiayaan',
    FMU02: 'Offering Letter dan Informasi Penting',
    FMU03: 'Perjanjian Pembiayaan, Syarat dan Ketentuan Perjanjian Pembiayaan, Ilustrasi',
    FMU04: 'Surat Kuasa Fidusia',
    FMU05: 'Surat Kuasa Lalai'
  }
};

export type TailwindUnit =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 14
  | 16
  | 20
  | 24
  | 28
  | 32
  | 36
  | 40
  | 44
  | 48
  | 52
  | 56
  | 60
  | 64
  | 72
  | 80
  | 96;

export const puckOptionsTailwindUnit = [
  { label: '0', value: '0' },
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '6', value: '6' },
  { label: '7', value: '7' },
  { label: '8', value: '8' },
  { label: '9', value: '9' },
  { label: '10', value: '10' },
  { label: '11', value: '11' },
  { label: '12', value: '12' },
  { label: '14', value: '14' },
  { label: '16', value: '16' },
  { label: '20', value: '20' },
  { label: '24', value: '24' },
  { label: '28', value: '28' },
  { label: '32', value: '32' },
  { label: '36', value: '36' },
  { label: '40', value: '40' },
  { label: '44', value: '44' },
  { label: '48', value: '48' },
  { label: '52', value: '52' },
  { label: '56', value: '56' },
  { label: '60', value: '60' },
  { label: '64', value: '64' },
  { label: '72', value: '72' },
  { label: '80', value: '80' },
  { label: '96', value: '96' },
  { label: 'auto', value: 'auto' }
];

export type TailwindFontWeight =
  | 'thin'
  | 'extralight'
  | 'light'
  | 'normal'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold'
  | 'black';

export type TailwindFontSize =
  | 'xs'
  | 'sm'
  | 'base'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl'
  | '8xl'
  | '9xl';
