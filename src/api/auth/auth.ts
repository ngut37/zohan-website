import { ResponseResult } from '@api/types';

import { saveAccessTokenToken } from '@utils/storage/auth';

import { apiClient, protectedApiClient } from '../api-client';

import { OAuthType } from './types';

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

export async function register(
  body: RegisterBody,
): Promise<ResponseResult<{ accessToken: string }>>;
export async function register(
  body: OAuthRegisterBody,
): Promise<ResponseResult<{ accessToken: string }>>;
export async function register(
  body: RegisterBody | OAuthRegisterBody,
): Promise<ResponseResult<{ accessToken: string }>> {
  const response = await apiClient.request<
    ResponseResult<{ accessToken: string }>
  >({
    url: '/auth/register',
    method: 'POST',
    data: body,
    withCredentials: true,
  });

  // save accessToken
  saveAccessTokenToken(response.data.data.accessToken);

  return response.data;
}

export const emailExists = async (email: string) => {
  const response = await apiClient.request<ResponseResult<boolean>>({
    url: `/auth/email-exists/${email}`,
    method: 'GET',
  });
  if (response?.data) return response.data.data;
};

export type UpdateUserPayload = {
  email: string;
  name: string;
  phoneNumber?: string;
};

export const updateUserOrFail = async (body: UpdateUserPayload) => {
  try {
    const response = await protectedApiClient.request<
      ResponseResult<{ accessToken: string }>
    >({
      url: `/auth/update`,
      method: 'POST',
      data: body,
      withCredentials: true,
    });

    // set new accessToken
    saveAccessTokenToken(response.data.data.accessToken);

    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export type ChangePasswordPayload = {
  oldPassword: string;
  newPassword: string;
};

export const changePasswordOrFail = async (body: ChangePasswordPayload) => {
  const response = await protectedApiClient.request<ResponseResult>({
    url: `/auth/change-password`,
    method: 'POST',
    data: body,
    withCredentials: true,
  });

  return response.data;
};
