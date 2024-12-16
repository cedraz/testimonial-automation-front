import { URLSearchParams } from 'url';
import { BadRequestErrorResponseType, ErrorResponse } from './types';

const origin_url = process.env.ORIGIN_URL;
const api_url = process.env.API_URL;

export type ApiProps = {
  path: string;
  method: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE';
  queryParams?: URLSearchParams;
  body?: string | FormData;
  headers?: Record<string, unknown>;
  token?: string;
};

export type ApiResponse<TData> =
  | { data: TData; error?: undefined }
  | { error: string; data?: undefined };

export async function api<TData>({
  method,
  path,
  body,
  headers,
  queryParams,
  token
}: ApiProps): Promise<ApiResponse<TData>> {
  try {
    const url = new URL(path, api_url);
    if (queryParams) {
      url.search = queryParams.toString();
    }

    const response = await fetch(url.toString(), {
      method,
      headers: {
        'Content-Type':
          body instanceof FormData ? 'multipart/form-data' : 'application/json',
        'X-Forwarded-Host': origin_url || 'http://localhost:3000',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...headers
      },
      body
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 400) {
        const errorData: BadRequestErrorResponseType = data;
        return { error: errorData.message[0].message };
      }

      const errorData: ErrorResponse = data;
      console.log(data);
      return { error: errorData.message || 'Failed to fetch' };
    }

    return { data: data as TData };
  } catch (error) {
    console.error(error);
    return { error: 'An unexpected error occurred' };
  }
}
