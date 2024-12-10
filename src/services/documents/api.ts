import apiResolver, { newAbortSignal } from '@/utils/api';
import { createAxiosInstance, Response } from '../axiosInstance';
import { DocumentsResponse } from './types';
import { LS_TOKEN, LS_USER_ID } from '@/constants/data';
import { decryptLS } from '@/utils/crypto';
import { DocumentDTO } from '../categories/types';

const axios = createAxiosInstance('documents');

const FIFTEEN_SECONDS = 15_000;

export type Document = {
  document_code: string;
  name: string;
  file: string;
  raw_file: string;
  description: string;
  type: string;
  category_name: string;
  subcategory_name: string;
  release: boolean;
  active: boolean;
  created_by: number;
  created_at: string;
  updated_by: number;
  updated_at: string;
}

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
  categoryCode,
}: {
  categoryCode?: string;
}) {
  return apiResolver<Response<DocumentDTO[]>>(() =>
    axios.get(``, {
      signal: AbortSignal.timeout(FIFTEEN_SECONDS),
      headers: {
        "DT-SMSF-Token": decryptLS(localStorage.getItem(LS_TOKEN) as string),
        "DT-SMSF-UserID": decryptLS(localStorage.getItem(LS_USER_ID) as string),
        "DT-SMSF-UserType": 2,
    },
    params: {
      "search": "",
      'category_code': categoryCode,
      "fields": "",
      "sort_type": "",
      "sort_by": "",
      "page": 1,
      "show_pagination": false,
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

type PrintDocumentPayload = {
  documentCode: string;
  agreementNo: string;
}

export function printDocument(payload: PrintDocumentPayload): Promise<Response<string>> {
  return apiResolver<Response<string>>(() => axios.post(`/print?id=${payload?.documentCode}&agreement_no=${payload?.agreementNo}`));
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
  placeholder_code: string;
  placeholder_name: string;
  custom_value: string;
  x: number;
  y: number;
  page: number;
  page_width: number;
  page_height: number;
  document_code: string;
  created_at: string;
  updated_at: string;
}

export function getPlaceholders(id: string): Promise<Response<PlaceholderResponseDTO[]>> {
  return apiResolver<Response<PlaceholderResponseDTO[]>>(() => axios.get(`/placeholders/${id}`));
}

export function getDocumentById(id: string): Promise<Response<Document>> {
  return apiResolver<Response<Document>>(() => axios.get(`/template/${id}`));
}

type UpdatePlaceholderValuePayload = {
  placeholder_name: string;
  custom_value: string;
  document_code: string;
}

export function updatePlaceholderValue(payload: UpdatePlaceholderValuePayload): Promise<Response> {
  return apiResolver<Response>(() => axios.post(`/placeholders/update/${payload?.document_code}`, payload));
}

export function toggleActive(id: string): Promise<Response> {
  return apiResolver<Response>(() => axios.post(`/active/${id}`));
}

export function toggleRelease(id: string): Promise<Response> {
  return apiResolver<Response>(() => axios.post(`/release/${id}`));
}

export function getDocumentBySubcategory(id: string): Promise<Response<Document[]>> {
  return apiResolver<Response<Document[]>>(() => axios.get(`/subcategory/${id}`));
}

export function getMasterData() {
  return apiResolver<DocumentsResponse>(() => axios.get(`/documents`)); 
}