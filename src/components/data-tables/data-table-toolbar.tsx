'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table } from '@tanstack/react-table';
import { X } from 'lucide-react';
import { DataTableViewOptions } from './data-table-view-options';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  columnName: string;
  children?: React.ReactNode;
  queryName: string;
}

export function DataTableToolbar<TData>({
  table,
  columnName,
  children
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4">
      <div className="flex flex-1 items-end space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={
            (table.getColumn(columnName)?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn(columnName)?.setFilterValue(event.target.value)
          }
          className="h-8 w-full sm:max-w-[250px]"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      <div className="flex justify-between gap-2">
        <DataTableViewOptions table={table} />
        <div className="flex gap-3">{children}</div>
      </div>
    </div>
  );
}
