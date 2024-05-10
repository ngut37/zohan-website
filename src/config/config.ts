import { createConfig } from './create-config';
import { Config } from './types';

const defaultConfig: Config = {
  // TODO: remove after auth is overhauled to use http-only access token (https://zohan-app.atlassian.net/browse/ZOH-128)
  NEXT_PUBLIC_ACCESS_TOKEN_SECRET:
    process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET ??
    'ACCESS_TOKEN_SECRET_NOT_SET',

  NEXT_PUBLIC_GOOGLE_ID:
    process.env.NEXT_PUBLIC_GOOGLE_ID ?? 'GOOGLE_ID_NOT_SET',
  NEXT_PUBLIC_GOOGLE_SECRET: 'GOOGLE_SECRET_NOT_SET',
  NEXT_PUBLIC_FACEBOOK_CLIENT_ID: 'FACEBOOK_CLIENT_ID_NOT_SET',
  NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET: 'FACEBOOK_CLIENT_SECRET_NOT_SET',

  NEXT_PUBLIC_API_URL:
    process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/',
  NEXT_PUBLIC_APP_URL:
    process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000/',

  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 64,

  MIN_PASSWORD_LENGTH: 6,
  MAX_PASSWORD_LENGTH: 256,
};

export const config = createConfig(
  {
    development: {},
    preview: {},
    test: {},
    production: {},
  },
  defaultConfig,
);
