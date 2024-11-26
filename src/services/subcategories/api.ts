import apiResolver from '@/utils/api';
import { createAxiosInstance, Response } from '../axiosInstance';

const axios = createAxiosInstance('sub-categories');

export type SubCategoryResponseDTO = {
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
