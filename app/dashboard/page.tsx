// app/dashboard/page.tsx
import { requireAuth} from '@/app/lib/auth/authorization';
import { mssql } from '@/app/lib/db';

// Server component with role-based access
export default async function DashboardPage() {
    // This will throw an error if not authenticated
    const session = await requireAuth('3'); // Require at least 'user' role
    
    // Access user info
    const { user } = session;
    
    // Fetch data based on user role
    
    let data;
    if (user.Cd_NivelUsuarioSistema === 1) {
        // Admin can see all data
        data = await mssql('SELECT * FROM REUNIAO_T3100_UsuarioSistemaReuniao');
    } else {
        // Regular users see limited data
        data = await mssql(`SELECT * FROM REUNIAO_T3100_UsuarioSistemaReuniao WHERE Cd_UsuarioSistemaReuniao = ${user.Cd_UsuarioSistemaReuniao}`);
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">
                Welcome, {user.Ds_LoginAcessoUsuarioSistemaReuniao}!
            </h1>
            <p className="mb-4">Role: {user.Cd_NivelUsuarioSistema}</p>
            
            <div className="bg-white shadow rounded-lg p-4">
                {/* Display data */}
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
        </div>
    );
}