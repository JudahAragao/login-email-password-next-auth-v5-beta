
import { getUrl } from './lib/get-url'
import NextAuth from 'next-auth';
import { authConfig } from './services/auth/auth.config';
import { DEFAULT_REDIRECT, PUBLIC_ROUTES, ROOT } from './lib/routes';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;

  const isAuthenticated = !!req.auth;
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);

  if (isPublicRoute && isAuthenticated)
    return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl.origin));

  if (!isAuthenticated && !isPublicRoute)
    return Response.redirect(new URL(ROOT, nextUrl));
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
