import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('access_token')?.value;
    const isDashboardPage = request.nextUrl.pathname.startsWith('/dashboard');
    const isAuthPage = request.nextUrl.pathname.startsWith('/login') ||
        request.nextUrl.pathname.startsWith('/register');

    //  If trying to access dashboard without a token, redirect to login
    if (isDashboardPage && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    //  If already logged in and trying to access login/register, redirect to dashboard
    if (isAuthPage && token) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

// Only run middleware on these paths
export const config = {
    matcher: ['/dashboard/:path*', '/login', '/register'],
};