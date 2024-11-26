'use client';

import { Row } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '../../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '../../ui/dropdown-menu';
import { toast as sooner } from 'sonner';

interface ITestimonialRowActionsProps<TData> {
  row: Row<TData>;
}

export function TestimonialRowActions<TData>({
  row
}: ITestimonialRowActionsProps<TData>) {
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

  return (
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
        <DropdownMenuItem onClick={handleGenerateTestimonialLink}>
          Generate link
        </DropdownMenuItem>
        <DropdownMenuItem>Change Status</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
