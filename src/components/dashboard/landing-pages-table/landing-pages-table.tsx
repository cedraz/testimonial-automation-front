'use client';

import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
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
import { getAccessToken } from '@/services/auth';
import { Skeleton } from '@/components/ui/skeleton';
import { deleteLandinPages, getLandingPages } from '@/services/landing-page';
import { AddLandingPageDialog } from './add-landing-page-dialog';

export function LandingPagesTable() {
  const router = useRouter();
  const { toast } = useToast();
  const [init, setInit] = useState(0);
  const [limit, setLimit] = useState(10);

  const { data, error, isLoading } = useQuery({
    queryKey: ['landing-pages'],
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
      description: 'Failed to fetch landing pages.'
    });
    return <div>Error loading data</div>;
  }

  const handleOpenLandingPage = (row: TLandingPage) => {
    router.push(`/dashboard/landing-page/${row.id}`);
  };

  const deleteMutation = async (id_list: Array<string>) => {
    const access_token = await getAccessToken();

    deleteLandinPages({
      access_token: access_token || '',
      deleteLandingPagesDto: {
        landing_pages_id_list: id_list
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Landing Pages</CardTitle>
        <CardDescription>Manage your landing pages.</CardDescription>
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
          queryName="landing-pages"
          deleteFn={deleteMutation}
        >
          <AddLandingPageDialog queryName="landing-pages" />
        </DataTable>
      </CardContent>
    </Card>
  );
}
