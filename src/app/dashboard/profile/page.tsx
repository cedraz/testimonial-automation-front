import { ApiKeyPlaceholder } from '@/components/profile/api-key-placeholder';
import { getAccessToken } from '@/services/auth';
import { api } from '@/services/requester';
import { TAdmin, TApiKey } from '@/services/types';

export default async function Profile() {
  const access_token = await getAccessToken();

  const { error: adminError, data: adminData } = await api<TAdmin>({
    method: 'GET',
    path: '/admin/profile',
    token: access_token
  });

  // const { error: apiKeyError, data: apiKeyData } = await api<TApiKey>({
  //   method: 'GET',
  //   path: '/api-key',
  //   token: access_token
  // });

  return (
    <div>
      <div>{JSON.stringify(adminError)}</div>
      <div>{JSON.stringify(adminData)}</div>
      {/* <div>{JSON.stringify(apiKeyError)}</div>
      <div>{JSON.stringify(apiKeyData)}</div>
      <ApiKeyPlaceholder apikey={apiKeyData?.apikey.key} /> */}
    </div>
  );
}
