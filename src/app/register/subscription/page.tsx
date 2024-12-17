'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useSubscription } from '@/providers/subscription.context';
import {
  cancelSubscription,
  getAdminsCurrentPlan,
  upgradeSubscription
} from '@/services/stripe';
import { TStripeSubscriptionPlan } from '@/services/types';
import { formatDate } from '@/utils/date-utils';
import { timeLeftTo } from '@/utils/time-left';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export default function Subscription() {
  const router = useRouter();
  const { adminId } = useSubscription();
  const [subscription, setSubscription] = useState<TStripeSubscriptionPlan>({
    daysRemaining: 0,
    endDate: '',
    plan: ''
  });

  const { toast } = useToast();

  const { stripeCustomerId, stripeSubscriptionId, setStripeSubscriptionId } =
    useSubscription();

  const handleGetAdminsCurrentPlan = useCallback(async () => {
    const { error, data } = await getAdminsCurrentPlan(adminId);

    if (error) {
      console.log(error);
      return;
    }

    if (data) {
      setSubscription({
        daysRemaining: data?.daysRemaining,
        endDate: data?.endDate,
        plan: data?.plan
      });
    }
  }, [adminId]);

  useEffect(() => {
    handleGetAdminsCurrentPlan();
  }, [handleGetAdminsCurrentPlan]);

  const handleGetUpgradePlanLink = async () => {
    const { error, data } = await upgradeSubscription({
      stripe_customer_id: stripeCustomerId,
      stripe_subscription_id: stripeSubscriptionId
    });

    if (error) {
      console.error(error);
      return;
    }

    if (data) {
      router.push(data.url);
    }
  };

  const handleCancelSubscription = async () => {
    const { error, data } = await cancelSubscription();

    if (error) {
      console.error(error);
      return;
    }

    if (data) {
      setStripeSubscriptionId(data.newSubscriptionId);
    }
  };

  return (
    <section className="w-full h-screen  justify-center items-center flex flex-col">
      <h1>Choose Your Plan, Unlock Possibilities</h1>
      <div className="flex justify-center gap-3 max-w-[1200px]">
        <Card className="w-full max-w-[300px]">
          <CardHeader>Free</CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <span>R$ 0,00 / month</span>
              <span>Ends in: {formatDate(subscription.endDate)}</span>
              <span>Days left: {timeLeftTo(subscription.endDate)}</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Get started</Button>
          </CardFooter>
        </Card>
        <Card className="w-full max-w-[300px]">
          <CardHeader>Premium</CardHeader>
          <CardContent>R$ 4,99 / month</CardContent>
          <CardFooter>
            <Button onClick={handleGetUpgradePlanLink}>Get started</Button>
            <Button onClick={handleCancelSubscription}>cancel</Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
