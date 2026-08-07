// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Public paths that don't require authentication
const PUBLIC_PATHS = ['/login', '/api/auth/login', '/api/auth/register','/'];
const PUBLIC_STARTS_WITH = ['/favicon.ico', '/public','/_next'];

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    console.log('Middleware triggered for path:', path);
    // Skip public paths
    if (PUBLIC_PATHS.includes(path) || PUBLIC_STARTS_WITH.some(p => path.startsWith(p))) {
        console.log('Public path accessed, skipping auth check:', path);
        return NextResponse.next();
    }

    // Skip API auth routes
    if (path.startsWith('/api/auth/')) {
        return NextResponse.next();
    }

    // Check for token in cookies
    const token = request.cookies.get('auth_token')?.value;

    if (!token) {
        // For API routes, return 401
        if (path.startsWith('/api/')) {
            return NextResponse.json(
                { error: 'Authentication required' },
                { status: 401 }
            );
        }
        
        // For pages, redirect to login
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('from', path);
        return NextResponse.redirect(loginUrl);
    }

    // Token exists, proceed
    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        '/((?!_next/static|_next/image|favicon.ico|public).*)',
    ],
};