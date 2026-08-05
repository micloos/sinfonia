// app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';
import { logout } from '@/app/lib/auth/auth-service';

export async function POST() {
    await logout();
    
    const response = NextResponse.json({ success: true });
    response.cookies.delete('auth_token');
    
    return response;
}