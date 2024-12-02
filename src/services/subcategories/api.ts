import apiResolver from '@/utils/api';
import { createAxiosInstance, Response } from '../axiosInstance';

const axios = createAxiosInstance('sub-categories');

export type SubCategoryResponseDTO = {
  subcategory_code: string;
  subcategory_name: string;
  category_code: string;
  subcategory_active: boolean;
  created_by: number;
  created_at: number;
  updated_by: number;
  updated_at: number;
};

export function getAllSubCategories() {
  return apiResolver<Response<SubCategoryResponseDTO[]>>(() => axios.get(''));
}

export type AddSubcategoryRequestDTO = {
  subcategory_name: string;
  subcategory_desc: string;
  category_code: string;
  subcategory_active: boolean;
}

export function createSubcategory(payload: AddSubcategoryRequestDTO) {
  return apiResolver<Response>(() => axios.post('/add', payload));
}

type SubcategoryResponseDTO = { 
  subcategory_code: string;
  subcategory_name: string;
  subcategory_desc: string;
  category_code: string;
  subcategory_active: boolean;
  created_by: number;
  created_at: string;
  updated_by: number;
  updated_at: string;
}

export function getSubcategory(subcategoryCode: string) {
  return apiResolver<Response<SubcategoryResponseDTO>>(() => axios.get(`/${subcategoryCode}`));
}

type UpdateSubcategoryRequestDTO = {
  subcategory_code: string;
  subcategory_name: string;
  subcategory_desc: string;
  category_code: string;
}

export function updateSubcategory(payload: UpdateSubcategoryRequestDTO) {
  return apiResolver<Response>(() => axios.post(`/update/${payload.subcategory_code}`, payload, {
    headers: {
      "Content-Type": "application/json",
    }
  }));
}