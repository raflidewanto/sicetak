import apiResolver from '@/utils/api';
import { createAxiosInstance, Response } from '../axiosInstance';
import { SubCategoryResponseDTO } from '../subcategories/api';

const axios = createAxiosInstance('categories');

type CategoryResponseDTO = {
  id: string;
  category_id: string;
  category_name: string;
  category_desc: string;
  category_active: boolean;
  created_at: number;
  updated_at: number;
};

export function getAllCategories() {
  return apiResolver<Response<CategoryResponseDTO[]>>(() => axios.get(''));
}

export function getSubCategoriesByCategory(categoryId: string) {
  return apiResolver<Response<SubCategoryResponseDTO[]>>(() => axios.get(`/subcategories/${categoryId}`));
}

export function createCategory(payload: FormData) {
  return apiResolver<Response<CategoryResponseDTO>>(() => axios.post('/add', payload));
}
