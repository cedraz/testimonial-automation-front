'use server';

import { TLandingPage } from '@/components/dashboard/landing-pages-table/schema';
import { refresh } from '@/utils/auth';
import { IPaginationResponse } from '@/utils/types';

const origin_url = process.env.ORIGIN_URL;

export type TGetLandingPageProps = {
  access_token: string;
  init: number;
  limit: number;
  name?: string;
  orderByCreatedAt?: boolean;
};

export async function getLandingPages({
  access_token,
  init,
  limit,
  name,
  orderByCreatedAt
}: TGetLandingPageProps): Promise<IPaginationResponse<TLandingPage>> {
  const queryParams = new URLSearchParams();

  queryParams.append('init', init.toString());
  queryParams.append('limit', limit.toString());
  queryParams.append('name', name ? name : '');
  queryParams.append(
    'orderByCreatedAt',
    orderByCreatedAt ? orderByCreatedAt.valueOf.toString() : ''
  );

  const response = await fetch(
    `http://localhost:3333/landing-page?${queryParams.toString()}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Forwarded-Host': origin_url ? origin_url : 'http://localhost:3000',
        Authorization: `Bearer ${access_token}`
      }
    }
  );

  if (response.status === 401) {
    const newTokens = await refresh();

    if (!newTokens) {
      return { init: 0, limit: 0, total: 0, results: [] };
    }

    return getLandingPages({
      access_token: newTokens.access_token,
      init,
      limit,
      name,
      orderByCreatedAt
    });
  }

  const data: IPaginationResponse<TLandingPage> = await response.json();

  return data;
}
