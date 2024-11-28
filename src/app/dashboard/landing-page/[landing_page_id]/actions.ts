'use server';

import { TLandingPage } from '@/components/dashboard/landing-pages-table/schema';
import { getAccessToken } from '@/utils/auth';

const api_url = process.env.API_URL;
const origin_url = process.env.ORIGIN_URL;

export type TGetLandingPageProps = {
  landing_page_id: string;
};

export async function getLandingPage({
  landing_page_id
}: TGetLandingPageProps): Promise<TLandingPage> {
  const access_token = await getAccessToken();

  const response = await fetch(`${api_url}/landing-page/${landing_page_id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Forwarded-Host': origin_url ? origin_url : 'http://localhost:3000',
      Authorization: `Bearer ${access_token}`
    }
  });

  const data: TLandingPage = await response.json();

  return data;
}
