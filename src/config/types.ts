export type Config = Partial<{
  PORT: number;
  APP_ENV: EnvironmentName;

  ACCESS_TOKEN_SECRET: string;

  API_URL: string;
  APP_URL: string;
  GOOGLE_ID: string;
  GOOGLE_SECRET: string;
  FACEBOOK_CLIENT_ID: string;
  FACEBOOK_CLIENT_SECRET: string;
  NEXTAUTH_URL: string;

  TESTING_EMAIL: string;

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
