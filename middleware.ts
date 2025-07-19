import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const PUBLIC_PATHS = ['/', '/auth/login', '/auth/register', '/auth/forget-password'];
const PRIVATE_PATHS = ['/cart', '/wishlist', '/profile'];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isPublic = PUBLIC_PATHS.includes(pathname);
  const isPrivate = PRIVATE_PATHS.includes(pathname);

  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  console.log('Middleware - token:', token);

  if (isPrivate && !token && pathname !== '/') {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }


  if (isPublic && token && pathname !== '/') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/auth/login', '/auth/register', '/auth/forget-password', '/cart', '/wishlist', '/profile'],
};



