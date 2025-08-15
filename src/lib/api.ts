import axios from 'axios';
import { TOKENS } from './api_endpoints';
import { HTTP_STATUS, TYPE } from './constants';
import { URLS } from './enpoints';

const API_PORT = process.env.NEXT_PUBLIC_API_PORT || '8000';
const API_HOST = process.env.NEXT_PUBLIC_API_HOST || 'localhost';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'flexora/api';
const API_BASE_URL = `http://${API_HOST}:${API_PORT}/${API_URL}/`;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== TYPE.UNDEFINED) {
      const token = localStorage.getItem(TOKENS.ACCESS_TOKEN);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === HTTP_STATUS.UNAUTHORIZED) {
      if (typeof window !== TYPE.UNDEFINED) {
        localStorage.removeItem(TOKENS.ACCESS_TOKEN);
        localStorage.removeItem(TOKENS.REFRESH_TOKEN);
        window.location.href = URLS.login;
      }
    }
    return Promise.reject(error);
  }
);

export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  status: number;
}

export interface PaginatedResponse<T = any> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export const api = {
  get: <T>(url: string, params?: any) => 
    apiClient.get<T>(url, { params }),
  
  post: <T>(url: string, data?: any) => 
    apiClient.post<T>(url, data),
  
  put: <T>(url: string, data?: any) => 
    apiClient.put<T>(url, data),
  
  patch: <T>(url: string, data?: any) => 
    apiClient.patch<T>(url, data),
  
  delete: <T>(url: string) => 
    apiClient.delete<T>(url),
}; 