'use server';

import { getAccessToken } from './auth';
import { api } from './requester';
import { TStripeSubscriptionPlan } from './types';

export async function getAdminsCurrentPlan(admin_id: string) {
  const access_token = await getAccessToken();

  const response = await api<TStripeSubscriptionPlan>({
    method: 'GET',
    path: `/stripe/plan/${admin_id}`,
    token: access_token
  });

  return response;
}

export type TUpgradeSubscription = {
  stripe_customer_id: string;
  stripe_subscription_id: string;
};

export async function upgradeSubscription({
  stripe_customer_id,
  stripe_subscription_id
}: TUpgradeSubscription) {
  const access_token = await getAccessToken();

  const response = await api<{ url: string }>({
    method: 'POST',
    path: `/stripe/checkout-session`,
    token: access_token,
    body: JSON.stringify({
      stripe_customer_id,
      stripe_subscription_id
    })
  });

  return response;
}

export type TCancelSubscriptionResponse = {
  oldSubscriptionId: string;
  newSubscriptionId: string;
  status: string;
};

export async function cancelSubscription() {
  const access_token = await getAccessToken();

  const response = await api<TCancelSubscriptionResponse>({
    method: 'PATCH',
    path: `/stripe/cancel-subscription`,
    token: access_token
  });

  return response;
}
