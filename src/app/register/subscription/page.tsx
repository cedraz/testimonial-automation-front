'use client';

import { useSubscription } from '@/providers/subscription.context';

export default function Subscription() {
  const { adminId } = useSubscription();

  return <div>adminId: {adminId}</div>;
}
