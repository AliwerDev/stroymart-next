import { getToken } from 'next-auth/jwt';
import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { CustomMiddleware } from './chain';

export function authMiddleware(middleware: CustomMiddleware): CustomMiddleware {
  return async (req: NextRequest, event: NextFetchEvent, response: NextResponse) => {
    const token = await getToken({ req });
    const { pathname } = req.nextUrl;

    if (pathname.includes('/dashboard')) {
      if (!token) {
        const locale = pathname.split('/')[1] || 'uz';
        const url = new URL(`/${locale}/auth/login`, req.url);
        url.searchParams.set('callbackUrl', pathname);
        return NextResponse.redirect(url);
      }
    }

    return middleware(req, event, response);
  };
}
