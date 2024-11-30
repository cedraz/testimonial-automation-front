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

export const registerFormSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(1),
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
      company_name: ''
    }
  });

  const handleSubmit = async (values: z.infer<typeof registerFormSchema>) => {
    const response = await register(values);

    if (!response) {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: 'An error occurred while creating the account.',
        duration: 5000
      });
      return;
    }

    toast({
      title: 'Success',
      variant: 'default',
      description: 'Account created successfully.',
      duration: 5000
    });

    router.push('/login');
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="type your email..." {...field} />
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
                      <Input placeholder="type your password..." {...field} />
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
