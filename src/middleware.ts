// app/middleware.ts
import { NextResponse, type NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export async function middleware(req: NextRequest) {
  const cookieStore = cookies();
  const access_token = cookieStore.get('access_token');
  const refresh_token = cookieStore.get('refresh_token');

  if (access_token && refresh_token) {
    return NextResponse.next();
  }

  const originalUrlString = req.url;
  const originalUrl = new URL(originalUrlString);

  const urlAccessToken = originalUrl.searchParams.get('access_token');
  const urlRefreshToken = originalUrl.searchParams.get('refresh_token');

  if (urlAccessToken && urlRefreshToken) {
    originalUrl.search = '';

    const cookiesUrl = new URL('/api/cookies', req.nextUrl.origin);
    cookiesUrl.searchParams.append('access_token', urlAccessToken);
    cookiesUrl.searchParams.append('refresh_token', urlRefreshToken);
    cookiesUrl.searchParams.append(
      'redirectTo',
      'http://localhost:3000/dashboard'
    );

    return NextResponse.redirect(cookiesUrl);
  }

  const refreshUrl = new URL('/api/refresh', req.url);
  refreshUrl.searchParams.set('redirectTo', originalUrlString);

  return NextResponse.redirect(refreshUrl);
}

export const config = {
  matcher: ['/dashboard/:path*']
};
