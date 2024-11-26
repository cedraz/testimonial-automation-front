'use client';

import { ColumnDef } from '@tanstack/react-table';
import { TLandingPage } from './schema';
import { DataTableColumnHeader } from '../../data-tables/data-table-column-header';
import { Link } from 'lucide-react';

export const columns: ColumnDef<TLandingPage>[] = [
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
    accessorKey: 'link',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Link" />
    ),
    cell: ({ row }) => (
      <a
        href={row.getValue('link')}
        className="max-w-[500px] truncate font-medium flex gap-3"
      >
        <Link />
        Link
      </a>
    )
  }
];
