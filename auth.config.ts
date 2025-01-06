import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request }) {
            console.log ( "DBG: [", Date(),"] auth.config, authConfig request:",request);            
            const isLoggedIn = !!auth?.user;
            if (isLoggedIn) {
                console.log ( "DBG: [", Date(),"] auth.config, authConfig logged user", auth.user);
            }
            const isOnDashboard = request.nextUrl.pathname.startsWith('/sinfonia');
            console.log ( "DBG: [", Date(),"] auth.config, authConfig isOnDashboard", request.nextUrl.pathname);
            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false;                
            }
                {/*
            } else if (isLoggedIn) {
                console.log ( "DBG: [", Date(),"] auth.config, authConfig nextURL",request.nextUrl);
                return Response.redirect(new URL('/sinfonia', request.nextUrl));
            }
                */}
        },
    },
    providers: [],
    trustHost: true,
} satisfies NextAuthConfig;