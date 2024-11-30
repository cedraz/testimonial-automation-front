'use client';
import { logout } from '@/services/auth';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

export function LogOutButton() {
  const router = useRouter();

  const handleLogOut = async () => {
    await logout();
    router.push('/login');
  };

  return <Button onClick={handleLogOut}>Logout</Button>;
}
