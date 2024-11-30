'use client';

import { ColumnDef } from '@tanstack/react-table';
import { TLandingPage } from './schema';
import { DataTableColumnHeader } from '../../data-tables/data-table-column-header';
import { Link } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

export const columns: ColumnDef<TLandingPage>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
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
    accessorKey: 'link',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Link" />
    ),
    cell: ({ row }) => (
      <a
        target="blank"
        href={row.getValue('link')}
        className="max-w-[500px] truncate font-medium flex gap-3"
      >
        {row.getValue('link')}
        <Link />
      </a>
    )
  }
];
