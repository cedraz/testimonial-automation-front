'use server';

import { cookies } from 'next/headers';

export type Auth = {
  access_token: string;
  refresh_token: string;
  access_token_expires_in: Date;
  refresh_token_expires_in: Date;
};

const getHeaders = () => ({
  Cookie: cookies().toString()
});

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
