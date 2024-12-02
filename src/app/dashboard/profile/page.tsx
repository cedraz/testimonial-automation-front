import { getAccessToken } from '@/services/auth';
import { api } from '@/services/requester';

export default async function Profile() {
  const access_token = await getAccessToken();

  const data = await api({
    method: 'GET',
    url: '/admin/profile',
    token: access_token
  });

  return (
    <div>
      AAAAAAAAa
      <div>{JSON.stringify(data)}</div>
    </div>
  );
}
