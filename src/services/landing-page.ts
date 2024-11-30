'use server';

import { TLandingPage } from '@/components/dashboard/landing-pages-table/schema';
import { refresh } from '@/services/auth';
import { IPaginationResponse } from '@/utils/types';

const origin_url = process.env.ORIGIN_URL;
const api_url = process.env.API_URL;

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
    `${api_url}/landing-page?${queryParams.toString()}`,
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

type TAddLandingPageDto = {
  name: string;
  link: string;
  testimonial_config_id: string;
};

export async function addLandingPage({
  access_token,
  addLandingPageDto
}: {
  access_token: string;
  addLandingPageDto: TAddLandingPageDto;
}) {
  const response = await fetch(`${api_url}/landing-page`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Forwarded-Host': origin_url ? origin_url : 'http://localhost:3000',
      Authorization: `Bearer ${access_token}`
    },
    body: JSON.stringify(addLandingPageDto)
  });

  const data: TLandingPage = await response.json();

  return data;
}

type TDeleteLandingPagesDto = {
  landing_pages_id_list: Array<string>;
};

export async function deleteLandinPages({
  access_token,
  deleteLandingPagesDto
}: {
  access_token: string;
  deleteLandingPagesDto: TDeleteLandingPagesDto;
}) {
  const response = await fetch(`${api_url}/landing-page`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'X-Forwarded-Host': origin_url ? origin_url : 'http://localhost:3000',
      Authorization: `Bearer ${access_token}`
    },
    body: JSON.stringify(deleteLandingPagesDto)
  });

  const data = await response.json();

  return data;
}
