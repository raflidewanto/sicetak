export type AddCategoryPayload = {
  name: string;
  desc: string;
  datetime: string; // YYYY-MM-DD HH:mm:ss
  signature: string; // sha256
};

export type CategoryDTOResponse = {
  code: string;
  name: string;
  status: string;
  description: string;
  sub_categories: CategoryDTOResponse[];
};

export type DocumentDTO = {
  code: string;
  name: string;
  description: string;
  is_active: boolean;
  type_document: TypeDocumentDTO;
};

type TypeDocumentDTO = {
  perorangan: DocumentFileDTO[];
  perusahaan: DocumentFileDTO[];
};

type DocumentFileDTO = {
  document_code: string;
  document_name: string;
  is_release: boolean;
};
