import axios, { AxiosRequestConfig } from 'axios';

import { config } from '@config/config';

import {
  getAccessToken,
  parseAccessToken,
  removeAccessToken,
  saveAccessTokenToken,
} from '@utils/storage/auth';

import { ResponseResult } from './types';

export const apiClient = axios.create({
  baseURL: config.NEXT_PUBLIC_API_URL?.toString(),
  headers: {
    'Content-Type': 'application/json',
  },
});

export const protectedApiClient = axios.create({
  baseURL: config.NEXT_PUBLIC_API_URL?.toString(),
  headers: {
    'Content-Type': 'application/json',
  },
});

const originalRequest = protectedApiClient.request;

protectedApiClient.request = async (
  requestConfig: AxiosRequestConfig,
): Promise<any | undefined> => {
  try {
    // auth token inject
    const accessToken = getAccessToken();
    if (accessToken) {
      if (!requestConfig.headers) requestConfig.headers = {};
      requestConfig.headers.authorization = `Bearer ${accessToken}`;
    }

    if (!parseAccessToken(accessToken, {})) {
      try {
        const {
          data: {
            data: { accessToken: refreshedAccessToken },
          },
        } = await originalRequest<
          ResponseResult<{
            accessToken: string;
          }>
        >({
          url: '/auth/refresh-token',
          method: 'GET',
          withCredentials: true,
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        });

        if (refreshedAccessToken) {
          saveAccessTokenToken(refreshedAccessToken);
          if (!requestConfig.headers) requestConfig.headers = {};
          requestConfig.headers.authorization = `Bearer ${refreshedAccessToken}`;
        }
      } catch {
        removeAccessToken();
        await originalRequest({
          url: '/auth/logout',
          method: 'POST',
          withCredentials: true,
        });
      }
    }

    const result = await originalRequest(requestConfig);

    return result;
  } catch (err: any) {
    console.error(err);
    throw err;
  }
};
