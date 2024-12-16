'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot
} from '../ui/input-otp';
import { resendVerificationRequest, verifyEmail } from '@/services/verify-code';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useSubscription } from '@/providers/subscription.context';

export function VerifyEmailOTPInput({ email }: { email: string }) {
  const [otp, setOtp] = useState<string>('');
  const { toast } = useToast();
  const router = useRouter();

  const { setAdminId, setStripeCustomerId, setStripeSubscriptionId } =
    useSubscription();

  const handleSubmit = async () => {
    if (!email) {
      router.push('/register');
    }

    if (!otp) {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: 'Invalid code',
        duration: 3000
      });

      return;
    }

    const { error, data } = await verifyEmail({
      identifier: email,
      token: otp
    });

    if (error) {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: error,
        duration: 3000
      });

      return;
    }

    if (data) {
      setAdminId(data.id);
      setStripeCustomerId(data.stripe_customer_id);
      setStripeSubscriptionId(data.stripe_subscription_id);
    }

    toast({
      title: 'Success',
      variant: 'default',
      description: 'Email verified successfully',
      duration: 3000
    });

    router.push('/register/subscription');
  };

  const handleResendVerificationRequest = async () => {
    const { error } = await resendVerificationRequest(email);

    if (error) {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: error,
        duration: 3000
      });

      return;
    }

    toast({
      title: 'Success',
      variant: 'default',
      description: 'Code resent to email',
      duration: 3000
    });
  };

  return (
    <Card>
      <CardHeader></CardHeader>
      <CardContent>
        <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <div className="flex justify-between">
          <Button onClick={handleSubmit}>submit</Button>
          <Button variant="outline" onClick={handleResendVerificationRequest}>
            Resend code
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
