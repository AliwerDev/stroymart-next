import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { removeLanguagePrefix } from '@/lib/utils';
import { getToken } from 'next-auth/jwt';
import { CustomMiddleware } from './chain';

const authPages = ['/auth/login', '/auth/reset-password', '/auth/set-password'];

export function permissionMiddleware(middleware: CustomMiddleware) {
  return async function (req: NextRequest, event: NextFetchEvent, response: NextResponse) {
    const { pathname: pathnameWithLocale } = req.nextUrl;
    const pathname = removeLanguagePrefix(pathnameWithLocale);

    const token = await getToken({ req });
    const { accessToken } = token || {};

    const isAuthorized = Boolean(accessToken);
    const isDevelopment = process.env.NODE_ENV === 'development';

    if (!isDevelopment && pathname.startsWith('/dev')) {
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    if (!isAuthorized && !authPages.includes(pathname) && !pathname.startsWith('/dev')) {
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    return middleware(req, event, response);
  };
}
