import { BaseModel, BaseModelField } from './base';

export interface User extends BaseModel {
  user_id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  plan: string;
}

export const UserField  = {
  ...BaseModelField,
  user_id: 'user_id',
  username: 'username',
  email: 'email',
  first_name: 'first_name',
  last_name: 'last_name',
  avatar: 'avatar', //TODO agregar el avatar del usuario en el cliente
  plan: 'plan', //TODO agregar el plan del usuario en el cliente
} as const;
