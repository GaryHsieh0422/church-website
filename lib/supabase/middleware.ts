import { NextResponse, type NextRequest } from 'next/server';
import { verifyJwt, ADMIN_TOKEN_COOKIE } from '@/lib/auth';

export async function updateSession(request: NextRequest) {
  const token = request.cookies.get(ADMIN_TOKEN_COOKIE)?.value;

  // Verify our custom JWT (returns null if missing or invalid)
  const user = token ? await verifyJwt(token) : null;

  // Handle admin routes
  const isAdminPath = request.nextUrl.pathname.startsWith('/admin');
  const isLoginPath = request.nextUrl.pathname === '/admin/login' || request.nextUrl.pathname === '/admin/login/';

  if (isAdminPath && !isLoginPath) {
    // Protect the admin dashboard
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }
  }

  if (isLoginPath && user) {
    // If already logged in, auto-redirect away from login page to dashboard
    const url = request.nextUrl.clone();
    url.pathname = '/admin';
    return NextResponse.redirect(url);
  }

  // For all other routes (public site), just continue normally.
  // We do not touch Supabase SSR here anymore for auth purposes.
  return NextResponse.next({ request });
}
