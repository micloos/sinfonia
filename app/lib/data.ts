import { mssql } from '@/app/lib/db';
import { UserType, Niveis, Numres, ParticipanteType } from '@/app/lib/definitions';
import { mylog } from './mylogger';



const ITEMS_PER_PAGE = 5;
const filename='/app/lib/data';


{/* Niveis */}

export async function fetchNiveis () {
	const myreq = "SELECT Cd_NivelUsuarioSistema as idniv, Nm_NivelUsuarioSistema as niv from REUNIAO_T3300_NivelUsuarioSistema";
	try {
	const niveis = await mssql(myreq) as Niveis[];
	return niveis;
	} catch (error) {
		mylog ("ERROR", filename, "fetchNiveis","error=",error);
		throw new Error('Failed to fetch niveis list');
	}
}


{/* Users */}

export async function fetchUsersPages (query: string) {
	try {
		const myreq = `SELECT COUNT(*) as n 
		             FROM REUNIAO_T3100_UsuarioSistemaReuniao 
					 where 
					   Nm_UsuarioSistemaReuniao like '%QQQ%' 
					   OR Ds_LoginAcessoUsuarioSistemaReuniao like '%QQQ%' 
					   or Cd_UsuarioSistemaReuniao like '%QQQ%'
					`.replace(/QQQ/g,query);
		const count = await mssql(myreq) as Numres[] ;
	const totalPages = Math.ceil(Number(count[0].n) / ITEMS_PER_PAGE);
	return totalPages;
	} catch (error) {
		mylog ("ERROR", filename, "fetchUsersPages","error=",error);
		throw new Error('Failed to fetch total number of users');
	}
}

export async function fetchFilteredUsers (
	query: string, 
	currentPage: number,
)  {
        const offset = (currentPage - 1) * ITEMS_PER_PAGE;
	try {
	const myreq = `SELECT  u.Cd_UsuarioSistemaReuniao as cpf, 
	                     u.Nm_UsuarioSistemaReuniao as nome,  
						 u.Ds_LoginAcessoUsuarioSistemaReuniao as username, 
						 n.Nm_NivelUsuarioSistema as nivel, 
						 u.Id_Usuario as id,
						 u.Nr_SenhaAcessoUsuarioSistemaReuniao as password
				FROM REUNIAO_T3100_UsuarioSistemaReuniao as u 
					JOIN REUNIAO_T3300_NivelUsuarioSistema as n 
				ON n.Cd_NivelUsuarioSistema = u.Cd_NivelUsuarioSistema 
				WHERE 
					n.Nm_NivelUsuarioSistema like '%QQQ%' 
					OR u.Nm_UsuarioSistemaReuniao like '%QQQ%' 
					OR u.Nm_UsuarioSistemaReuniao like '%QQQ%' 
					or u.Cd_NivelUsuarioSistema like '%QQQ%' 
					or u.Cd_UsuarioSistemaReuniao like '%QQQ%' 
					order by u.Id_Usuario 
					offset OOO rows 
					fetch next LLL rows only
				`.replace(/QQQ/g,query).replace (/LLL/g,ITEMS_PER_PAGE.toString()).replace (/OOO/g,offset.toString());

	const users = await mssql(myreq);
	return (
		users
	)
	} catch(error) {
		mylog ("ERROR", filename, "fetchFilteredUsers","error=",error);
		throw new Error('Failed to fetch total number of users');
	}
}	

export async function fetchUserById (id: string) {
        try {
		const myreq = 	`SELECT 
							u.Cd_UsuarioSistemaReuniao as cpf, 
							u.Nm_UsuarioSistemaReuniao as nome, 
							u.Ds_LoginAcessoUsuarioSistemaReuniao as username, 
							u.Cd_NivelUsuarioSistema as nivel, 
							u.Id_Usuario as id,
							u.Nr_SenhaAcessoUsuarioSistemaReuniao as password
						FROM 
							REUNIAO_T3100_UsuarioSistemaReuniao as u 
							JOIN REUNIAO_T3300_NivelUsuarioSistema as n 
							ON n.Cd_NivelUsuarioSistema = u.Cd_NivelUsuarioSistema 
						WHERE u.Cd_UsuarioSistemaReuniao= III`.replace (/III/g,id);
		
		const user = await mssql(myreq) as UserType[];
		return (
			user[0]
		)
	} catch(error) {
		mylog ("ERROR", filename, "fetchUserById","error=",error);
		throw new Error('Failed to fecth User');
	}
}


{/*  Participantes */}

export async function fetchParticipantesPages (query: string) {
	try {
		const myreq = `SELECT COUNT(*) as n
					FROM REUNIAO_T4000_Participantes 
					WHERE
					  Nm_Participante like '%PPP%'
					`.replace(/PPP/g,query);
		const count = await mssql(myreq) as Numres[];
		const totalPages = Math.ceil(Number(count[0].n / ITEMS_PER_PAGE));
		return totalPages;
	} catch(error) {
		mylog ("ERROR", filename, "fetchParticipantesPages","error=",error);
		throw new Error('Failed to fetch Participant number');
	}
}


export async function fetchFilteredParticipantes (query: string, currentPage: number) {
	try {
        	const offset = (currentPage - 1) * ITEMS_PER_PAGE;
		const myreq = `SELECT  
	                     u.Nm_Participante as name,
						 u.Cd_Participante as id
				FROM REUNIAO_T4000_Participantes as u					
				WHERE 
					u.Nm_Participante like '%QQQ%' 
					order by Dt_Atualizacao DESC
					offset OOO rows 
					fetch next LLL rows only
				`.replace(/QQQ/g,query).replace (/LLL/g,ITEMS_PER_PAGE.toString()).replace (/OOO/g,offset.toString());

	const participantes = await mssql(myreq);
	return (
		participantes
	)
	} catch(error) {
		mylog ("ERROR", "app/lib/data", "fetchParticipantes","error=",error);
		throw new Error('Failed to fetch all Participantes');
	}
}	

export async function fetchParticipanteById (id: string) {
	const nid = Number(id);
	try {
		const myreq = `SELECT
		    Cd_Participante as id,
			Nm_Participante as name
		FROM REUNIAO_T4000_Participantes
		WHERE
			Cd_Participante = ${nid} `;
		mylog("DBG","app/lib/data", "fetchParticipanteById","myreq=",myreq.replace(/\s/g," "));
		const participante = await mssql(myreq) as ParticipanteType[];
		mylog("DBG","app/lib/data", "fetchParticipanteById","participante=",participante);
		return (
			participante[0]
		)
	} catch(error) {
		mylog ("ERROR", "app/lib/data", "fetchParticipanteById","error=",error);
		throw new Error('Failed to fetch ParticipanteById');
	}
}



