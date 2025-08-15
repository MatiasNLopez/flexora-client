
// Constantes de tokens
export const TOKENS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
} as const;

export const MODULES = {
  AUTH: 'auth',
  USER: 'users',
  ROLE: 'roles',
  CONFIGURATION: 'configuration',
  LANGUAGE: 'language',
  MESSAGE: 'message',
  MESSAGE_DETAIL: 'message-detail',
  PRODUCT: 'product',
} as const;

export const ACTIONS = {
  LOGIN: 'login',
  LOGOUT: 'logout',
  REFRESH_TOKEN: 'token/refresh',
  CURRENT_USER: 'user',
  LIST: '',
  CREATE: '',
  DETAIL: (id: number) => `${id}/`,
  UPDATE: (id: number) => `${id}/`,
  DELETE: (id: number) => `${id}/`,
  ACTIVATE: (id: number) => `${id}/activate`,
  DEACTIVATE: (id: number) => `${id}/deactivate`,
} as const;
    
export const AUTH_ENDPOINTS = {
  LOGIN: `${MODULES.AUTH}/${ACTIONS.LOGIN}/`,
  LOGOUT: `${MODULES.AUTH}/${ACTIONS.LOGOUT}/`,
  REFRESH_TOKEN: `${MODULES.AUTH}/${ACTIONS.REFRESH_TOKEN}/`,
  CURRENT_USER: `${MODULES.AUTH}/${ACTIONS.CURRENT_USER}/`,
} as const;

export const USER_ENDPOINTS = {
  LIST: `${MODULES.USER}/`,
  CREATE: `${MODULES.USER}/`,
  DETAIL: (id: number) => `${MODULES.USER}/${ACTIONS.DETAIL(id)}`,
  UPDATE: (id: number) => `${MODULES.USER}/${ACTIONS.UPDATE(id)}`,
  DELETE: (id: number) => `${MODULES.USER}/${ACTIONS.DELETE(id)}`,
  ACTIVATE: (id: number) => `${MODULES.USER}/${ACTIONS.ACTIVATE(id)}/`,
  DEACTIVATE: (id: number) => `${MODULES.USER}/${ACTIONS.DEACTIVATE(id)}/`,
} as const;

export const ROLE_ENDPOINTS = {
  LIST: `${MODULES.ROLE}/`,
  CREATE: `${MODULES.ROLE}/`,
  DETAIL: (id: number) => `${MODULES.ROLE}/${ACTIONS.DETAIL(id)}`,
  UPDATE: (id: number) => `${MODULES.ROLE}/${ACTIONS.UPDATE(id)}`,
  DELETE: (id: number) => `${MODULES.ROLE}/${ACTIONS.DELETE(id)}`,
} as const;

export const CONFIGURATION_ENDPOINTS = {
  LIST: `${MODULES.CONFIGURATION}/`,
  CREATE: `${MODULES.CONFIGURATION}/`,
  DETAIL: (id: number) => `${MODULES.CONFIGURATION}/${ACTIONS.DETAIL(id)}`,
  UPDATE: (id: number) => `${MODULES.CONFIGURATION}/${ACTIONS.UPDATE(id)}`,
  DELETE: (id: number) => `${MODULES.CONFIGURATION}/${ACTIONS.DELETE(id)}`,
} as const;

export const LANGUAGE_ENDPOINTS = {
  LIST: `${MODULES.LANGUAGE}/`,
  CREATE: `${MODULES.LANGUAGE}/`,
  DETAIL: (id: number) => `${MODULES.LANGUAGE}/${ACTIONS.DETAIL(id)}`,
  UPDATE: (id: number) => `${MODULES.LANGUAGE}/${ACTIONS.UPDATE(id)}`,
  DELETE: (id: number) => `${MODULES.LANGUAGE}/${ACTIONS.DELETE(id)}`,
} as const;

export const MESSAGE_ENDPOINTS = {
  LIST: `${MODULES.MESSAGE}/`,
  CREATE: `${MODULES.MESSAGE}/`,
  DETAIL: (id: number) => `${MODULES.MESSAGE}/${ACTIONS.DETAIL(id)}`,
  UPDATE: (id: number) => `${MODULES.MESSAGE}/${ACTIONS.UPDATE(id)}`,
  DELETE: (id: number) => `${MODULES.MESSAGE}/${ACTIONS.DELETE(id)}`,
} as const;

export const MESSAGE_DETAIL_ENDPOINTS = {
  LIST: `${MODULES.MESSAGE_DETAIL}/`,
  CREATE: `${MODULES.MESSAGE_DETAIL}/`,
  DETAIL: (id: number) => `${MODULES.MESSAGE_DETAIL}/${ACTIONS.DETAIL(id)}`,
  UPDATE: (id: number) => `${MODULES.MESSAGE_DETAIL}/${ACTIONS.UPDATE(id)}`,
  DELETE: (id: number) => `${MODULES.MESSAGE_DETAIL}/${ACTIONS.DELETE(id)}`,
} as const;

export const PRODUCT_ENDPOINTS = {
  LIST: `${MODULES.PRODUCT}/`,
  CREATE: `${MODULES.PRODUCT}/`,
  DETAIL: (id: number) => `${MODULES.PRODUCT}/${ACTIONS.DETAIL(id)}`,
  UPDATE: (id: number) => `${MODULES.PRODUCT}/${ACTIONS.UPDATE(id)}`,
  DELETE: (id: number) => `${MODULES.PRODUCT}/${ACTIONS.DELETE(id)}`,
} as const;

export const API_ENDPOINTS = {
  AUTH: AUTH_ENDPOINTS,
  USER: USER_ENDPOINTS,
  ROLE: ROLE_ENDPOINTS,
  CONFIGURATION: CONFIGURATION_ENDPOINTS,
  LANGUAGE: LANGUAGE_ENDPOINTS,
  MESSAGE: MESSAGE_ENDPOINTS,
  MESSAGE_DETAIL: MESSAGE_DETAIL_ENDPOINTS,
  PRODUCT: PRODUCT_ENDPOINTS,
} as const;

export type AuthEndpoint = typeof AUTH_ENDPOINTS[keyof typeof AUTH_ENDPOINTS];
export type UserEndpoint = typeof USER_ENDPOINTS[keyof typeof USER_ENDPOINTS];
export type RoleEndpoint = typeof ROLE_ENDPOINTS[keyof typeof ROLE_ENDPOINTS];
export type ConfigurationEndpoint = typeof CONFIGURATION_ENDPOINTS[keyof typeof CONFIGURATION_ENDPOINTS];
export type LanguageEndpoint = typeof LANGUAGE_ENDPOINTS[keyof typeof LANGUAGE_ENDPOINTS];
export type MessageEndpoint = typeof MESSAGE_ENDPOINTS[keyof typeof MESSAGE_ENDPOINTS];
export type MessageDetailEndpoint = typeof MESSAGE_DETAIL_ENDPOINTS[keyof typeof MESSAGE_DETAIL_ENDPOINTS];
export type ProductEndpoint = typeof PRODUCT_ENDPOINTS[keyof typeof PRODUCT_ENDPOINTS]; 