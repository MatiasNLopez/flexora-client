import type { User } from './user';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: Omit<User, 'created_at' | 'updated_at'> & {
    created_at: Date;
    updated_at: Date;
  };
}

export const AuthField = {
  access: 'access',
  refresh: 'refresh',
  user: 'user',
} as const;
