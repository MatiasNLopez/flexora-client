export const IMAGES_SIZES = {
  FLEXORA_LOGO: {
    width: 128,
    height: 128,
  },
  FLEXORA_LOGO_SMALL: {
    width: 32,
    height: 32,
  },
  DEFAULT_AVATAR: {
    width: 32,
    height: 32,
  },
} as const;

export const IMAGES_TYPES = {
  PNG: 'png',
  SVG: 'svg',
} as const;

export const IMAGES_PATHS = {
  FLEXORA_LOGO: `flexora_logo.${IMAGES_TYPES.PNG}`,
  FLEXORA_LOGO_SMALL: `flexora_logo_small.${IMAGES_TYPES.PNG}`,
  DEFAULT_AVATAR: `avatar_default.${IMAGES_TYPES.SVG}`,
} as const;


