'use client';

import { Button } from '@/components/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash } from 'lucide-react';
import { toast as sooner } from 'sonner';
import { Table } from '@tanstack/react-table';

export interface IDeleteButtonProps<TData> {
  queryName: string;
  table: Table<TData>;
  deleteFn: (id_list: Array<string>) => Promise<void>;
}

export function DeleteTestimonialButton<TData>({
  queryName,
  table,
  deleteFn
}: IDeleteButtonProps<TData>) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    onSuccess: () => {
      // Invalidate the query and refetch the data
      queryClient.invalidateQueries({ queryKey: [queryName] });
      sooner('Success', {
        description: 'Deleted successfully.'
      });
    },
    mutationFn: async () => {
      const id_list: Array<string> = table
        .getSelectedRowModel()
        .rows.map((row) => {
          return row.getValue('id');
        });

      await deleteFn(id_list);

      table.setRowSelection({});
    },
    onError: () => {
      sooner('Error', {
        description: `Failed to delete ${queryName}.`
      });
    }
  });

  return (
    <Button
      className="h-8 flex gap-1 bg-red-500 hover:bg-red-700"
      onClick={() => deleteMutation.mutate()}
    >
      <span className="hidden md:flex">Delete</span>
      <Trash size={18} />
    </Button>
  );
}
