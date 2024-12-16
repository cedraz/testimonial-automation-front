'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { login } from '../../services/auth';
import { FcGoogle } from 'react-icons/fc';
import TextSeparator from '@/components/ui/text-separator';

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

export type TLoginFormSchema = z.infer<typeof loginFormSchema>;

export default function LoginPage() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const handleSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    const loginResponse = await login(values);

    if (!loginResponse) {
      toast({
        title: 'Credenciais inválidas',
        description: 'Por favor, tente novamente.',
        variant: 'destructive'
      });
    }

    router.push('/dashboard');
  };

  const googleSignInUrl = process.env.API_URL
    ? `${process.env.API_URL}/auth/google/signin`
    : 'http://localhost:3333/auth/google/signin';

  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          Logo
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;This library has saved me countless hours of work and
              helped me deliver stunning designs to my clients faster than ever
              before.&rdquo;
            </p>
            <footer className="text-sm">Sofia Davis</footer>
          </blockquote>
        </div>
      </div>
      <div className="flex h-full items-center p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center items-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Log in into your account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email and password below to sign in into your account
            </p>
          </div>
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardContent className="p-0">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="flex flex-col gap-4"
                  >
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="email@example.com" {...field} />
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
                            <Input placeholder="pass@123" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Sign in</Button>
                  </form>
                </Form>
              </CardContent>
            </CardHeader>
            <TextSeparator text="Or continue with" />
            <CardFooter className="p-6">
              <Button className="gap-1 w-full" asChild>
                <a href={googleSignInUrl}>
                  <FcGoogle className="w-[16px] h-[16px]" />
                  Continue with Google
                </a>
              </Button>
            </CardFooter>
          </Card>
          <div className="flex gap-1">
            <p className="text-center text-sm">Don&apos;t have an account?</p>
            <Link
              className="text-center hover:underline text-sm font-bold"
              href="/register"
            >
              Register
            </Link>
          </div>
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{' '}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
