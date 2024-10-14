import apiResolver from '@/utils/api';
import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'http://localhost:9500/api'
});

export type PDFInfo = {
  placeholder: string;
  x: string;
  y: string;
};

export async function printUsersPDF(formData: FormData) {
  return apiResolver(() =>
    axios.post('/print', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      method: 'POST'
    })
  );
}
