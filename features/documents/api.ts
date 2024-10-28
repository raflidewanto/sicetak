import apiResolver, { newAbortSignal } from '@/utils/api';
import Axios from 'axios';

const baseURL = 'http://localhost:9500/api/documents';
const axios = Axios.create({
  baseURL
});

const FIFTEEN_SECONDS = 15_000;

type Document = {
  id: string;
  file_id: string;
  name: string;
  file: string; // base64 encoded
  created_at: number;
  updated_at: number;
};

type UploadResponse = {
  success: boolean;
  message: string;
};

export async function uploadDocument(formData: FormData): Promise<UploadResponse> {
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

type DocumentResponse = {
  success: boolean;
  message: string;
  data: Array<Document> | null;
};

export function getDocuments(): Promise<DocumentResponse> {
  return apiResolver<DocumentResponse>(() =>
    axios.get('', {
      signal: AbortSignal.timeout(FIFTEEN_SECONDS)
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

type PrintResponse = {
  message: string;
  success: boolean;
  data: string;
};

export function printDocument(id: string, agreementNo: string): Promise<PrintResponse> {
  return apiResolver<PrintResponse>(() => axios.post(`/print?id=${id}&agreement-no=${agreementNo}`));
}

type DeleteResponse = {
  message: string;
  success: boolean;
};

export function deleteDocument(id: string): Promise<DeleteResponse> {
  return apiResolver<DeleteResponse>(() => axios.post(`/delete/${id}`));
}

type ReuploadResponse = {
  message: string;
  success: boolean;
};

export function reuploadDocument(formData: FormData, id: string): Promise<ReuploadResponse> {
  return apiResolver<ReuploadResponse>(() => axios.post(`/reupload/${id}`, formData));
}
