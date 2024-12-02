import apiResolver from '@/utils/api';
import { createAxiosInstance, Response } from '../axiosInstance';
import { SubCategoryResponseDTO } from '../subcategories/api';

const axios = createAxiosInstance('categories');

type CategoryResponseDTO = {
    category_code: string;
    category_name: string;
    category_description: string;
    category_active: boolean;
    created_by: number;
    created_at: number;
    updated_by: number;
    updated_at: number;
  }

export function getAllCategories(categoryName?: string) {
  return apiResolver<Response<CategoryResponseDTO[]>>(() => axios.get('', {
    params: {
      category_name: categoryName
    }
  }));
}

export function getCategoryByCode(id: string){
  return apiResolver<Response<CategoryResponseDTO>>(() => axios.get(`/${id}`));
}

export function getSubCategoriesByCategory(categoryId: string) {
  return apiResolver<Response<SubCategoryResponseDTO[]>>(() => axios.get(`/sub-categories/${categoryId}`));
}

type AddCategoryRequestDTO = {
  category_name: string;
  category_description: string;
  category_active: boolean;
}

export function createCategory(payload: AddCategoryRequestDTO) {
  return apiResolver<Response<CategoryResponseDTO>>(() => axios.post('/add', payload));
}

type UpdateCategoryRequestDTO = {
  category_code: string;
  category_name: string;
  category_description: string;
}

export function updateCategory(payload: UpdateCategoryRequestDTO) {
  return apiResolver<Response>(() => axios.post(`/update/${payload.category_code}`, payload, {
    headers: {
      "Content-Type": "application/json",
    }
  }));
}