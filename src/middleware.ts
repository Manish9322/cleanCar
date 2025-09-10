import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as jose from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key';

async function verifyToken(token: string) {
    if (!token) return null;
    try {
        const { payload } = await jose.jwtVerify(
            token,
            new TextEncoder().encode(JWT_SECRET)
        );
        return payload;
    } catch (error) {
        console.error('JWT Verification Error:', error);
        return null;
    }
}


export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  const user = await verifyToken(token as string);

  const { pathname } = request.nextUrl;

  const response = NextResponse.next();
  
  if (user) {
    response.headers.set('x-user-payload', JSON.stringify(user));
  }
  
  // Protect admin routes
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    if (!user || (user as any).role !== 'admin') {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }
  }
  
  // Redirect logged-in admin from admin login page
  if (pathname.startsWith('/admin/login') && user && (user as any).role === 'admin') {
      const url = request.nextUrl.clone();
      url.pathname = '/admin';
      return NextResponse.redirect(url);
  }


  // Protect user profile routes
  if (pathname.startsWith('/user')) {
    if (!user) {
        const url = request.nextUrl.clone();
        url.pathname = '/auth/login';
        return NextResponse.redirect(url);
    }
  }

  // Redirect logged-in users from auth pages to home - REMOVED for easier account switching.
  // A user can now visit login/register pages even if logged in. They can logout from the navbar if they wish to switch.

  return response;
}

export const config = {
  matcher: ['/admin/:path*', '/user/:path*', '/auth/login', '/auth/register'],
};
