'use client';

import { Row } from '@tanstack/react-table';
import { Link, MoreHorizontal, Pencil, Trash } from 'lucide-react';
import { Button } from '../../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '../../ui/dropdown-menu';
import { toast as sooner } from 'sonner';
import { deleteTestimonial, updateTestimonial } from './actions';
import { getAccessToken } from '@/utils/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TestimonialStatus } from './schema';
import { UpdateTestimonialDialog } from './update-testimonial-dialog';
import { useState } from 'react';
import { formDataBuilder } from '@/utils/form-data-constructor';
interface ITestimonialRowActionsProps<TData> {
  row: Row<TData>;
}

export function TestimonialRowActions<TData>({
  row
}: ITestimonialRowActionsProps<TData>) {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleGenerateTestimonialLink = () => {
    const domain = window.location.origin;
    navigator.clipboard.writeText(
      `${domain}/testimonial/${row.getValue('id')}`
    );
    sooner('Link copied to clipboard', {
      description:
        'Share this link with your customer to collect their testimonial.',
      action: {
        label: 'Undo',
        onClick: () => {}
      }
    });
  };

  const deleteTestimonialMutation = useMutation({
    mutationFn: async () => {
      const testimonial_id: string = row.getValue('id');
      const access_token = await getAccessToken();
      await deleteTestimonial({
        testimonial_id,
        access_token: access_token || ''
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      sooner('Success', {
        description: 'Testimonial deleted successfully.'
      });
    },
    onError: () => {
      sooner('Error', {
        description: 'Failed to delete testimonial.'
      });
    }
  });

  const handleUpdateStatus = useMutation({
    mutationFn: async (status: TestimonialStatus) => {
      const testimonial_id: string = row.getValue('id');
      const access_token = await getAccessToken();

      const updateTestimonialFormData = formDataBuilder({ status });

      await updateTestimonial({
        testimonial_id,
        access_token: access_token || '',
        updateTestimonialFormData
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      sooner('Success', {
        description: 'Testimonial status updated successfully.'
      });
    },
    onError: () => {
      sooner('Error', {
        description: 'Failed to update testimonial status.'
      });
    }
  });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <MoreHorizontal />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem
            className="cursor-pointer flex gap-2"
            onClick={handleGenerateTestimonialLink}
          >
            <Link size={14} />
            Generate link
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer flex gap-2"
            onClick={() => setIsDialogOpen(true)}
          >
            <Pencil size={14} />
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger side="left">
              Update status
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup value={row.getValue('status')}>
                {Object.values(TestimonialStatus).map((status) => (
                  <DropdownMenuRadioItem
                    key={status}
                    value={status}
                    onClick={() => handleUpdateStatus.mutate(status)}
                    className="cursor-pointer"
                  >
                    {status.charAt(0) + status.toLowerCase().slice(1)}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex w-full justify-between cursor-pointer"
            onClick={() => deleteTestimonialMutation.mutate()}
          >
            Delete
            <Trash size={14} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <UpdateTestimonialDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        testimonial_id={row.getValue('id')}
      />
    </>
  );
}
