'use client';

import { DataTable } from '@/components/data-tables/data-table';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { columns } from './columns';
import { useQuery } from '@tanstack/react-query';
import { getAccessToken } from '@/utils/auth';
import { getTestimonials } from './actions';
import { AddTestimonialButton } from './add-testimonial-button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

export function TestimonialsTable({
  landing_page_id
}: {
  landing_page_id: string;
}) {
  const { toast } = useToast();
  const [init, setInit] = useState(0);
  const [limit, setLimit] = useState(10);

  const { data, error, isLoading } = useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      const access_token = await getAccessToken();

      const response = await getTestimonials({
        access_token: access_token || '',
        landing_page_id,
        init: init * limit,
        limit
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
        <CardTitle>Testimonials</CardTitle>
        <CardDescription>Manage your testimonials.</CardDescription>
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
          columnName="customer_name"
        >
          <AddTestimonialButton
            landing_page_id={landing_page_id}
            queryName="testimonials"
          />
        </DataTable>
      </CardContent>
    </Card>
  );
}
