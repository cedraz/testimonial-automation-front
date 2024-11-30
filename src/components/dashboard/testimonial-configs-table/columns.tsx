'use client';

import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '../../data-tables/data-table-column-header';

import { TTestimonialConfig } from './schemas';
import { TestimonialConfigsRowActions } from './testimonial-configs-row-actions';

export const columns: ColumnDef<TTestimonialConfig>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Id" />
    ),
    enableSorting: false,
    enableHiding: true
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <span className="max-w-[500px] truncate font-medium">
        {row.getValue('name')}
      </span>
    )
  },
  {
    accessorKey: 'format',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Format" />
    ),
    cell: ({ row }) => (
      <span className="max-w-[500px] truncate font-medium">
        {row.getValue('format')}
      </span>
    )
  },
  {
    accessorKey: 'title_char_limit',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title Char Limit" />
    ),
    cell: ({ row }) => (
      <span className="max-w-[500px] truncate font-medium">
        {row.getValue('title_char_limit')}
      </span>
    )
  },
  {
    accessorKey: 'message_char_limit',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Message Char Limit" />
    ),
    cell: ({ row }) => (
      <span className="">{row.getValue('message_char_limit')}</span>
    )
  },
  {
    accessorKey: 'expiration_limit',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Expiration Limit" />
    ),
    cell: ({ row }) => (
      <span className="">{row.getValue('expiration_limit')}</span>
    )
  },
  {
    id: 'actions',
    cell: ({ row }) => <TestimonialConfigsRowActions row={row} />
  }
];
