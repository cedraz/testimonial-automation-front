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
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export interface IAddTestimonialDialogProps {
  queryName: string;
}

export const createTestimonialFormSchema = z.object({
  landing_page_id: z.string().uuid()
});

export function AddLandingPageDialog({
  queryName
}: IAddTestimonialDialogProps) {
  // const query = useQuery(queryName);

  // const addItemMutation = useMutation()
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof createTestimonialFormSchema>>({
    resolver: zodResolver(createTestimonialFormSchema),
    defaultValues: {
      landing_page_id: ''
    }
  });

  const handleSubmit = async (
    values: z.infer<typeof createTestimonialFormSchema>
  ) => {
    console.log(values);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-8 flex gap-1">
          <PlusCircle className="h-4" />
          Add
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
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
              name="landing_page_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Landing Page Id</FormLabel>
                  <FormControl>
                    <Input placeholder="type your email..." {...field} />
                  </FormControl>
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
