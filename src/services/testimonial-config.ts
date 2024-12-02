'use server';

import {
  TestimonialFormat,
  TTestimonialConfig
} from '@/components/dashboard/testimonial-configs-table/schemas';
import { IPaginationResponse } from '@/utils/types';
import { revalidateTag } from 'next/cache';

const origin_url = process.env.ORIGIN_URL;
const api_url = process.env.API_URL;

export type TGetTestimonialConfigsProps = {
  access_token: string;
  init: number;
  limit: number;
  orderByCreatedAt?: boolean;
};

export async function getTestimonialConfigs({
  access_token,
  init,
  limit,
  orderByCreatedAt
}: TGetTestimonialConfigsProps) {
  const queryParams = new URLSearchParams();

  queryParams.append('init', init.toString());
  queryParams.append('limit', limit.toString());
  queryParams.append(
    'orderByCreatedAt',
    orderByCreatedAt ? orderByCreatedAt.valueOf.toString() : ''
  );

  const response = await fetch(
    `${api_url}/testimonial-config?${queryParams.toString()}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Forwarded-Host': origin_url ? origin_url : 'http://localhost:3000',
        Authorization: `Bearer ${access_token}`
      }
    }
  );

  const data: IPaginationResponse<TTestimonialConfig> = await response.json();

  return data;
}

type TUpdateTestimonialConfig = {
  access_token: string;
  testimonial_config_id: string;
  updateTestimonialConfigDto: Partial<TTestimonialConfig>;
};

export async function updateTestimonialConfig({
  access_token,
  testimonial_config_id,
  updateTestimonialConfigDto
}: TUpdateTestimonialConfig) {
  const response = await fetch(
    `${api_url}/testimonial-config/${testimonial_config_id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Forwarded-Host': origin_url ? origin_url : 'http://localhost:3000',
        Authorization: `Bearer ${access_token}`
      },
      body: JSON.stringify(updateTestimonialConfigDto)
    }
  );

  const data: TTestimonialConfig = await response.json();

  revalidateTag('landing-page');

  return data;
}

type TAddTestimonialConfigDto = {
  format: TestimonialFormat;
  expiration_limit: number;
  title_char_limit: number;
  message_char_limit: number;
};

export async function addTestimonialConfig({
  access_token,
  addTestimonialConfigDto
}: {
  access_token: string;
  addTestimonialConfigDto: TAddTestimonialConfigDto;
}) {
  const response = await fetch(`${api_url}/testimonial-config`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Forwarded-Host': origin_url ? origin_url : 'http://localhost:3000',
      Authorization: `Bearer ${access_token}`
    },
    body: JSON.stringify(addTestimonialConfigDto)
  });

  const data = await response.json();

  return data;
}

export async function deleteTestimonialConfig({
  access_token,
  testimonial_configs_id_list
}: {
  access_token: string;
  testimonial_configs_id_list: Array<string>;
}) {
  const response = await fetch(`${api_url}/testimonial-config`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'X-Forwarded-Host': origin_url ? origin_url : 'http://localhost:3000',
      Authorization: `Bearer ${access_token}`
    },
    body: JSON.stringify({ testimonial_configs_id_list })
  });

  const data = await response.json();

  return data;
}
