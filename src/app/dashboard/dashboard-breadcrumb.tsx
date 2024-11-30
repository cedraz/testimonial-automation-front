'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function DashboardBreadcrumb() {
  const pathname = usePathname();

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/dashboard">Dashboard</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {pathname === '/dashboard' && (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/dashboard">Landing pages</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        )}
        {pathname.startsWith('/dashboard/landing-page/') && (
          <BreadcrumbItem>
            <BreadcrumbPage>Testimonials</BreadcrumbPage>
          </BreadcrumbItem>
        )}
        {pathname.startsWith('/dashboard/testimonial-configs') && (
          <>
            <BreadcrumbItem>
              <BreadcrumbPage>Testimonials Configs</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
