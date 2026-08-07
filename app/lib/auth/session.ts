// lib/auth/session.ts
import { cookies } from 'next/headers';
import { verifyToken, User } from './auth-service';

let sessionCache: { user: User; timestamp: number } | null = null;
const CACHE_TTL = 10000; // 10 seconds

export async function getServerSession(): Promise<{ user: User } | null> {
    // Check cache
    if (sessionCache && Date.now() - sessionCache.timestamp < CACHE_TTL) {
        return { user: sessionCache.user };
    }

    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
        return null;
    }

    const user = await verifyToken(token);
    
    if (!user) {
        return null;
    }

    // Update cache
    sessionCache = { user, timestamp: Date.now() };
    
    return { user };
}

// Client-side hook for session
export function useSession() {
    // This would be a client component hook using useEffect
    // For simplicity, we'll use server components primarily
}