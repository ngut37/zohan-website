import Cookies from 'universal-cookie';
import { verify, VerifyOptions } from 'jsonwebtoken';

import { config } from '@config';

import { User } from '@api/auth/types';

export type AccessTokenPayload = {};

const cookies = new Cookies();

export const saveAccessTokenToken = (token: string) => {
  if (typeof window === 'undefined') return;

  cookies.set('access_token', token, { path: '/' });
};

export const getAccessToken = () => {
  const token = cookies.get('access_token');
  if (!token) return undefined;
  return token;
};

export const removeAccessToken = () => {
  cookies.remove('access_token');
};

export const parseAccessToken = (
  token: string,
  verifyOptions: VerifyOptions,
): User | undefined => {
  try {
    const payload = verify(
      token,
      config.NEXT_PUBLIC_ACCESS_TOKEN_SECRET || '',
      verifyOptions,
    ) as User;
    return payload;
  } catch {
    return undefined;
  }
};
