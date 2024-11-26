'use client';

import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { getLandingPages } from '@/components/dashboard/landing-pages/actions';
import { DataTable } from '@/components/data-tables/data-table';
import { columns } from './columns';
import { useState } from 'react';
import { TLandingPage } from './schema';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from '@/components/ui/card';
import { getAccessToken } from '@/utils/auth';

export function LandingPageList() {
  const router = useRouter();
  const { toast } = useToast();
  const [init, setInit] = useState(0);
  const [limit, setLimit] = useState(10);

  const { data, error, isLoading } = useQuery({
    queryKey: ['landingPages'],
    queryFn: async () => {
      const access_token = await getAccessToken();

      const response = await getLandingPages({
        access_token: access_token || '',
        init: init * limit,
        limit
      });

      return response;
    }
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    toast({
      title: 'Error',
      description: 'Failed to fetch landing pages.'
    });
    return <div>Error loading data</div>;
  }

  const handleOpenLandingPage = (row: TLandingPage) => {
    router.push(`/dashboard/landing-page/${row.id}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Products</CardTitle>
        <CardDescription>
          Manage your products and view their sales performance.
        </CardDescription>
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
          rowOnClick={handleOpenLandingPage}
          columnName="name"
        />
      </CardContent>
    </Card>
  );
}
