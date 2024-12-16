'use client';

import * as React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';

import { DataTablePagination } from './data-table-pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { DataTableToolbar } from './data-table-toolbar';
import { DeleteTestimonialButton } from './data-table-delete-button';
import { ChevronRight } from 'lucide-react';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  init: number;
  limit: number;
  setInit: (init: number) => void;
  setLimit: (limit: number) => void;
  total: number;
  queryName: string;
  columnName: string;
  deleteFn?: (id_list: Array<string>) => Promise<void>;
  rowOnClick?: (row: TData) => void;
  children?: React.ReactNode;
  manualSorting?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  init,
  limit,
  setInit,
  setLimit,
  total,
  rowOnClick,
  queryName,
  columnName,
  deleteFn,
  children,
  manualSorting
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility: {
        ...columnVisibility,
        id: false
      },
      rowSelection,
      columnFilters,
      pagination: {
        pageIndex: init,
        pageSize: limit
      }
    },
    manualSorting,
    pageCount: Math.ceil(total / limit),
    onPaginationChange: (updater) => {
      const { pageIndex, pageSize } =
        typeof updater === 'function'
          ? updater({ pageIndex: init, pageSize: limit })
          : updater;
      setInit(pageIndex);
      setLimit(pageSize);
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues()
  });

  return (
    <div className="space-y-4 w-full">
      <DataTableToolbar
        queryName={queryName}
        columnName={columnName}
        table={table}
      >
        {children}
        {deleteFn && table.getSelectedRowModel().rows.length > 0 && (
          <DeleteTestimonialButton
            queryName={queryName}
            table={table}
            deleteFn={deleteFn}
          />
        )}
      </DataTableToolbar>
      <div className="rounded-md border min-h-[400px]">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                  {rowOnClick && (
                    <TableCell className="w-[30px]">
                      <ChevronRight
                        className="cursor-pointer"
                        onClick={
                          rowOnClick
                            ? () => rowOnClick(row.original)
                            : undefined
                        }
                      />
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
