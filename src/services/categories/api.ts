import apiResolver from '@/utils/api';
import { createAxiosInstance, Response } from '../axiosInstance';
import { SubCategoryResponseDTO } from '../subcategories/api';
import { LS_TOKEN, LS_USER_ID } from '@/constants/data';
import { decryptLS } from '@/utils/crypto';
import { CategoryDTOResponse } from './types';

const axios = createAxiosInstance('categories');

export function getAllCategories() {
  return apiResolver<Response<CategoryDTOResponse[]>>(() => axios.get('', {
    headers: {
        "DT-SMSF-Token": localStorage.getItem(LS_TOKEN) as string,
        "DT-SMSF-UserID": localStorage.getItem(LS_USER_ID) as string,
        "DT-SMSF-UserType": 2,
    },
    params: {
      "search": "",
      "fields": "",
      "sort_type": "",
      "sort_by": "",
      "page": 1,
      "show_pagination": false,
    }
  }));
}

export function getCategoryByCode(id: string){
  return apiResolver<Response<CategoryDTOResponse>>(() => axios.get(`/${id}`));
}

export function getSubCategoriesByCategory(categoryId: string, search?: string, active?: string) {
  return apiResolver<Response<SubCategoryResponseDTO[]>>(() => axios.get(`/sub-categories/${categoryId}`, {
    params: {
      "subcategory_name": search,
      "subcategory_active": active === "true" ? true : active === 'false' ? false : null
    }
  }));
}

type AddCategoryRequestDTO = { 
  name: string;
  desc: string;
  master_detail_code?: string; // for sub category
  datetime: string;
  signature: string;  // crypto.EncodeSHA256HMAC private key, dto.Token, dto.category_name, dto.Date
}

export function createCategory(payload: AddCategoryRequestDTO) {
  const token = decryptLS(localStorage.getItem(LS_TOKEN) as string);
  const userID = decryptLS(localStorage.getItem(LS_USER_ID) as string);
  return apiResolver<Response<CategoryDTOResponse>>(() => axios.post('/add', payload, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "token = " + token,
      "DT-SMSF-Token": token,
      "DT-SMSF-UserID": userID,
      "DT-SMSF-UserType": 2,
    }
  }));
}

type UpdateCategoryRequestDTO = {
    code: string;
    name: string;
    desc: string;
    status: "1" | "0";
    master_detail_code?: string; // to change its parent category
    datetime: string;
    signature: string; // message = token, Code, Name, Date 
}

export function updateCategory(payload: UpdateCategoryRequestDTO) {
  return apiResolver<Response>(() => axios.post(`/update`, payload, {
    headers: {
      "Content-Type": "application/json",
    }
  }));
}