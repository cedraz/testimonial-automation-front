'use client';

import { TooltipProvider } from '@/components/ui/tooltip';
import { SubscriptionProvider } from '@/providers/subscription.context';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SubscriptionProvider>
      <TooltipProvider>{children}</TooltipProvider>
    </SubscriptionProvider>
  );
}
