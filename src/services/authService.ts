import { api } from '@/lib/api';
import { AUTH_ENDPOINTS, TOKENS } from '@/lib/api_endpoints';
import { TYPE } from '@/lib/constants';
import type { LoginCredentials, AuthResponse } from '@/models/auth';
import type { User } from '@/models/user';

class AuthService { 

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>(AUTH_ENDPOINTS.LOGIN, credentials);
      
      if (response.data.access && typeof window !== TYPE.UNDEFINED) {
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
      // Continue with local cleanup even if server logout fails
    } finally {
      if (typeof window !== TYPE.UNDEFINED) {
        localStorage.removeItem(TOKENS.ACCESS_TOKEN);
        localStorage.removeItem(TOKENS.REFRESH_TOKEN);
      }
    }
  }

  async refreshToken(): Promise<{ access: string }> {
    try {
      if (typeof window === TYPE.UNDEFINED) {
        throw new Error('No refresh token available');
      }
      
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
      if (typeof window !== TYPE.UNDEFINED) {
        localStorage.removeItem(TOKENS.ACCESS_TOKEN);   
        localStorage.removeItem(TOKENS.REFRESH_TOKEN);
      }
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
    if (typeof window === TYPE.UNDEFINED) return false;
    return !!localStorage.getItem(TOKENS.ACCESS_TOKEN);
  }

  getAccessToken(): string | null {
    if (typeof window === TYPE.UNDEFINED) return null;
    return localStorage.getItem(TOKENS.ACCESS_TOKEN);
  }
}

export const authService = new AuthService(); 