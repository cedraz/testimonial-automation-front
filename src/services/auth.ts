'use server';

import { cookies } from 'next/headers';
import { TLoginFormSchema } from '../app/login/page';
import { TRegisterFormSchema } from '@/components/register/register-form';
import { api } from './requester';
import { TAdmin } from './types';

export type Auth = {
  access_token: string;
  refresh_token: string;
  access_token_expires_in: Date;
  refresh_token_expires_in: Date;
};

const getHeaders = () => ({
  Cookie: cookies().toString()
});

const api_url = process.env.API_URL;
const origin_url = process.env.ORIGIN_URL;

export async function login(loginFormData: TLoginFormSchema) {
  const cookieStore = cookies();

  const response = await fetch(`${api_url}/auth/login`, {
    method: 'POST',
    body: JSON.stringify(loginFormData),
    headers: {
      'Content-Type': 'application/json',
      'X-Forwarded-Host': origin_url ? origin_url : 'localhost:3000'
    }
  });

  const data = await response.json();

  const accessTokenExpires = new Date(data.access_token_expires_in);
  const refreshTokenExpires = new Date(data.refresh_token_expires_in);

  if (!response.ok) {
    return false;
  }

  cookieStore.set({
    name: 'access_token',
    value: data.access_token,
    path: '/',
    httpOnly: true,
    secure: true,
    expires: accessTokenExpires
  });
  cookieStore.set({
    name: 'refresh_token',
    value: data.refresh_token,
    path: '/',
    httpOnly: true,
    secure: true,
    expires: refreshTokenExpires
  });

  return data;
}

export async function register(formData: TRegisterFormSchema) {
  const response = await api<TAdmin>({
    path: '/admin',
    method: 'POST',
    body: JSON.stringify(formData)
  });

  return response;
}

export async function auth(): Promise<Auth | false> {
  'use server';
  const cookieStore = cookies();

  const access_token = cookieStore.get('access_token')?.value;
  const refresh_token = cookieStore.get('refresh_token')?.value;

  if (!access_token || !refresh_token) {
    const data = await refresh();

    if (!data) {
      return false;
    }

    cookieStore.set({
      name: 'access_token',
      value: data.access_token,
      path: '/',
      httpOnly: true,
      secure: true,
      expires: new Date(data.access_token_expires_in)
    });

    cookieStore.set({
      name: 'refresh_token',
      value: data.refresh_token,
      path: '/',
      httpOnly: true,
      secure: true,
      expires: new Date(data.refresh_token_expires_in)
    });

    return data;
  }

  return {
    access_token,
    refresh_token,
    access_token_expires_in: new Date(),
    refresh_token_expires_in: new Date()
  };
}

export async function refresh(): Promise<Auth | false> {
  'use server';

  const cookieStore = cookies();

  if (!cookieStore.get('refresh_token')) {
    return false;
  }

  const response = await fetch(`${process.env.API_URL}/auth/refresh`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Forwarded-Host': process.env.ORIGIN_URL || 'localhost:3000',
      ...getHeaders()
    },
    credentials: 'include'
  });

  const data: Auth = await response.json();

  if (!response.ok) {
    return false;
  }

  return data;
}

export async function getAccessToken() {
  const cookieStore = cookies();

  return cookieStore.get('access_token')?.value;
}

export async function logout() {
  const cookieStore = cookies();

  cookieStore.delete('access_token');
  cookieStore.delete('refresh_token');
}

type TSetCookiesFromExternalProviderDto = {
  access_token: string;
  refresh_token: string;
};

export async function setCookiesFromExternalProvider({
  access_token,
  refresh_token
}: TSetCookiesFromExternalProviderDto) {
  const accessTokenExpires = new Date();
  accessTokenExpires.setTime(accessTokenExpires.getTime() + 2 * 60 * 60 * 1000);

  const refreshTokenExpires = new Date();
  refreshTokenExpires.setTime(
    refreshTokenExpires.getTime() + 7 * 24 * 60 * 60 * 1000
  );

  const cookieStore = cookies();

  cookieStore.set({
    name: 'access_token',
    value: access_token,
    path: '/',
    httpOnly: true,
    secure: true,
    expires: accessTokenExpires
  });

  cookieStore.set({
    name: 'refresh_token',
    value: refresh_token,
    path: '/',
    httpOnly: true,
    secure: true,
    expires: refreshTokenExpires
  });

  return {
    access_token: cookieStore.get('access_token'),
    refresh_token: cookieStore.get('refresh_token')
  };
}
