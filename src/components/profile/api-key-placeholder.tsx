'use client';

import { api } from '@/services/requester';
import { Button } from '../ui/button';
import { TApiKey } from '@/services/types';
import { getAccessToken } from '@/services/auth';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

export function ApiKeyPlaceholder({ apikey }: { apikey: string | undefined }) {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState<string | undefined>(apikey);

  const handleGenerateNewApiKey = async () => {
    const access_token = await getAccessToken();

    const { error, data } = await api<TApiKey>({
      method: 'PATCH',
      token: access_token,
      path: '/api-key'
    });

    if (error) {
      console.log('AAAAAAAAAAAAAAAA');
      toast({
        title: 'Error',
        description: error,
        variant: 'destructive'
      });

      return;
    }

    if (data) {
      setApiKey(data.apikey.key);
    }
  };

  return (
    <div>
      <span>Sua key: {apiKey}</span>
      <Button onClick={handleGenerateNewApiKey}>Generate new api key</Button>
    </div>
  );
}
