import { enumerate } from '@utils/enumerate';

export const CONFIG_KEYS = enumerate(
  'PORT',
  'APP_ENV',
  'TESTING_EMAIL',

  'API_URL',

  'MIN_PASSWORD_LENGTH',
  'MAX_PASSWORD_LENGTH',

  'MIN_NAME_LENGTH',
  'MAX_NAME_LENGTH',
);
