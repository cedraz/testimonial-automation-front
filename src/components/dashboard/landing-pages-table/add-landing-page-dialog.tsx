'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { TTestimonialConfig } from '../testimonial-configs-table/schemas';
import { getTestimonialConfigs } from '@/services/testimonial-config';
import { getAccessToken } from '@/services/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addLandingPage } from '@/services/landing-page';
import { toast as sonner } from 'sonner';
import { useToast } from '@/hooks/use-toast';

export interface IAddTestimonialDialogProps {
  queryName: string;
}

export const addLandingPageFormSchema = z.object({
  name: z.string(),
  link: z.string().url(),
  testimonial_config_id: z.string().uuid()
});

export function AddLandingPageDialog({
  queryName
}: IAddTestimonialDialogProps) {
  const [testimonialConfigs, setTestimonialConfigs] = useState<
    TTestimonialConfig[]
  >([]);
  const { toast } = useToast();

  const handleGetTestimonialConfigs = async () => {
    const access_token = await getAccessToken();

    const data = await getTestimonialConfigs({
      access_token: access_token || '',
      init: 0,
      limit: 100
    });

    setTestimonialConfigs(data.results);
  };

  useEffect(() => {
    handleGetTestimonialConfigs();
  }, []);

  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: async (data: z.infer<typeof addLandingPageFormSchema>) => {
      const access_token = await getAccessToken();

      await addLandingPage({
        access_token: access_token || '',
        addLandingPageDto: data
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryName] });
      sonner('Success', {
        description: 'Testimonial Config created successfully.'
      });
    },
    onError: (e) => {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: e.message.toString()
      });
    }
  });

  const form = useForm<z.infer<typeof addLandingPageFormSchema>>({
    resolver: zodResolver(addLandingPageFormSchema),
    defaultValues: {
      name: '',
      link: '',
      testimonial_config_id: ''
    }
  });

  const handleSubmit = async (
    data: z.infer<typeof addLandingPageFormSchema>
  ) => {
    addMutation.mutate(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-8 flex gap-1">
          <PlusCircle className="h-4" />
          <span className="hidden md:flex">Add Landing Page</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Landing Page</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when done.
          </DialogDescription>
        </DialogHeader>
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
                    <Input
                      placeholder="type the name of the landing page"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="paste the landing page url"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="testimonial_config_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={testimonialConfigs[0].name} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {testimonialConfigs.map((testimonialConfig) => (
                        <SelectItem
                          key={testimonialConfig.id}
                          value={testimonialConfig.id}
                        >
                          {testimonialConfig.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Register</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
