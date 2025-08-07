import { api } from '@/lib/api';
import { AUTH_ENDPOINTS, TOKENS, USER_ENDPOINTS } from '@/lib/endpoints';
import { log } from 'console';

// Tipos para autenticación
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: {
    user_id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
  };
}

export interface User {
  user_id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  created_at: Date;
  updated_at : Date;
}

class AuthService { 

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>(AUTH_ENDPOINTS.LOGIN, credentials);
      
      if (response.data.access) {
        localStorage.setItem(TOKENS.ACCESS_TOKEN, response.data.access);
        localStorage.setItem(TOKENS.REFRESH_TOKEN, response.data.refresh);
      }
      
      return response.data;
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await api.post(AUTH_ENDPOINTS.LOGOUT);
    } catch (error) {
      console.error('Error en logout:', error);
    } finally {
      localStorage.removeItem(TOKENS.ACCESS_TOKEN);
      localStorage.removeItem(TOKENS.REFRESH_TOKEN);
    }
  }

  async refreshToken(): Promise<{ access: string }> {
    try {
      const refreshToken = localStorage.getItem(TOKENS.REFRESH_TOKEN);
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await api.post<{ access: string }>(AUTH_ENDPOINTS.REFRESH_TOKEN, {
        refresh: refreshToken,
      });
      localStorage.setItem(TOKENS.ACCESS_TOKEN, response.data.access);
      
      return response.data;
    } catch (error) {
      console.error('Error refreshing token:', error);
      localStorage.removeItem(TOKENS.ACCESS_TOKEN);   
      localStorage.removeItem(TOKENS.REFRESH_TOKEN);
      throw error;
    }
  }

  async getCurrentUser(): Promise<User> {
    try {
      const response = await api.get<User>(AUTH_ENDPOINTS.CURRENT_USER);
      return response.data;
    } catch (error) {
      console.error('Error getting current user:', error);
      throw error;
    }
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(TOKENS.ACCESS_TOKEN);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(TOKENS.ACCESS_TOKEN);
  }
}

export const authService = new AuthService(); 