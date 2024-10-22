import apiResolver from '@/utils/api';
import Axios from 'axios';

const baseURL = 'http://localhost:9500/api/documents';
const axios = Axios.create({
  baseURL
});

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
      }
    })
  );
}

type DocumentResponse = {
  success: boolean;
  message: string;
  data: Array<Document>;
};

export async function getDocuments(): Promise<DocumentResponse> {
  return apiResolver<DocumentResponse>(() => axios.get(''));
}

type DownloadDocResponse = {
  success: boolean;
  message: string;
  data: Document;
};

export async function downloadDocument(id: string): Promise<DownloadDocResponse> {
  return apiResolver<DownloadDocResponse>(() => axios.get(`/template/${id}`));
}

type PrintResponse = {
  message: string;
  success: boolean;
  data: string;
};

export async function printDocument(id: string, agreementNo: string): Promise<PrintResponse> {
  return apiResolver<PrintResponse>(() => axios.post(`/print?id=${id}&agreement-no=${agreementNo}`));
}
