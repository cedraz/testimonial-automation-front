'use client';

import { RatingStars } from '@/components/testimonial/RatingStars';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
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
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { formDataBuilder } from '@/utils/form-data-constructor';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { getAccessToken } from '@/services/auth';
import { updateTestimonial } from '@/services/testimonial';

const isClient = typeof window !== 'undefined';

export const updateTestimonialFormSchema = z.object({
  customer_name: z.string().optional(),
  title: z.string().optional(),
  message: z.string().optional(),
  stars: z.number().int().max(5).optional(),
  image: isClient ? z.instanceof(File).optional() : z.any().optional()
});

interface IUpdateTestimonialDialogProps {
  isOpen: boolean;
  onClose: () => void;
  testimonial_id: string;
}

export function UpdateTestimonialDialog({
  isOpen,
  onClose,
  testimonial_id
}: IUpdateTestimonialDialogProps) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof updateTestimonialFormSchema>>({
    resolver: zodResolver(updateTestimonialFormSchema)
  });

  const handleSubmit = async (
    data: z.infer<typeof updateTestimonialFormSchema>
  ) => {
    if (Object.keys(form.formState.dirtyFields).length === 0) {
      toast({
        title: 'No changes detected',
        description: 'No changes were made to the testimonial.'
      });
      return;
    }

    const updateTestimonialFormData = formDataBuilder(data);

    const access_token = await getAccessToken();

    await updateTestimonial({
      access_token: access_token ? access_token : '',
      testimonial_id,
      updateTestimonialFormData
    });

    toast({
      title: 'Testimonial updated successfully'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="customer_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Textarea placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stars"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <RatingStars onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload File</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        field.onChange(file);
                      }}
                    />
                  </FormControl>
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
