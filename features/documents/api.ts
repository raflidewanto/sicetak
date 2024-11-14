import apiResolver, { newAbortSignal } from '@/utils/api';
import Axios from 'axios';

const baseURL = 'http://localhost:9500/api/documents';
const axios = Axios.create({
  baseURL
});

export type Response<T = undefined> = {
  success: boolean;
  message: string;
  data?: T;
};

const FIFTEEN_SECONDS = 15_000;

export type Document = {
  id: string;
  file_id: string;
  name: string;
  file: string; // base64 encoded
  raw_file: string; // base64 encoded
  type: string;
  active: boolean;
  release: boolean;
  created_at: number;
  updated_at: number;
};

type UploadResponse = {
  success: boolean;
  message: string;
};

export async function uploadDocument(formData: FormData): Promise<Response> {
  return apiResolver<UploadResponse>(() =>
    axios.post('/upload', formData, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      signal: newAbortSignal(FIFTEEN_SECONDS)
    })
  );
}

export function getDocuments({
  documentName,
  documentCategory,
  documentSubCategory,
  documentType
}: {
  documentName: string;
  documentCategory: string;
  documentSubCategory: string;
  documentType: string;
}): Promise<Response<Document[]>> {
  return apiResolver<Response<Document[]>>(() =>
    axios.get(``, {
      signal: AbortSignal.timeout(FIFTEEN_SECONDS),
      params: {
        'doc-name': documentName,
        'doc-category': documentCategory,
        'doc-subcategory': documentSubCategory,
        'doc-type': documentType
      }
    })
  );
}

type DownloadDocResponse = {
  success: boolean;
  message: string;
  data: Document;
};

export function downloadDocument(id: string): Promise<DownloadDocResponse> {
  return apiResolver<DownloadDocResponse>(() => axios.get(`/template/${id}`));
}

export function printDocument(id: string, agreementNo: string): Promise<Response<string>> {
  return apiResolver<Response<string>>(() => axios.post(`/print?id=${id}&agreement-no=${agreementNo}`));
}

type DeleteResponse = {
  message: string;
  success: boolean;
};

export function deleteDocument(id: string): Promise<Response> {
  return apiResolver<DeleteResponse>(() => axios.post(`/delete/${id}`));
}

export function reuploadDocument(formData: FormData, id: string): Promise<Response> {
  return apiResolver<Response>(() => axios.post(`/reupload/${id}`, formData));
}

export type PlaceholderResponseDTO = {
  id: number;
  placeholder_id: string;
  name: string;
  x: number;
  y: number;
  page: number;
  page_width: number;
  page_height: number;
  custom_value: string;
  document_id: string;
  created_at: number;
  updated_at: number;
};

export function getPlaceholders(id: string): Promise<Response<PlaceholderResponseDTO[]>> {
  return apiResolver<Response<PlaceholderResponseDTO[]>>(() => axios.get(`/placeholders/${id}`));
}

export function getDocumentById(id: string): Promise<Response<Document>> {
  return apiResolver<Response<Document>>(() => axios.get(`/template/${id}`));
}

type UpdatePlaceholderValuePayload = {
  doc_id: string;
  placeholder_name: string;
  value: string;
  placeholder_id: string;
};

export function updatePlaceholderValue(payload: UpdatePlaceholderValuePayload): Promise<Response> {
  return apiResolver<Response>(() => axios.post(`/placeholders/update`, payload));
}

export function toggleActive(id: string): Promise<Response> {
  return apiResolver<Response>(() => axios.post(`/active/${id}`));
}

export function toggleRelease(id: string): Promise<Response> {
  return apiResolver<Response>(() => axios.post(`/release/${id}`));
}
