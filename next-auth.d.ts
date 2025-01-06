import NextAuth, { DefaultSession, User, Session } from "next-auth";
import 'next-auth/jwt'
import { UserType } from "./app/lib/definitions";


declare module 'next-auth' {

    interface Session {
        username: string;
        nivel: number;
    }

    interface User {
        username: string;
        nivel: number;
    }    
}

declare module 'next-auth/jwt' {
    interface JWT {
        user?: User;
        nivel?: number;
        accessToken?: string;
        refreshToken?: string;
        expiresAt?: number;
        error?: string;
    }
}