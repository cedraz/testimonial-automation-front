'use client';

import { DataTable } from '@/components/data-tables/data-table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { useState } from 'react';
import { columns } from './columns';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { getAccessToken } from '@/services/auth';
import { getTestimonialConfigs } from '@/services/testimonial-config';
import { AddTestimonialConfigDialog } from './add-testimonial-config-dialog';

export function TestimonialConfigsTable() {
  const { toast } = useToast();
  const [init, setInit] = useState(0);
  const [limit, setLimit] = useState(10);

  const { data, error, isLoading } = useQuery({
    queryKey: ['testimonials-configs'],
    queryFn: async () => {
      const access_token = await getAccessToken();

      const response = await getTestimonialConfigs({
        access_token: access_token || '',
        init: init * limit,
        limit: limit
      });

      return response;
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  }

  if (error) {
    toast({
      title: 'Error',
      description: 'Failed to fetch testimonials.'
    });
    return <div>Error loading data</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Testimonial Configs</CardTitle>
        <CardDescription>Manage your testimonial configs.</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns}
          data={data?.results || []}
          init={init}
          limit={limit}
          setInit={setInit}
          setLimit={setLimit}
          total={data?.total || 0}
          columnName="name"
          queryName="testimonials-configs"
        >
          <AddTestimonialConfigDialog queryName="testimonials-configs" />
        </DataTable>
      </CardContent>
    </Card>
  );
}
