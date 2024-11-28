'use client';

import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '../../data-tables/data-table-column-header';
import { TTestimonial } from './schema';
import { TestimonialRowActions } from '@/components/dashboard/testimonials-table/testimonial-row-actions';

import { FilterFn } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const filterNullValues: FilterFn<TTestimonial> = (
  row,
  columnId,
  filterValue
) => {
  const rowValue = row.getValue(columnId);
  return (
    rowValue !== null &&
    rowValue !== undefined &&
    rowValue.toString().toLowerCase().includes(filterValue.toLowerCase())
  );
};

export const columns: ColumnDef<TTestimonial>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Id" />
    ),
    enableSorting: false,
    enableHiding: true
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => (
      <span className="max-w-[500px] truncate font-medium">
        {row.getValue('status')}
      </span>
    )
  },
  {
    accessorKey: 'customer_name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer Name" />
    ),
    cell: ({ row }) => (
      <span className="max-w-[500px] truncate font-medium">
        {row.getValue('customer_name')}
      </span>
    ),
    filterFn: filterNullValues
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => (
      <span className="max-w-[500px] truncate font-medium">
        {row.getValue('title')}
      </span>
    )
  },
  {
    accessorKey: 'message',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Message" />
    ),
    cell: ({ row }) => <span className="">{row.getValue('message')}</span>
  },
  {
    accessorKey: 'image',
    header: () => (
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-8 data-[state=open]:bg-accent"
      >
        <span>Image</span>
      </Button>
    ),
    cell: ({ row }) => (
      <>
        {row.getValue('image') ? (
          <div className="relative h-[50px] rounded-full">
            <Image
              src={row.getValue('image')}
              alt="Testimonial Image"
              fill
              className="object-cover rounded-full"
            />
          </div>
        ) : (
          <span>No Image</span>
        )}
      </>
    )
  },
  {
    id: 'actions',
    cell: ({ row }) => <TestimonialRowActions row={row} />
  }
];
