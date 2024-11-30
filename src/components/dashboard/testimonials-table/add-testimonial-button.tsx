'use client';

import { Button } from '@/components/ui/button';
import { getAccessToken } from '@/services/auth';
import { addTestimonial } from '@/services/testimonial';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PlusCircle } from 'lucide-react';
import { toast as sooner } from 'sonner';
export interface IAddTestimonialButtonProps {
  queryName: string;
  landing_page_id: string;
}

export function AddTestimonialButton({
  queryName,
  landing_page_id
}: IAddTestimonialButtonProps) {
  const queryClient = useQueryClient();

  const addTestimonialMutation = useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryName] });
      sooner('Success', {
        description: 'Testimonial added successfully.'
      });
    },
    mutationFn: async () => {
      const acess_token = await getAccessToken();
      await addTestimonial({
        access_token: acess_token || '',
        landing_page_id
      });
    },
    onError: () => {
      sooner('Error', {
        description: 'Failed to add testimonial.'
      });
    }
  });

  return (
    <Button
      className="h-8 flex gap-1"
      variant="outline"
      onClick={() => addTestimonialMutation.mutate()}
    >
      <PlusCircle size={18} />
      <span className="hidden md:flex">Add Testimonial</span>
    </Button>
  );
}
