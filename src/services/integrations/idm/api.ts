import { Response } from '@/services/axiosInstance';
import apiResolver from '@/utils/api';
import Axios from 'axios';
import moment from 'moment';
import { LoginPayload, LoginResponse } from './type';

const baseURL = 
  process.env.NODE_ENV === 'development' ? 
  process.env.NEXT_PUBLIC_IDM_BASE_URL_STAGING : 
  process.env.NEXT_PUBLIC_IDM_BASE_URL;

if (!baseURL) {
  throw new Error('NEXT_PUBLIC_IDM_BASE_URL is not defined');
}

/**
 * Creates an Axios instance with a specified endpoint appended to the base URL.
 * 
 * @param {string} [endpoint] - The endpoint to append to the base URL. Defaults to an empty string if not provided.
 * @returns {AxiosInstance} An Axios instance configured with the designated base URL and optional endpoint.
 */
export const createAxiosInstance = (endpoint?: string) => {
  if (endpoint && !endpoint.startsWith('/')) {
    endpoint = `/${endpoint}`;
  }
  const axios = Axios.create({
    baseURL: `${baseURL}${endpoint ?? ''}`
  });
  return axios;
};

const axios = createAxiosInstance("/idm");

export function login(payload: LoginPayload): Promise<Response<LoginResponse>> {
  return apiResolver(() => axios.post("/smsf/login", payload, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `token = ${process.env.NEXT_PUBLIC_AUTH_TOKEN_HEADER}`,
      "DT-SMSF-API-Key": `${process.env.NEXT_PUBLIC_API_KEY}`,
      "DT-SMSF-Source": `${process.env.NEXT_PUBLIC_SOURCE}`,
      "DT-SMSF-DeviceID": `${process.env.NEXT_PUBLIC_DEVICE_ID}`,
      "DT-SMSF-Datetime": moment().format("YYYY-MM-DD HH:mm:ss"),
    },
  }));
}

