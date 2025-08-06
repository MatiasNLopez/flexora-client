import { api } from '@/lib/api';

// Tipos para autenticación
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
  };
}

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  date_joined: string;
}

class AuthService {
  private readonly AUTH_ENDPOINT = 'auth/';

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>(`${this.AUTH_ENDPOINT}login/`, credentials);
      
      // Guardar tokens en localStorage
      if (response.data.access) {
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
      }
      
      return response.data;
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await api.post(`${this.AUTH_ENDPOINT}logout/`);
    } catch (error) {
      console.error('Error en logout:', error);
    } finally {
      // Limpiar tokens del localStorage
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
  }

  async refreshToken(): Promise<{ access: string }> {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await api.post<{ access: string }>(`${this.AUTH_ENDPOINT}token/refresh/`, {
        refresh: refreshToken,
      });

      // Actualizar token de acceso
      localStorage.setItem('access_token', response.data.access);
      
      return response.data;
    } catch (error) {
      console.error('Error refreshing token:', error);
      // Limpiar tokens si falla el refresh
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      throw error;
    }
  }

  async getCurrentUser(): Promise<User> {
    try {
      const response = await api.get<User>(`${this.AUTH_ENDPOINT}user/`);
      return response.data;
    } catch (error) {
      console.error('Error getting current user:', error);
      throw error;
    }
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }
}

export const authService = new AuthService(); 