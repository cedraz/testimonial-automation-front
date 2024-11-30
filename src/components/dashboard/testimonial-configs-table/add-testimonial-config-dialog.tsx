'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
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
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { TestimonialFormat } from '../testimonial-configs-table/schemas';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { PlusCircle } from 'lucide-react';
import { toast as sonner } from 'sonner';
import { getAccessToken } from '@/services/auth';
import { addTestimonialConfig } from '@/services/testimonial-config';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const addTestimonialConfigFormSchema = z.object({
  name: z.string(),
  expiration_limit: z.coerce.number().min(1),
  title_char_limit: z.coerce.number().min(1),
  message_char_limit: z.coerce.number().min(1),
  format: z.nativeEnum(TestimonialFormat)
});

interface IAddTestimonialConfigDialogProps {
  queryName: string;
}

export function AddTestimonialConfigDialog({
  queryName
}: IAddTestimonialConfigDialogProps) {
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof addTestimonialConfigFormSchema>>({
    resolver: zodResolver(addTestimonialConfigFormSchema),
    defaultValues: {
      name: '',
      expiration_limit: 0,
      title_char_limit: 0,
      message_char_limit: 0,
      format: TestimonialFormat.SLIDER
    }
  });

  const addMutation = useMutation({
    mutationFn: async (
      data: z.infer<typeof addTestimonialConfigFormSchema>
    ) => {
      const access_token = await getAccessToken();

      await addTestimonialConfig({
        access_token: access_token || '',
        addTestimonialConfigDto: data
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryName] });
      sonner('Success', {
        description: 'Testimonial Config created successfully'
      });
    }
  });

  const handleSubmit = async (
    data: z.infer<typeof addTestimonialConfigFormSchema>
  ) => {
    addMutation.mutate(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-8 flex gap-1" variant="outline">
          <PlusCircle />
          <span className="hidden md:flex">Add Testimonial Config</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Testimonial Config</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="type the name of the testimonial config"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expiration_limit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiration Limit</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="expiration limit"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title_char_limit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title Char Limit</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="title char limit"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message_char_limit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message Char Limit</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="message char limit"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="format"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={TestimonialFormat.SLIDER}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={TestimonialFormat.GRID}>
                        Grid
                      </SelectItem>
                      <SelectItem value={TestimonialFormat.SLIDER}>
                        Slider
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
