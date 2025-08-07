import { api, PaginatedResponse } from '@/lib/api';
import { User } from './authService';

export interface CreateUserData {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  is_active?: boolean;
}

export interface UpdateUserData {
  username?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  is_active?: boolean;
}

class UserService {
  private readonly USER_ENDPOINT = 'users/';

  async getUsers(params?: {
    page?: number;
    page_size?: number;
    search?: string;
    ordering?: string;
  }): Promise<PaginatedResponse<User>> {
    try {
      const response = await api.get<PaginatedResponse<User>>(this.USER_ENDPOINT, params);
      return response.data;
    } catch (error) {
      console.error('Error getting users:', error);
      throw error;
    }
  }

  async getUserById(id: number): Promise<User> {
    try {
      const response = await api.get<User>(`${this.USER_ENDPOINT}${id}/`);
      return response.data;
    } catch (error) {
      console.error('Error getting user by id:', error);
      throw error;
    }
  }

  async createUser(userData: CreateUserData): Promise<User> {
    try {
      const response = await api.post<User>(this.USER_ENDPOINT, userData);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async updateUser(id: number, userData: UpdateUserData): Promise<User> {
    try {
      const response = await api.patch<User>(`${this.USER_ENDPOINT}${id}/`, userData);
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  async deleteUser(id: number): Promise<void> {
    try {
      await api.delete(`${this.USER_ENDPOINT}${id}/`);
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  async activateUser(id: number): Promise<User> {
    try {
      const response = await api.patch<User>(`${this.USER_ENDPOINT}${id}/activate/`);
      return response.data;
    } catch (error) {
      console.error('Error activating user:', error);
      throw error;
    }
  }

  async deactivateUser(id: number): Promise<User> {
    try {
      const response = await api.patch<User>(`${this.USER_ENDPOINT}${id}/deactivate/`);
      return response.data;
    } catch (error) {
      console.error('Error deactivating user:', error);
      throw error;
    }
  }
}

export const userService = new UserService(); 