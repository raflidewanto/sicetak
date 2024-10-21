import apiResolver from '@/utils/api';
import Axios from 'axios';

const axios = Axios.create({
  baseURL: `http://localhost:9500/api`
});

export async function printUsersPDF(formData: FormData): Promise<BinaryType> {
  return apiResolver(() =>
    axios.post('/pdf', formData, {
      responseType: 'blob',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      method: 'POST'
    })
  );
}

type DocxResponse = {
  success: boolean;
  message: string;
  data: string;
};

export async function printUsersPDFFromDocx(formData: FormData): Promise<DocxResponse> {
  return apiResolver(() =>
    axios.post('/docx', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      method: 'POST'
    })
  );
}

export async function testWhitePDF() {
  return apiResolver(() => axios.get('/documents/template'));
}
