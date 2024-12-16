import { setCookiesFromExternalProvider } from '@/services/auth';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const redirectTo = url.searchParams.get('redirectTo');

  const access_token = url.searchParams.get('access_token');
  const refresh_token = url.searchParams.get('refresh_token');

  if (!access_token || !refresh_token) {
    return NextResponse.redirect('/login');
  }

  const updatedCookies = await setCookiesFromExternalProvider({
    access_token,
    refresh_token
  });

  if (!updatedCookies) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (redirectTo) {
    return NextResponse.redirect(redirectTo);
  }

  return NextResponse.json({
    message: 'Tokens atualizados com sucesso pelo provedor externo!'
  });
}
