'use server';

import { z } from 'zod';
import { loginFormSchema } from './page';
import { cookies } from 'next/headers';

const api_url = process.env.API_URL;
const origin_url = process.env.ORIGIN_URL;

export async function login(loginFormData: z.infer<typeof loginFormSchema>) {
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
