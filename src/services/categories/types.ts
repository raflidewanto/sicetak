export type AddCategoryPayload = {
  name: string,
  desc: string,
  datetime: string, // YYYY-MM-DD HH:mm:ss
  signature: string; // sha256
}

export type CategoryDTOResponse = {
	code: string;
	name: string;
	status: string;
	document: DocumentDTO[];
	sub_categories: CategoryDTOResponse[]
}

export type DocumentDTO = {
	code: String;
	name: string;
	description: string;
	is_active: boolean;
	document_type: TypeDocumentDTO[]
}

type TypeDocumentDTO = {
	code: string;
	name: string;
	documents_file: DocumentFileDTO[]
}

type DocumentFileDTO = {
	document_code: string;
	document_name: string;
	is_release: boolean;
}