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
