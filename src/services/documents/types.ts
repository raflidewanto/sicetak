export type DocumentsResponse =  {
  success: boolean
  message: string
  data: Category[]
}

export type Category = {
  code: string
  name: string
  status: number
  documents: Document[]
  sub_categories: Category[]
}

export type Document = {
  code: string
  name: string
  description: string
  is_active: boolean
  document_type: DocumentType[]
}

export type DocumentType = {
  type: string
  name: string
  documents_file: DocumentsFile[]
}

export type DocumentsFile = {
  document_code: string
  document_name: string
  is_release: boolean
}
