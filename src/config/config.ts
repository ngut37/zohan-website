import { createConfig } from './create-config';
import { Config } from './types';

const defaultConfig: Config = {
  API_URL: process.env.API_URL,
};

export const config = createConfig(
  {
    development: {
      API_URL: 'http://localhost:4000/',
    },
    preview: {},
    test: {},
    production: {
      API_URL: 'https://zohan-services.oa.r.appspot.com/',
    },
  },
  defaultConfig,
);
