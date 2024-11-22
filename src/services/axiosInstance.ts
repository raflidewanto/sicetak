import Axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_SICETAK_API_BASE_URL;

if (!baseURL) {
  throw new Error('NEXT_PUBLIC_SICETAK_API_BASE_URL is not defined');
}

/**
 * Creates an Axios instance with a specified endpoint appended to the base URL.
 * 
 * @param {string} [endpoint] - The endpoint to append to the base URL. Defaults to an empty string if not provided.
 * @returns {AxiosInstance} An Axios instance configured with the designated base URL and optional endpoint.
 */
export const createAxiosInstance = (endpoint?: string) => {
  const axios = Axios.create({
    baseURL: `${baseURL}/${endpoint ?? ''}`
  });
  return axios;
};