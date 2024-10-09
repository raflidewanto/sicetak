import apiResolver from '@/utils/api';
import Axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_DEV_BASE_API;
const axios = Axios.create({
  baseURL
});

export type Template = {
  doc_name: string;
  doc_html: string;
  doc_editor_config: string;
  doc_created_at: number;
  doc_updated_at: number;
  doc_templ_id: string;
};

export async function fetchTemplates(): Promise<Template[]> {
  return apiResolver<Template[]>(() => axios.get('/templates'));
}
