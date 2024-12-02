import apiResolver from '@/utils/api';
import { createAxiosInstance, Response } from '../axiosInstance';
import { Document } from '../documents/api';

const axios = createAxiosInstance('/consuments');

export type Customer = {
  agreement_no: string;
  name: string;
  plate_no: string;
  debtor_type: string;
  subcategory_code: string;
  otr: number;
  documents: Document[];
}

export type getCustomersDetailResponse = {
  agreement_no: string;
  name: string;
  plate_no: string;
  debtor_type: string;
  subcategory_code: string;
  otr: number;
  documents: Document[];
}

type getConsumentPayload = {
  agreement_no: string;
}

export function getCustomers(payload: getConsumentPayload) {
  return apiResolver<Response<getCustomersDetailResponse>>(() => axios.post(`/${payload?.agreement_no}`, payload));
}


