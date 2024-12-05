// =====================================================
// number constants
export const FIVE_MINUTES_IN_MS = 5 * 60 * 1000;
// =====================================================

// =====================================================
// local storage
export const LS_USER_ID = 'smsf-i-id';
export const LS_IN_TOOLS_MENU = 'smsf-mn';
export const LS_TOKEN = 'smsf-tk-i';
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

export const customParamPlaceholders = [
  '{{ $content1 }}',
  '{{ $content2 }}',
  '{{ $content3 }}',
  '{{ $content4 }}',
  "{{ $content5 }}",
  "{{ $content6 }}",
  "{{ $content7 }}",
  "{{ $content8 }}",
  "{{ $content9 }}",
  "{{ $content10 }}",
  "{{ $content11 }}",
  "{{ $content12 }}",
  "{{ $content13 }}",
  "{{ $content14 }}",
  "{{ $content15 }}",
];

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

export type Menu = {
  menu_id: number;
  menu_code: string;
  menu_name: string;
  menu_description: string;
  menu_priority: number;
  url: string;
  app_code: string;
  sub_menu: Menu[] | null;
}

export const dummyMenu: Array<Menu> = [
  {
      "menu_id": 99,
      "menu_code": "m-sicetak",
      "menu_name": "Si Cetak",
      "menu_description": "Si Cetak",
      "menu_priority": 1,
      "url": "/sicetak",
      "app_code": "sicetak",
      "sub_menu": [
          {
              "menu_id": 128,
              "menu_code": "m-sicetak-dashboard-documents",
              "menu_name": "Dokumen",
              "menu_description": "SiCetak Dokumen Dashboard\n",
              "menu_priority": 1,
              "url": "/dashboard/documents",
              "app_code": "sicetak",
              "sub_menu": null // append from categories
          },
          {
              "menu_id": 237,
              "menu_code": "m-sicetak-dashboard-admin",
              "menu_name": "Admin",
              "menu_description": "Dashboard Admin\n",
              "menu_priority": 2,
              "url": "/admin/dashboard/documents",
              "app_code": "sicetak",
              "sub_menu": [
                  {
                      "menu_id": 238,
                      "menu_code": "m-sicetak-dashboard-documents-admin",
                      "menu_name": "Dokumen",
                      "menu_description": "Dashboard Dokumen Admin\n",
                      "menu_priority": 1,
                      "url": "/sicetak/admin/dashboard/documents",
                      "app_code": "sicetak",
                      "sub_menu": null
                  },
                  {
                      "menu_id": 228,
                      "menu_code": "m-sicetak-dashboard-categories-admin",
                      "menu_name": "Kategori",
                      "menu_description": "Dashboard Kategori Dokumen Admin\n",
                      "menu_priority": 2,
                      "url": "/sicetak/admin/dashboard/categories",
                      "app_code": "sicetak",
                      "sub_menu": null
                  },
              ]
          }
      ]
  }
];