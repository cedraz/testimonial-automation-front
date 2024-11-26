// app/middleware.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function middleware(req: Request) {
  const cookieStore = cookies();
  const access_token = cookieStore.get('access_token');
  const refresh_token = cookieStore.get('refresh_token');

  if (!access_token || !refresh_token) {
    const originalUrl = req.url;
    const refreshUrl = new URL('/api/refresh', req.url);
    refreshUrl.searchParams.set('redirectTo', originalUrl);

    return NextResponse.redirect(refreshUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*']
};
