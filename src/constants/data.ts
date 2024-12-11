// =====================================================

import { DocumentsResponse } from "@/services/documents/types";

// number constants
export const FIVE_MINUTES_IN_MS = 5 * 60 * 1000;
// =====================================================

// =====================================================
// local storage
export const LS_USER_ID = 'smsf-i-id';
export const LS_IN_TOOLS_MENU = 'smsf-mn';
export const LS_TOKEN = 'smsf-tk-i';
export const LS_USER_ROLES = 'smsf-rl';
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

export type DocumentType = 'corporate' | 'individual';

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

export type Role = {
    role_id: number;
    role_code: string;
    role_name: string;
}

export type Roles = Role[];

export const dummyMenu: Array<Menu> = [
  {
      "menu_id": 1,
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
              "menu_priority": 2,
              "url": "/dashboard/documents",
              "app_code": "sicetak",
              "sub_menu": null
          },
          {
              "menu_id": 237,
              "menu_code": "m-sicetak-dashboard-admin",
              "menu_name": "Admin",
              "menu_description": "Admin Dashboard\n",
              "menu_priority": 1,
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
                  {
                      "menu_id": 218,
                      "menu_code": "m-sicetak-dashboard-parameters-admin",
                      "menu_name": "Parameter",
                      "menu_description": "Dashboard Parameter Dokumen Admin\n",
                      "menu_priority": 3,
                      "url": "/sicetak/admin/dashboard/parameter",
                      "app_code": "sicetak",
                      "sub_menu": null
                  },
              ]
          }
      ]
  }
];

export const dummyMasterData: DocumentsResponse = {
  "success": true,
  "message": "get data success",
  "data": [
      {
          "code": "md-sicetak-category-009",
          "name": "Syariah",
          "status": 1,
          "documents": [],
          "sub_categories": []
      },
      {
          "code": "md-sicetak-category-008",
          "name": "Syariah",
          "status": 1,
          "documents": [],
          "sub_categories": []
      },
      {
          "code": "md-sicetak-category-001",
          "name": "Financial Agreement",
          "status": 1,
          "documents": [],
          "sub_categories": [
              {
                  "code": "md-sicetak-category-003",
                  "name": "Fasilitas Dana",
                  "status": 1,
                  "documents": [
                      {
                          "code": "DOC2412040001",
                          "name": "Surat Kuasa Fidusia",
                          "description": "",
                          "is_active": true,
                          "document_type": [
                              {
                                  "type": "md-sicetak-type-001",
                                  "name": "perorangan",
                                  "documents_file": [
                                      {
                                          "document_code": "DOCF2412040001",
                                          "document_name": "Surat Kuasa Fidusia",
                                          "is_release": false
                                      }
                                  ]
                              },
                              {
                                  "type": "md-sicetak-type-002",
                                  "name": "perusahaan",
                                  "documents_file": [
                                      {
                                          "document_code": "DOCF2412040003",
                                          "document_name": "Surat Kuasa Fidusia",
                                          "is_release": false
                                      }
                                  ]
                              }
                          ]
                      },
                      {
                          "code": "DOC2412040002",
                          "name": "Surat Kuasa Lalai",
                          "description": "",
                          "is_active": true,
                          "document_type": [
                              {
                                  "type": "md-sicetak-type-001",
                                  "name": "perorangan",
                                  "documents_file": [
                                      {
                                          "document_code": "DOCF2412040002",
                                          "document_name": "Surat Kuasa Lalai",
                                          "is_release": false
                                      }
                                  ]
                              },
                              {
                                  "type": "md-sicetak-type-002",
                                  "name": "perusahaan",
                                  "documents_file": [
                                      {
                                          "document_code": "DOCF2412040004",
                                          "document_name": "Surat Kuasa Lalai",
                                          "is_release": false
                                      }
                                  ]
                              }
                          ]
                      }
                  ],
                  "sub_categories": []
              },
              {
                  "code": "md-sicetak-category-004",
                  "name": "Fasilitas Modal Usaha",
                  "status": 1,
                  "documents": [
                      {
                          "code": "DOC2412040003",
                          "name": "Surat Kuasa Fidusia",
                          "description": "",
                          "is_active": true,
                          "document_type": [
                              {
                                  "type": "md-sicetak-type-001",
                                  "name": "perorangan",
                                  "documents_file": [
                                      {
                                          "document_code": "DOCF2412040005",
                                          "document_name": "Surat Kuasa Fidusia",
                                          "is_release": false
                                      }
                                  ]
                              },
                              {
                                  "type": "md-sicetak-type-002",
                                  "name": "perusahaan",
                                  "documents_file": [
                                      {
                                          "document_code": "DOCF2412040007",
                                          "document_name": "Surat Kuasa Fidusia",
                                          "is_release": false
                                      }
                                  ]
                              }
                          ]
                      },
                      {
                          "code": "DOC2412040004",
                          "name": "Surat Kuasa Lalai",
                          "description": "",
                          "is_active": true,
                          "document_type": [
                              {
                                  "type": "md-sicetak-type-001",
                                  "name": "perorangan",
                                  "documents_file": [
                                      {
                                          "document_code": "DOCF2412040006",
                                          "document_name": "Surat Kuasa Lalai",
                                          "is_release": false
                                      }
                                  ]
                              },
                              {
                                  "type": "md-sicetak-type-002",
                                  "name": "perusahaan",
                                  "documents_file": [
                                      {
                                          "document_code": "DOCF2412040008",
                                          "document_name": "Surat Kuasa Lalai",
                                          "is_release": false
                                      }
                                  ]
                              }
                          ]
                      }
                  ],
                  "sub_categories": []
              }
          ]
      },
      {
          "code": "md-sicetak-category-002",
          "name": "Agreement Transfer",
          "status": 1,
          "documents": [],
          "sub_categories": [
              {
                  "code": "md-sicetak-category-005",
                  "name": "Fasilitas Dana",
                  "status": 1,
                  "documents": [
                      {
                          "code": "DOC2412040005",
                          "name": "Surat Kuasa Fidusia",
                          "description": "",
                          "is_active": true,
                          "document_type": [
                              {
                                  "type": "md-sicetak-type-001",
                                  "name": "perorangan",
                                  "documents_file": [
                                      {
                                          "document_code": "DOCF2412040009",
                                          "document_name": "Surat Kuasa Fidusia",
                                          "is_release": false
                                      }
                                  ]
                              },
                              {
                                  "type": "md-sicetak-type-002",
                                  "name": "perusahaan",
                                  "documents_file": [
                                      {
                                          "document_code": "DOCF2412040011",
                                          "document_name": "Surat Kuasa Fidusia",
                                          "is_release": false
                                      }
                                  ]
                              }
                          ]
                      },
                      {
                          "code": "DOC2412040006",
                          "name": "Surat Kuasa Lalai",
                          "description": "",
                          "is_active": true,
                          "document_type": [
                              {
                                  "type": "md-sicetak-type-001",
                                  "name": "perorangan",
                                  "documents_file": [
                                      {
                                          "document_code": "DOCF2412040010",
                                          "document_name": "Surat Kuasa Lalai",
                                          "is_release": false
                                      }
                                  ]
                              },
                              {
                                  "type": "md-sicetak-type-002",
                                  "name": "perusahaan",
                                  "documents_file": [
                                      {
                                          "document_code": "DOCF2412040012",
                                          "document_name": "Surat Kuasa Lalai",
                                          "is_release": false
                                      }
                                  ]
                              }
                          ]
                      }
                  ],
                  "sub_categories": []
              },
              {
                  "code": "md-sicetak-category-006",
                  "name": "Fasilitas Modal Usaha",
                  "status": 1,
                  "documents": [
                      {
                          "code": "DOC2412040007",
                          "name": "Surat Kuasa Fidusia",
                          "description": "",
                          "is_active": true,
                          "document_type": [
                              {
                                  "type": "md-sicetak-type-001",
                                  "name": "perorangan",
                                  "documents_file": [
                                      {
                                          "document_code": "DOCF2412040013",
                                          "document_name": "Surat Kuasa Fidusia",
                                          "is_release": false
                                      }
                                  ]
                              },
                              {
                                  "type": "md-sicetak-type-002",
                                  "name": "perusahaan",
                                  "documents_file": [
                                      {
                                          "document_code": "DOCF2412040015",
                                          "document_name": "Surat Kuasa Fidusia",
                                          "is_release": false
                                      }
                                  ]
                              }
                          ]
                      },
                      {
                          "code": "DOC2412040008",
                          "name": "Surat Kuasa Lalai",
                          "description": "",
                          "is_active": true,
                          "document_type": [
                              {
                                  "type": "md-sicetak-type-001",
                                  "name": "perorangan",
                                  "documents_file": [
                                      {
                                          "document_code": "DOCF2412040014",
                                          "document_name": "Surat Kuasa Lalai",
                                          "is_release": false
                                      }
                                  ]
                              },
                              {
                                  "type": "md-sicetak-type-002",
                                  "name": "perusahaan",
                                  "documents_file": [
                                      {
                                          "document_code": "DOCF2412040016",
                                          "document_name": "Surat Kuasa Lalai",
                                          "is_release": false
                                      }
                                  ]
                              }
                          ]
                      }
                  ],
                  "sub_categories": []
              }
          ]
      }
  ]
};