'use server';

import { TLandingPage } from '@/components/dashboard/landing-pages-table/schema';
import {
  TestimonialStatus,
  TTestimonial
} from '@/components/dashboard/testimonials-table/schema';
import { getAccessToken } from '@/services/auth';
import { IPaginationResponse } from '@/utils/types';
import console from 'console';

const api_url = process.env.API_URL;
const origin_url = process.env.ORIGIN_URL;

export type TGetLandingPageProps = {
  landing_page_id: string;
};

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

export async function getLandingPage({
  landing_page_id
}: TGetLandingPageProps): Promise<TLandingPage> {
  const access_token = await getAccessToken();

  const response = await fetch(`${api_url}/landing-page/${landing_page_id}`, {
    method: 'GET',
    next: { tags: ['landing-page'] },
    headers: {
      'Content-Type': 'application/json',
      'X-Forwarded-Host': origin_url ? origin_url : 'http://localhost:3000',
      Authorization: `Bearer ${access_token}`
    }
  });

  const data: TLandingPage = await response.json();

  return data;
}

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

export async function deleteTestimonials({
  access_token,
  testimonials_id_list
}: {
  access_token: string;
  testimonials_id_list: Array<string>;
}) {
  const response = await fetch(`${api_url}/testimonial`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'X-Forwarded-Host': origin_url ? origin_url : 'http://localhost:3000',
      Authorization: `Bearer ${access_token}`
    },
    body: JSON.stringify({ testimonials_id_list })
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

type TCompleteTestimonial = {
  testimonial_id: string;
  formData: FormData;
};

export async function completeTestimonial({
  testimonial_id,
  formData
}: TCompleteTestimonial) {
  try {
    const api_url = process.env.API_URL;

    const response = await fetch(
      `${api_url}/testimonial/complete/${testimonial_id}`,
      {
        method: 'POST',
        body: formData
      }
    );

    const testimonial = await response.json();

    return testimonial;
  } catch (error) {
    console.error({
      date: new Date().toISOString(),
      error
    });
  }
}
