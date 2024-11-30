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
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { getAccessToken } from '@/services/auth';
import {
  TestimonialFormat,
  TTestimonialConfig
} from '../testimonial-configs-table/schemas';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Pencil } from 'lucide-react';
import { updateTestimonialConfig } from '@/services/testimonial-config';
import { toast as sonner } from 'sonner';

export const updateTestimonialConfigFormSchema = z.object({
  expiration_limit: z.coerce.number().optional(),
  title_char_limit: z.coerce.number().optional(),
  message_char_limit: z.coerce.number().optional(),
  format: z.nativeEnum(TestimonialFormat).optional()
});

interface IUpdateTestimonialConfigDialogProps {
  testimonial_config: TTestimonialConfig;
}

export function UpdateTestimonialConfigDialog({
  testimonial_config
}: IUpdateTestimonialConfigDialogProps) {
  const form = useForm<z.infer<typeof updateTestimonialConfigFormSchema>>({
    resolver: zodResolver(updateTestimonialConfigFormSchema),
    defaultValues: {
      expiration_limit: testimonial_config.expiration_limit,
      title_char_limit: testimonial_config.title_char_limit,
      message_char_limit: testimonial_config.message_char_limit,
      format: testimonial_config.format
    }
  });

  const handleSubmit = async (
    data: z.infer<typeof updateTestimonialConfigFormSchema>
  ) => {
    if (Object.keys(form.formState.dirtyFields).length === 0) {
      sonner('Error', {
        description: 'No changes detected'
      });
      return;
    }

    const access_token = await getAccessToken();

    updateTestimonialConfig({
      access_token: access_token || '',
      testimonial_config_id: testimonial_config.id,
      updateTestimonialConfigDto: data
    });

    sonner('Success', {
      description: 'Testimonial Config updated successfully'
    });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Pencil />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Testimonial Config</DialogTitle>
          <DialogDescription>
            Make changes to your testimonial config here. Click save when youre
            done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="expiration_limit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiration Limit</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder={testimonial_config.expiration_limit.toString()}
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
                      placeholder={testimonial_config.title_char_limit.toString()}
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
                      placeholder={testimonial_config.message_char_limit.toString()}
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
                    defaultValue={testimonial_config.format}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue
                          placeholder={
                            testimonial_config.format.charAt(0) +
                            testimonial_config.format.slice(1).toLowerCase()
                          }
                        />
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
