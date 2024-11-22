import apiResolver from '@/utils/api';
import { createAxiosInstance } from '../axiosInstance';

const axios = createAxiosInstance('sub-categories');

export type Response<T = undefined> = {
  success: boolean;
  message: string;
  data?: T;
};

type SubCategoryResponseDTO = {
  id: string;
  subcategory_id: string;
  subcategory_name: string;
  category_id: string;
  subcategory_active: boolean;
  created_at: number;
  updated_at: number;
};

export function getAllSubCategories() {
  return apiResolver<Response<SubCategoryResponseDTO[]>>(() => axios.get(''));
}
