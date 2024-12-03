import { NavItem } from '@/types';

// =====================================================
// number constants
export const FIVE_MINUTES_IN_MS = 5 * 60 * 1000;
// =====================================================

// =====================================================
// search params
export const AGREEMENT_NO_QUERY = 'agreement-no';
export const DOCUMENT_ID_QUERY = 'id';
export const CATEGORY_QUERY = 'category';
export const CATEGORY_CODE_QUERY = 'category-code';
export const SUBCATEGORY_QUERY = 'subcategory';
export const DOCUMENT_NAME_QUERY = 'document-name';
export const DOCUMENT_TYPE_QUERY = 'document-type'; // personal or corporate
export const TAB_QUERY = 'tab';
export const ACTIVE_QUERY = 'active';
// =====================================================

export const basicPlaceholders = [
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
