import axios from 'axios';

// Configuración base de la API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/flexora/api';

// Crear instancia de axios con configuración base
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Para manejar cookies de autenticación
});

// Interceptor para agregar token de autenticación
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      // Redirigir al login si es necesario
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Tipos para las respuestas de la API
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

// Funciones de utilidad para las peticiones
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