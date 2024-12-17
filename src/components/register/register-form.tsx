'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter
} from '@/components/ui/card';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import TextSeparator from '@/components/ui/text-separator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FcGoogle } from 'react-icons/fc';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { register } from '@/services/auth';
import { PasswordInput } from '../ui/password-input';

export const registerFormSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(1),
  confirm_password: z.string().min(1),
  company_name: z.string().min(1)
});

export type TRegisterFormSchema = z.infer<typeof registerFormSchema>;

export default function RegisterForm() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
      company_name: '',
      confirm_password: ''
    }
  });

  const handleSubmit = async (values: z.infer<typeof registerFormSchema>) => {
    if (values.password !== values.confirm_password) {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: 'Password must be equal to confirm password',
        duration: 3000
      });

      return;
    }

    const { error } = await register(values);

    if (error) {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: error,
        duration: 5000
      });
      return;
    }

    toast({
      title: 'Success',
      variant: 'default',
      description: 'Verify email code send to email',
      duration: 5000
    });

    router.push(`/register/verify-email/${values.email}`);
  };

  return (
    <Card className="w-full max-w-sm items-center justify-center">
      <CardHeader>
        <CardTitle className="text-2xl">Register account</CardTitle>
        <CardContent className="p-0">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-col gap-3"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="company_name"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="john's company" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="john@123" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirm_password"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="john@123" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Register</Button>
            </form>
          </Form>
        </CardContent>
      </CardHeader>
      <TextSeparator text="Or continue with" />
      <CardFooter className="p-6">
        <Button className="w-full gap-2">
          <FcGoogle className="w-[16px] h-[16px]" />
          Continue with Google
        </Button>
      </CardFooter>
    </Card>
  );
}
