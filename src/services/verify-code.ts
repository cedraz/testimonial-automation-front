import { getAccessToken } from './auth';
import { api } from './requester';
import { TAdmin, TVerificationRequest } from './types';

export type TVerifyEmailDto = {
  identifier: string;
  token: string;
};

export async function verifyEmail({ identifier, token }: TVerifyEmailDto) {
  const access_token = await getAccessToken();

  const data = await api<TAdmin>({
    method: 'POST',
    path: '/verification-request/verify-email',
    token: access_token || '',
    body: JSON.stringify({
      identifier,
      token
    })
  });

  return data;
}

export async function resendVerificationRequest(identifier: string) {
  const access_token = await getAccessToken();

  const data = await api<TVerificationRequest>({
    method: 'POST',
    path: '/verification-request/create',
    token: access_token || '',
    body: JSON.stringify({
      identifier,
      type: 'EMAIL_VERIFICATION'
    })
  });

  return data;
}
