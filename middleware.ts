import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === '/login' || path === '/register' || path === '/verify-otp';

  const token = request.cookies.get('accessToken')?.value || '';

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.nextUrl));
  }
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/login',
    '/register',
    '/verify-otp',
  ],
};