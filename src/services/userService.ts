import { api, PaginatedResponse } from '@/lib/api';
import type { User } from '@/models/user';
import { USER_ENDPOINTS } from '@/lib/api_endpoints';

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

  async getUsers(params?: {
    page?: number;
    page_size?: number;
    search?: string;
    ordering?: string;
  }): Promise<PaginatedResponse<User>> {
    try {
      const response = await api.get<PaginatedResponse<User>>(USER_ENDPOINTS.LIST, params);
      return response.data;
    } catch (error) {
      console.error('Error getting users:', error);
      throw error;
    }
  }

  async getUserById(id: number): Promise<User> {
    try {
      const response = await api.get<User>(USER_ENDPOINTS.DETAIL(id));
      return response.data;
    } catch (error) {
      console.error('Error getting user by id:', error);
      throw error;
    }
  }

  async createUser(userData: CreateUserData): Promise<User> {
    try {
      const response = await api.post<User>(USER_ENDPOINTS.CREATE, userData);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async updateUser(id: number, userData: UpdateUserData): Promise<User> {
    try {
      const response = await api.patch<User>(USER_ENDPOINTS.UPDATE(id), userData);
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  async deleteUser(id: number): Promise<void> {
    try {
      await api.delete(USER_ENDPOINTS.DELETE(id));
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  async activateUser(id: number): Promise<User> {
    try {
      const response = await api.patch<User>(USER_ENDPOINTS.ACTIVATE(id));
      return response.data;
    } catch (error) {
      console.error('Error activating user:', error);
      throw error;
    }
  }

  async deactivateUser(id: number): Promise<User> {
    try {
      const response = await api.patch<User>(USER_ENDPOINTS.DEACTIVATE(id));
      return response.data;
    } catch (error) {
      console.error('Error deactivating user:', error);
      throw error;
    }
  }
}

export const userService = new UserService(); 