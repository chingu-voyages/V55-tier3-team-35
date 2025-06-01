// src/api/apiCaller.js
import API from './axiosConfig'; // Your configured Axios instance

import { type AxioError } from '@/types/stores.d';
/**
 * Generic API call function.
 * Handles try/catch, loading states, and error messages.
 *
 * @param {string} method - The HTTP method (e.g., 'get', 'post', 'put', 'delete').
 * @param {string} url - The API endpoint URL.
 * @param {object} [data=null] - The request body data (for POST, PUT, PATCH).
 * @param {object} [config={}] - Additional Axios request configuration (e.g., params, headers).
 * @returns {Promise<object>} - A promise that resolves with the response data, or rejects with an error.
 */

const apiCall = async (method: string, url: string, data: unknown = null) => {
  let response = null;
  const config = {};
  try {
    switch (method.toLowerCase()) {
      case 'get':
        response = await API.get(url, config);
        break;
      case 'post':
        response = await API.post(url, data, config);
        break;
      case 'put':
        response = await API.put(url, data, config);
        break;
      case 'patch':
        response = await API.patch(url, data, config);
        break;
      case 'delete':
        response = await API.delete(url, config); // DELETE often doesn't have a body, use config for params
        break;
      default:
        throw new Error(`Unsupported HTTP method: ${method}`);
    }

    // Always return response.data if successful
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      const errorMessage =
        (error as AxioError).response?.data?.message ||
        error.message ||
        'An unexpected error occurred.';
      console.error(
        `API Call Error (${method.toUpperCase()} ${url}):`,
        errorMessage,
      );
      throw new Error(errorMessage);
    }
    throw error;
  }
};

// Export individual methods for convenience
export const get = (url: string) => apiCall('get', url, null);
export const post = (url: string, data: unknown) => apiCall('post', url, data);
export const put = (url: string, data: unknown) => apiCall('put', url, data);
export const patch = (url: string, data: unknown) =>
  apiCall('patch', url, data);
export const del = (url: string) => apiCall('delete', url, null); // 'delete' is a reserved keyword, use 'del'
