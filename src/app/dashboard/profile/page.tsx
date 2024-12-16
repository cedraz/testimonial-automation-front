import { getAccessToken } from '@/services/auth';
import { api } from '@/services/requester';
import { TAdmin } from '@/services/types';

export default async function Profile() {
  const access_token = await getAccessToken();

  const { error, data } = await api<TAdmin>({
    method: 'GET',
    path: '/admin/profile',
    token: access_token
  });

  return (
    <div>
      AAAAAAAAa
      <div>{JSON.stringify(error)}</div>
      <div>{JSON.stringify(data)}</div>
    </div>
  );
}
