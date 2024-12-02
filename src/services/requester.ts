import { URLSearchParams } from 'url';
import { BadRequestErrorResponseType, ErrorResponse } from './types';

export type ApiProps = {
  url: string;
  method: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE';
  queryParams?: URLSearchParams;
  body?: string | FormData;
  headers?: Record<string, unknown>;
  token?: string;
};

const origin_url = process.env.ORIGIN_URL;
const api_url = process.env.API_URL;

export async function api({
  method,
  url,
  body,
  headers,
  queryParams,
  token
}: ApiProps) {
  try {
    const response = await fetch(
      `${api_url}${url}?${queryParams?.toString()}`,
      {
        method,
        body,
        headers: {
          ...headers,
          ...(body instanceof FormData
            ? { 'Content-Type': 'multipart/form-data' }
            : { 'Content-Type': 'application/json' }),
          'X-Forwarded-Host': origin_url ? origin_url : 'http://localhost:3000',
          ...(token && { Authorization: `Bearer ${token}` })
        }
      }
    );

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 400) {
        const errorData: BadRequestErrorResponseType = data;
        throw new Error(errorData.message[0].message);
      }

      const errorData: ErrorResponse = data;

      throw new Error(errorData.message);
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
