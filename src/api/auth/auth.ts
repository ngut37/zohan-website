import { apiClient } from '../api-client';

import { Gender, Role, User } from './types';

type LoginBody = {
  email: string;
  password: string;
};

type LoginResult = {
  success: boolean;
};

export const login = async (body: LoginBody) => {
  const response = await apiClient.request<LoginResult>({
    url: '/auth/login',
    method: 'POST',
    data: body,
    withCredentials: true,
  });

  return response.data;
};

type RegisterBody = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthYear?: number;
  gender?: Gender;
  roles: Role[];
};

type RegisterResult = {
  success: boolean;
};

export const logout = async () => {
  const response = await apiClient.request<RegisterResult>({
    url: '/auth/logout',
    method: 'POST',
    withCredentials: true,
  });
  return response.data;
};

export const register = async (body: RegisterBody) => {
  const response = await apiClient.request<RegisterResult>({
    url: '/auth/register',
    method: 'POST',
    data: body,
    withCredentials: true,
  });
  return response.data;
};

type MeResult = {
  success: boolean;
  data: {
    accessToken: string;
    user: User;
  };
};

export const me = async () => {
  try {
    const response = await apiClient.request<MeResult>({
      url: '/auth/me',
      method: 'GET',
      withCredentials: true,
    });
    if (response?.data) return response.data.data;
  } catch {
    return undefined;
  }
};
