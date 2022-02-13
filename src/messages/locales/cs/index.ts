import { globalMessages } from './global';
import { navbarMessages } from './modules/navbar';
import { registerMessages } from './modules/register';
import { loginMessages } from './modules/login';
import { phoneNumberUpdateMessages } from './modules/phone-number-update';
import { landingMessages } from './modules/landing';

export const cs = {
  ...globalMessages,
  ...landingMessages,
  ...navbarMessages,
  ...registerMessages,
  ...loginMessages,
  ...phoneNumberUpdateMessages,
};
