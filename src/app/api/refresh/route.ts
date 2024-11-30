import { auth } from '@/services/auth';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const redirectTo = url.searchParams.get('redirectTo');

  const refreshedData = await auth();

  if (!refreshedData) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (redirectTo) {
    return NextResponse.redirect(redirectTo);
  }

  return NextResponse.json({ message: 'Tokens atualizados com sucesso!' });
}
