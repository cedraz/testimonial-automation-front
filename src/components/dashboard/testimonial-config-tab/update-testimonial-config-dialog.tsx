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
import { TestimonialFormat } from '../testimonial-configs-table/schemas';
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
  name: z.string().optional(),
  expiration_limit: z.coerce.number().optional(),
  title_char_limit: z.coerce.number().optional(),
  message_char_limit: z.coerce.number().optional(),
  format: z.nativeEnum(TestimonialFormat).optional()
});

interface IUpdateTestimonialConfigDialogProps {
  id: string;
  name: string;
  expiration_limit: number;
  title_char_limit: number;
  message_char_limit: number;
  format: TestimonialFormat;
  isOpen?: boolean;
  onClose?: () => void;
}

export function UpdateTestimonialConfigDialog({
  id,
  name,
  expiration_limit,
  title_char_limit,
  message_char_limit,
  format,
  isOpen,
  onClose
}: IUpdateTestimonialConfigDialogProps) {
  const form = useForm<z.infer<typeof updateTestimonialConfigFormSchema>>({
    resolver: zodResolver(updateTestimonialConfigFormSchema),
    defaultValues: {
      expiration_limit: expiration_limit,
      title_char_limit: title_char_limit,
      message_char_limit: message_char_limit,
      format: format
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
      testimonial_config_id: id,
      updateTestimonialConfigDto: data
    });

    sonner('Success', {
      description: 'Testimonial Config updated successfully'
    });
  };

  return (
    <Dialog
      {...(isOpen !== undefined && { open: isOpen })}
      {...(onClose && { onOpenChange: onClose })}
    >
      {!(isOpen !== undefined) && (
        <DialogTrigger>
          <Pencil />
        </DialogTrigger>
      )}
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder={name.toString()}
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
                      placeholder={expiration_limit.toString()}
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
                      placeholder={title_char_limit.toString()}
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
                      placeholder={message_char_limit.toString()}
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
                  <Select onValueChange={field.onChange} defaultValue={format}>
                    <FormControl>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue
                          placeholder={
                            format.charAt(0) + format.slice(1).toLowerCase()
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
