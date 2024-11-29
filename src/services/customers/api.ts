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

type getCustomersDetailResponse = {
  agreement_no: string;
  name: string;
  plate_no: string;
  debtor_type: string;
  subcategory_code: string;
  otr: number;
  documents: Document[];
}

export function getCustomers(agreementNo: string) {
  return apiResolver<Response<getCustomersDetailResponse>>(() => axios.post(`/${agreementNo}`));
}


