'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const origin_url = process.env.ORIGIN_URL;

export default function Home() {
  const router = useRouter();

  const handleRequest = async () => {
    const response = await fetch('http://localhost:3333/auth/refresh', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Forwarded-Host': origin_url ? origin_url : 'http://localhost:3000'
      },
      credentials: 'include'
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <Button
        onClick={() => {
          router.push('/register');
        }}
      >
        AAAAAAAA
      </Button>
    </div>
  );
}
