import apiResolver from '@/utils/api';
import Axios from 'axios';

const baseURL = 'http://localhost:9500/api/sub-categories';
const axios = Axios.create({
  baseURL
});

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
