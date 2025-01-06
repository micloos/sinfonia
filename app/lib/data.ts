import { mssql } from '@/app/lib/db';
import { UserType, Niveis, Numres, Reunioes } from '@/app/lib/definitions';



const ITEMS_PER_PAGE = 5;

export async function fetchReunioesPages (query: string, active:number) {
	try {
		const myreq = "SELECT COUNT(*) as n FROM REUNIAO_T1000_Reuniao".replace(/AAA/g,active.toString()).replace(/QQQ/g,query);
		const count = await mssql(myreq) as Numres[] ;
		const totalPages = Math.ceil(count[0].n / ITEMS_PER_PAGE);
		return (totalPages);
	} catch (error) {
		console.log ('Database error', error);
		throw new Error('Failed to fetch Reunioes pages');
	} 
}

export async function fetchNextReuniao () 
{

	type correctanswer = { n: number};
	{/* type badanswer = {error: string};
	
	type answer = correctanswer[] | badanswer; */}
	
	try {
		const myreq = "select max(Cd_Reuniao) + 1 as n from REUNIAO_T1000_Reuniao";
		const nextreuniao = await mssql(myreq) as correctanswer[];
		return (nextreuniao[0].n);
	} catch(error) {
		console.log ('Database error', error);
		throw new Error('Failed to fetch next Reuniao');		
	}
}

export async function fetchReuniaoById (
	query: string, 
)  {
	try {
		const myreq = `Select 
		               distinct u.Cd_Reuniao as id, 
					   u.Dt_InicialReuniao as d_ini, 
					   u.Dt_FinalReuniao as d_end, 
					   u.Ds_SalaReuniao as sala, 
					   u.Ds_PredioSalaReuniao as predio, 
					   u.Dt_LimiteInclusaoItemReuniao as d_lim, 
					   u.Ind_ReaberturaReuniao as active 
					FROM REUNIAO_T1000_Reuniao as u
					WHERE
						u.Cd_reuniao = PPP						
					`.replace(/PPP/g,query);
		const reunioes = await mssql(myreq) as Reunioes[];
		return (
			reunioes[0]
		)
	} catch (error) {
		console.log('Database Error:',error);
		throw new Error('Failed to fetch Reunioes');
	}
}

export async function fetchParticipantesByReuniao (id: number)
{
	try {
		const myreq = `Select
		  Cd_ParticipanteReuniao as id,
		  Nm_ParticipanteReuniao as name,
		  Ds_PosicaoParticipanteReuniao as title
		from REUNIAO_T1600_ParticipanteReuniao
		where Cd_Reuniao = III`.replace(/III/g,id.toString());
		const participantes = await mssql(myreq);
		return (participantes)
	} catch (error) {
		console.log('Database Error:',error);
		throw new Error('Failed to fetch Reunioes');
	}
}

export async function fetchFilteredReunioes (
	query: string, 
	currentPage: number,
	active: number,
)  {
	console.log("fetchFilteredReunioes active:",active)
	const offset = (currentPage - 1) * ITEMS_PER_PAGE;
	try {
		const myreq = `Select 
		               distinct u.Cd_Reuniao as id, 
					   u.Dt_InicialReuniao as d_ini, 
					   u.Dt_FinalReuniao as d_end, 
					   u.Ds_SalaReuniao as sala, 
					   u.Ds_PredioSalaReuniao as predio, 
					   u.Dt_LimiteInclusaoItemReuniao as d_lim, 
					   u.Ind_ReaberturaReuniao as active 
					from REUNIAO_T1000_Reuniao as u 
						LEFT JOIN REUNIAO_T1600_ParticipanteReuniao as p
						ON p.Cd_Reuniao = u.Cd_Reuniao
					WHERE
						p.Nm_ParticipanteReuniao like '%PPP%'
						or  u.Ind_ReaberturaReuniao = 1
					order by d_ini desc
					offset OOO rows 
					fetch next LLL rows only
					`.replace(/OOO/g,offset.toString()).replace(/LLL/g,ITEMS_PER_PAGE.toString()).replace(/PPP/g,query);
		const reunioes = await mssql(myreq);
		return (
			reunioes
		)
	} catch (error) {
		console.log('Database Error:',error);
		throw new Error('Failed to fetch Reunioes');
	}
}

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
		console.log ('Database error', error);
		throw new Error('Failed to fetch Participant number');
	}
}

export async function fetchParticipantes (query: string) {
	try {
		const myreq = `SELECT 
						Cd_Participante as id,
						Nm_participante as name
					FROM REUNIAO_T4000_Participantes 
					WHERE
					  Nm_Participante like '%PPP%'
					`.replace(/PPP/g,query);
		const participantes = await mssql(myreq);
		return participantes;
	} catch(error) {
		console.log ('Database error', error);
		throw new Error('Failed to fetch Participant number');
	}
}

export async function fetchNiveis () {
	const myreq = "SELECT Cd_NivelUsuarioSistema as idniv, Nm_NivelUsuarioSistema as niv from REUNIAO_T3300_NivelUsuarioSistema";
	try {
	const niveis = await mssql(myreq) as Niveis[];
	return niveis;
	} catch (error) {
		console.log ('Database error', error);
		throw new Error('Failed to fetch niveis list');
	}
}

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
		console.error('Database error', error);
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
		console.log('Database Error:',error);
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
		console.log('Database Error:',error);
		throw new Error('Failed to fecth User');
	}
}

export async function fetchParticipantesListPages (query: string) {
	try {
		const myreq = `SELECT COUNT(*) as n 
		             FROM REUNIAO_T4000_Participantes 
					 where 
					   Nm_Participante like '%QQQ%' 
					`.replace(/QQQ/g,query);
		console.log(myreq);
		const count = await mssql(myreq) as Numres[] ;
	const totalPages = Math.ceil(Number(count[0].n) / ITEMS_PER_PAGE);
	return totalPages;
	} catch (error) {
		console.error('Database error', error);
		throw new Error('Failed to fetch total number of users');
	}
}

export async function fetchFilteredParticipantesList (
	query: string, 
	currentPage: number,
)  {
        const offset = (currentPage - 1) * ITEMS_PER_PAGE;
	try {
	const myreq = `SELECT  
	                     u.Nm_Participante as name,
						 u.Cd_Participante as id
				FROM REUNIAO_T4000_Participantes as u					
				WHERE 
					u.Nm_Participante like '%QQQ%' 
					order by u.Nm_Participante
					offset OOO rows 
					fetch next LLL rows only
				`.replace(/QQQ/g,query).replace (/LLL/g,ITEMS_PER_PAGE.toString()).replace (/OOO/g,offset.toString());

	const participantes = await mssql(myreq);
	return (
		participantes
	)
	} catch(error) {
		console.log('Database Error:',error);
		throw new Error('Failed to fetch total number of users');
	}
}	