import { ResponseResult } from '@api/types';

import { apiClient, protectedApiClient } from '../api-client';

import { OAuthType, User } from './types';

type LoginBody = {
  email: string;
  password: string;
};

type AuthorizationData = {
  accessToken: string;
};

export const loginOrFail = async (body: LoginBody) => {
  const response = await apiClient.request<ResponseResult<AuthorizationData>>({
    url: '/auth/login',
    method: 'POST',
    data: body,
    withCredentials: true,
  });

  return response.data.data;
};

type OAuthLoginBody = {
  email: string;
  // password: string;
};

export const oAuthLoginOrFail = async (body: OAuthLoginBody) => {
  const response = await apiClient.request<ResponseResult<AuthorizationData>>({
    url: '/auth/o-auth-login',
    method: 'POST',
    data: body,
    withCredentials: true,
  });

  return response.data.data;
};

export const logoutOrFail = async () => {
  const response = await apiClient.request<ResponseResult>({
    url: '/auth/logout',
    method: 'POST',
    withCredentials: true,
  });
  return response.data;
};

type RegisterBody = {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
};

type OAuthRegisterBody = {
  name: string;
  email: string;
  oAuth: {
    userId: string;
    type: OAuthType | string;
  };
};

export const refreshToken = async () => {
  try {
    const response = await protectedApiClient.request<
      ResponseResult<AuthorizationData>
    >({
      url: '/auth/refresh-token',
      method: 'GET',
      withCredentials: true,
    });

    return response.data.data;
  } catch {
    return undefined;
  }
};

export async function register(body: RegisterBody): Promise<ResponseResult>;
export async function register(
  body: OAuthRegisterBody,
): Promise<ResponseResult>;
export async function register(
  body: RegisterBody | OAuthRegisterBody,
): Promise<ResponseResult> {
  const response = await apiClient.request<ResponseResult>({
    url: '/auth/register',
    method: 'POST',
    data: body,
    withCredentials: true,
  });
  return response.data;
}

export const emailExists = async (email: string) => {
  const response = await apiClient.request<ResponseResult<boolean>>({
    url: `/auth/email-exists/${email}`,
    method: 'GET',
  });
  if (response?.data) return response.data.data;
};

type UpdateUserBody = {
  email?: string;
  name?: string;
  password?: string;
  phoneNumber?: string;
};

export const updateUser = async (body: UpdateUserBody) => {
  try {
    const response = await apiClient.request<ResponseResult<User>>({
      url: `/auth/update`,
      method: 'POST',
      data: body,
      withCredentials: true,
    });
    if (response?.data) return response.data.data;
  } catch {
    return undefined;
  }
};
