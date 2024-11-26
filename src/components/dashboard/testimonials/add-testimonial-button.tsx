'use client';

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { getAccessToken } from '@/utils/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PlusCircle } from 'lucide-react';
import { addTestimonial } from './actions';
export interface IAddTestimonialDialogProps {
  queryName: string;
  landing_page_id: string;
}

export function AddTestimonialButton({
  queryName,
  landing_page_id
}: IAddTestimonialDialogProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const addTestimonialMutation = useMutation({
    onSuccess: () => {
      // Invalidate the query and refetch the data
      queryClient.invalidateQueries({ queryKey: [queryName] });
      toast({
        title: 'Success',
        description: 'Testimonial added successfully'
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
      toast({
        title: 'Error',
        description: 'Failed to add testimonial',
        variant: 'destructive'
      });
    }
  });

  return (
    <Button
      className="h-8 flex gap-1"
      onClick={() => addTestimonialMutation.mutate()}
    >
      <PlusCircle size={16} />
      Add Testimonial
    </Button>
  );
}
