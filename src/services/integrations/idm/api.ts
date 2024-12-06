import { LS_TOKEN, LS_USER_ID } from '@/constants/data';
import { Response } from '@/services/axiosInstance';
import apiResolver from '@/utils/api';
import { generateRequestBodyAuthorize } from '@/utils/auth';
import { decryptLS } from '@/utils/crypto';
import Axios from 'axios';
import moment from 'moment';
import { AuthorizeResponse, LoginPayload, LoginResponse } from './type';

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

export function authorize() {
  const token = localStorage.getItem(LS_TOKEN);
  const user = localStorage.getItem(LS_USER_ID);
  const decryptedToken = decryptLS(token ?? "");
  const decryptedUser = decryptLS(user ?? "");

  const payload = generateRequestBodyAuthorize(
    decryptedToken,
    decryptedUser,
    2,
    moment().format("YYYY-MM-DD HH:mm:ss"),
    process.env.NEXT_PUBLIC_PRIVATE_KEY ?? ""
  );
  const requestPayload = JSON.parse(payload);
  

  return apiResolver<Response<AuthorizeResponse>>(() => axios.post('/token/authorize', requestPayload, {
    headers: {
      "DT-SMSF-Datetime": requestPayload?.datetime,
      "DT-SMSF-Signature": requestPayload?.signature,
      "Authorization": `token = ${decryptedToken}`
    }
  }));
}

export const validateTokenFetch = async () => {
  let urlValidateToken = process.env.NEXT_PUBLIC_IDM_BASE_URL_STAGING + '/idm/token/authorize';
  const token = localStorage.getItem(LS_TOKEN);
  const user = localStorage.getItem(LS_USER_ID);
  const decryptedToken = decryptLS(token ?? "");
  const decryptedUser = decryptLS(user ?? "");

  const payload = generateRequestBodyAuthorize(
    decryptedToken,
    decryptedUser,
    2,
    moment().format("YYYY-MM-DD HH:mm:ss"),
    process.env.NEXT_PUBLIC_PRIVATE_KEY ?? ""
  );
  const requestPayload = JSON.parse(payload);
  const requestOptions = {
      method: 'POST',
      headers: {
        "Authorization": `token = ${decryptedToken}`
      },
      body: JSON.stringify(requestPayload),
  };
  const response = await fetch(urlValidateToken, requestOptions);
  let data;
  if (response.ok) {
      data = await response.json();
  }
  return { response, data };
};