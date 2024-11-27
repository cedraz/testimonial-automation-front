'use server';

import { IPaginationResponse } from '@/utils/types';
import { TestimonialStatus, TTestimonial } from './schema';

const origin_url = process.env.ORIGIN_URL;
const api_url = process.env.API_URL;

export type TGetTestimonialsProps = {
  access_token: string;
  landing_page_id: string;
  customer_name?: string;
  status?: TestimonialStatus;
  stars?: number;
  init: number;
  limit: number;
  orderByCreatedAt?: boolean;
};

export async function getTestimonials({
  access_token,
  landing_page_id,
  customer_name,
  status,
  stars,
  init,
  limit,
  orderByCreatedAt
}: TGetTestimonialsProps) {
  const queryParams = new URLSearchParams();

  queryParams.append('init', init.toString());
  queryParams.append('limit', limit.toString());
  queryParams.append('landing_page_id', landing_page_id);
  queryParams.append(
    'orderByCreatedAt',
    orderByCreatedAt ? orderByCreatedAt.valueOf.toString() : ''
  );

  if (customer_name) {
    queryParams.append('customer_name', customer_name);
  }
  if (status) {
    queryParams.append('status', status);
  }
  if (stars) {
    queryParams.append('stars', stars.toString());
  }

  const response = await fetch(
    `${api_url}/testimonial?${queryParams.toString()}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Forwarded-Host': origin_url ? origin_url : 'http://localhost:3000',
        Authorization: `Bearer ${access_token}`
      }
    }
  );

  const data: IPaginationResponse<TTestimonial> = await response.json();

  return data;
}

export async function addTestimonial({
  access_token,
  landing_page_id
}: {
  access_token: string;
  landing_page_id: string;
}) {
  const response = await fetch(`${api_url}/testimonial`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Forwarded-Host': origin_url ? origin_url : 'http://localhost:3000',
      Authorization: `Bearer ${access_token}`
    },
    body: JSON.stringify({ landing_page_id })
  });

  const data: TTestimonial = await response.json();

  return data;
}

export async function deleteTestimonial({
  access_token,
  testimonial_id
}: {
  access_token: string;
  testimonial_id: string;
}) {
  const response = await fetch(`${api_url}/testimonial/${testimonial_id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'X-Forwarded-Host': origin_url ? origin_url : 'http://localhost:3000',
      Authorization: `Bearer ${access_token}`
    }
  });

  const data: TTestimonial = await response.json();

  return data;
}

export async function updateTestimonial({
  testimonial_id,
  updateTestimonialFormData,
  access_token
}: {
  testimonial_id: string;
  updateTestimonialFormData: FormData;
  access_token: string;
}) {
  const response = await fetch(`${api_url}/testimonial/${testimonial_id}`, {
    method: 'PUT',
    headers: {
      'X-Forwarded-Host': origin_url ? origin_url : 'http://localhost:3000',
      Authorization: `Bearer ${access_token}`
    },
    body: updateTestimonialFormData
  });

  const data: TTestimonial = await response.json();

  return data;
}
