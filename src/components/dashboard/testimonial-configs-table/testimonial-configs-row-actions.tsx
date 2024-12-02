'use client';

import { Row } from '@tanstack/react-table';
import { MoreHorizontal, Pencil, Trash } from 'lucide-react';
import { Button } from '../../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { UpdateTestimonialConfigDialog } from '../testimonial-config-tab/update-testimonial-config-dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getAccessToken } from '@/services/auth';
import { toast as sonner } from 'sonner';
import { deleteTestimonialConfig } from '@/services/testimonial-config';

interface ITestimonialConfigsRowActionsProps<TData> {
  row: Row<TData>;
}

export function TestimonialConfigsRowActions<TData>({
  row
}: ITestimonialConfigsRowActionsProps<TData>) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isWarningDialogOpen, setIsWarningDialogOpen] = useState(false);

  const queryClient = useQueryClient();

  const deleteTestimonialConfigMutation = useMutation({
    mutationFn: async () => {
      const testimonial_config_id: string = row.getValue('id');
      const access_token = await getAccessToken();

      await deleteTestimonialConfig({
        access_token: access_token || '',
        testimonial_configs_id_list: [testimonial_config_id]
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials-configs'] });
      sonner('Success', {
        description: 'Testimonial Config deleted successfully.'
      });
    },
    onError: () => {
      sonner('Error', {
        description: 'Failed to delete testimonial config.'
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
            className="flex gap-2 cursor-pointer"
            onClick={() => setIsDialogOpen(true)}
          >
            <Pencil size={14} /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setIsWarningDialogOpen(true)}
            className="flex justify-between cursor-pointer"
          >
            Delete <Trash size={14} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <UpdateTestimonialConfigDialog
        expiration_limit={row.getValue('expiration_limit')}
        id={row.getValue('id')}
        title_char_limit={row.getValue('title_char_limit')}
        name={row.getValue('name')}
        message_char_limit={row.getValue('message_char_limit')}
        format={row.getValue('format')}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
      <AlertDialog
        open={isWarningDialogOpen}
        onOpenChange={() => setIsWarningDialogOpen(false)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              testimonial config and all the landind pages that use this
              specific testimonial config.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteTestimonialConfigMutation.mutate()}
              className="bg-red-500 hover:bg-red-700 flex gap-2"
            >
              Delete <Trash size={15} />
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
