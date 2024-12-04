import apiResolver from '@/utils/api';
import { createAxiosInstance } from '../axiosInstance';

const axios = createAxiosInstance('parameters');

export function getParameters() {
  return apiResolver<Promise<Response>>(() => axios.get(''));
}

export function createParameter(payload: any) {
  return apiResolver<Promise<Response>>(() => axios.post('', payload));
}