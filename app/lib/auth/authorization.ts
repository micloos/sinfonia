// lib/auth/authorization.ts
import { getServerSession } from './session';

export type UserRole = '1' | '2' | '3'; // 1: Admin, 2: Manager, 3: User

// Role hierarchy for permission checking
const ROLE_HIERARCHY: Record<UserRole, number> = {
    '1': 3,
    '2': 2,
    '3': 1
};

// Check if user has required role
export function hasRole(userRole: string, requiredRole: UserRole): boolean {
    return ROLE_HIERARCHY[userRole as UserRole] >= ROLE_HIERARCHY[requiredRole];
}

// Server-side authorization check for server components
export async function requireAuth(requiredRole?: UserRole) {
    const session = await getServerSession();
    
    if (!session) {
        throw new Error('Unauthorized: Please login');
    }

    if (requiredRole && !hasRole(session.user.Cd_NivelUsuarioSistema.toString(), requiredRole)) {
        throw new Error(`Você não tem permissão para acessar esta página.`);
    }

    return session;
}

// Server component wrapper for authorization
{/*}
export function withAuth<P extends object>(
    ComponentWrapper: React.ComponentType<P>,
    requiredRole?: UserRole
) {
    return async function AuthenticatedComponent(props: P) {
        try {
            await requireAuth(requiredRole);
            return <ComponentWrapper {...props} />;
        } catch (error: any) {
            return <div className="text-red-500">{error.message}</div>;
        }
    };
}
    */}