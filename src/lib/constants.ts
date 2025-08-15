import { IMAGES_PATHS } from "./images_config";

export const PATHS = {
  PUBLIC: {
    IMAGES : '/images',
  },
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const MESSAGE_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
} as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
  
} as const;

export const TYPE = {
  UNDEFINED: 'undefined',
} as const; 

export const IMAGES = {
  FLEXORA_LOGO: `${PATHS.PUBLIC.IMAGES}/${IMAGES_PATHS.FLEXORA_LOGO}`,
  FLEXORA_LOGO_SMALL: `${PATHS.PUBLIC.IMAGES}/${IMAGES_PATHS.FLEXORA_LOGO_SMALL}`,
  DEFAULT_AVATAR: `${PATHS.PUBLIC.IMAGES}/${IMAGES_PATHS.DEFAULT_AVATAR}`,
} as const;