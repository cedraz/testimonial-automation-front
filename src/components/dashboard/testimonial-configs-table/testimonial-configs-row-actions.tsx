'use client';

import { Row } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '../../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '../../ui/dropdown-menu';
interface ITestimonialConfigsRowActionsProps<TData> {
  row: Row<TData>;
}

export function TestimonialConfigsRowActions<TData>({
  row
}: ITestimonialConfigsRowActionsProps<TData>) {
  console.log(row);
  // const [isDialogOpen, setIsDialogOpen] = useState(false);

  // const handleGenerateTestimonialConfigsLink = () => {
  //   const domain = window.location.origin;
  //   navigator.clipboard.writeText(
  //     `${domain}/testimonial/${row.getValue('id')}`
  //   );
  //   sooner('Link copied to clipboard', {
  //     description:
  //       'Share this link with your customer to collect their testimonial.',
  //     action: {
  //       label: 'Undo',
  //       onClick: () => {}
  //     }
  //   });
  // };

  // const deleteTestimonialMutation = useMutation({
  //   mutationFn: async () => {
  //     const testimonial_id: string = row.getValue('id');
  //     const access_token = await getAccessToken();
  //     await deleteTestimonial({
  //       testimonial_id,
  //       access_token: access_token || ''
  //     });
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['testimonials'] });
  //     sooner('Success', {
  //       description: 'Testimonial deleted successfully.'
  //     });
  //   },
  //   onError: () => {
  //     sooner('Error', {
  //       description: 'Failed to delete testimonial.'
  //     });
  //   }
  // });

  // const handleUpdateStatus = useMutation({
  //   mutationFn: async (status: TestimonialStatus) => {
  //     const testimonial_id: string = row.getValue('id');
  //     const access_token = await getAccessToken();

  //     const updateTestimonialFormData = formDataBuilder({ status });

  //     await updateTestimonial({
  //       testimonial_id,
  //       access_token: access_token || '',
  //       updateTestimonialFormData
  //     });
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['testimonials'] });
  //     sooner('Success', {
  //       description: 'Testimonial status updated successfully.'
  //     });
  //   },
  //   onError: () => {
  //     sooner('Error', {
  //       description: 'Failed to update testimonial status.'
  //     });
  //   }
  // });

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
          teste
        </DropdownMenuContent>
      </DropdownMenu>
      {/* <UpdateTestimonialDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        testimonial_id={row.getValue('id')}
      /> */}
    </>
  );
}
