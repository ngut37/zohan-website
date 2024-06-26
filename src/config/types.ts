export type Config = Partial<{
  APP_ENV: EnvironmentName;

  // TODO: remove after auth is overhauled to use http-only access token (https://zohan-app.atlassian.net/browse/ZOH-128)
  NEXT_PUBLIC_ACCESS_TOKEN_SECRET: string;

  NEXT_PUBLIC_API_URL: string;
  NEXT_PUBLIC_APP_URL: string;
  NEXT_PUBLIC_GOOGLE_ID: string;
  NEXT_PUBLIC_GOOGLE_SECRET: string;
  NEXT_PUBLIC_FACEBOOK_CLIENT_ID: string;
  NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET: string;

  MIN_PASSWORD_LENGTH: number;
  MAX_PASSWORD_LENGTH: number;

  MIN_NAME_LENGTH: number;
  MAX_NAME_LENGTH: number;
}>;

export type ConfigKeys = keyof Config;

export type EnvironmentName = 'development' | 'preview' | 'test' | 'production';

export type Environments = { [key in EnvironmentName]: Config } & {
  [key: string]: Record<string, any>;
};
