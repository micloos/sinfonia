import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { mssql } from '@/app/lib/db';
import md5 from 'md5';
// import { mylog } from '../mylogger';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes in milliseconds
const TOKEN_EXPIRY = '1h';

export interface User {
    Cd_UsuarioSistemaReuniao: number;
    Ds_LoginAcessoUsuarioSistemaReuniao: string;
    Cd_NivelUsuarioSistema: number;
}

type FullUSer = {
    Cd_UsuarioSistemaReuniao: number;
    Ds_LoginAcessoUsuarioSistemaReuniao: string;
    Nr_SenhaAcessoUsuarioSistemaReuniao: string;
    Cd_NivelUsuarioSistema: number;
}

export interface AuthResult {
    success: boolean;
    user?: User;
    token?: string;
    error?: string;
}

export interface SessionData {
    Cd_UsuarioSistemaReuniao: number;
    Ds_LoginAcessoUsuarioSistemaReuniao: string;
    Cd_NivelUsuarioSistema: number;
    LastActivity: Date;
    ExpiresAt: Date;
}

export async function login(username: string, password: string): Promise<AuthResult> {
    try {
        
        
        // Get user from database
        const myreq = `
                SELECT Cd_UsuarioSistemaReuniao, Ds_LoginAcessoUsuarioSistemaReuniao, Nr_SenhaAcessoUsuarioSistemaReuniao, Cd_NivelUsuarioSistema
                FROM REUNIAO_T3100_UsuarioSistemaReuniao 
                WHERE Ds_LoginAcessoUsuarioSistemaReuniao = '${username}'
            `;

        const result = await mssql(myreq) as FullUSer[];  
        if (result.length === 0) {
            return { success: false, error: 'Invalid username or password' };
        }

        const user = result[0];
        
        // Verify password
        const hashedPassword = md5(password).slice(0, 20);
        const isValidPassword = hashedPassword === user.Nr_SenhaAcessoUsuarioSistemaReuniao;
        if (!isValidPassword) {
            return { success: false, error: 'Invalid username or password' };
        }

        // Update last login
        // await pool.request()
        //     .input('userID', sql.Int, user.UserID)
        //     .query(`UPDATE Users SET LastLogin = GETDATE() WHERE UserID = @userID`);

        // Generate JWT token
        const token = jwt.sign(
            { 
                userID: user.Cd_UsuarioSistemaReuniao, 
                username: user.Ds_LoginAcessoUsuarioSistemaReuniao, 
                role: user.Cd_NivelUsuarioSistema 
            },
            JWT_SECRET,
            { expiresIn: TOKEN_EXPIRY }
        );

        // Store session
        await createSession(user.Cd_UsuarioSistemaReuniao, token, user.Ds_LoginAcessoUsuarioSistemaReuniao, user.Cd_NivelUsuarioSistema );

        return {
            success: true,
            user: {
                Cd_UsuarioSistemaReuniao: user.Cd_UsuarioSistemaReuniao,
                Ds_LoginAcessoUsuarioSistemaReuniao: user.Ds_LoginAcessoUsuarioSistemaReuniao,
                Cd_NivelUsuarioSistema: user.Cd_NivelUsuarioSistema
            },
            token
        };
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, error: 'Login failed' };
    }
}

// Create session
async function createSession(userID: number, token: string, login: string, nivel: number) {
    const sessionID = generateSessionId();
    const expiresAt = new Date(Date.now() + SESSION_TIMEOUT).toISOString();
    
    await mssql(`
            INSERT INTO REUNIAO_T4100_Sessoes (Cd_sessao, Cd_UsuarioSistemaReuniao, Token, Ds_LoginAcessoUsuarioSistemaReuniao, Cd_NivelUsuarioSistema, ExpiresAt)
            VALUES ('${sessionID}', ${userID}, '${token}', '${login}', ${nivel}, '${expiresAt}')
        `);
}

// Verify token and check session
export async function verifyToken(token: string): Promise<User | null> {
    try {
        // Verify JWT
        const decoded = jwt.verify(token, JWT_SECRET) as any;
        
        // Check session in database
        const result = await mssql(`
                SELECT Cd_UsuarioSistemaReuniao, Ds_LoginAcessoUsuarioSistemaReuniao, Cd_NivelUsuarioSistema, LastActivity, ExpiresAt
                FROM REUNIAO_T4100_Sessoes 
                WHERE Cd_UsuarioSistemaReuniao = ${decoded.userID} AND Token = '${token}'
            `) as SessionData[];

        if (result.length === 0) {
            return null;
        }

        const session = result[0];
        const now = new Date();
        const lastActivity = new Date(session.LastActivity).toISOString();
        const expiresAt = new Date(session.ExpiresAt);

        // Check if session expired
        if (now > expiresAt) {
            await invalidateSession(token);
            return null;
        }

        // Update last activity
        await mssql(`
                UPDATE REUNIAO_T4100_Sessoes 
                SET LastActivity = '${lastActivity}'
                WHERE Cd_UsuarioSistemaReuniao = ${decoded.userID} AND Token = '${token}' 
            `);

        return {
            Cd_UsuarioSistemaReuniao: decoded.userID,
            Ds_LoginAcessoUsuarioSistemaReuniao: decoded.username,
            Cd_NivelUsuarioSistema: decoded.role,
        };
    } catch (error) {
        console.error('Token verification error:', error);
        return null;
    }
}

// Invalidate session (logout)
export async function invalidateSession(token: string) {
    await mssql(`
            UPDATE UserSessions 
            SET IsActive = 0 
            WHERE Token = '${token}'
        `);
}

// Logout user
export async function logout() {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    
    if (token) {
        await invalidateSession(token);
    }
    
    // Clear cookie
    cookieStore.delete('auth_token');
}



// Helper function
function generateSessionId(): string {
    return 'sess_' + Date.now() + '_' + Math.random().toString(36).substring(2, 15);
}

