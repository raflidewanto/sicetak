import apiResolver from '@/utils/api';
import Axios from 'axios';

const axios = Axios.create({
  baseURL: `http://localhost:9500/api`
});

export async function printUsersPDF(formData: FormData) {
  return apiResolver(() =>
    axios.post('/pdf', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      method: 'POST'
    })
  );
}
