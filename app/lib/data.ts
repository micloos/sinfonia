import { mssql } from '@/app/lib/db';
import { UserType, Niveis, Numres, Reunioes, ParticipanteType, OrdemDia } from '@/app/lib/definitions';
import { mylog } from './mylogger';



const ITEMS_PER_PAGE = 5;
const filename='/app/lib/data';

{/* Reunioes */}

export async function fetchReunioesPages (query: string, active:number) {
	mylog("DBG",filename,'fetchReunioesPages','active=',active);
	const reabertura = (active==0)?'N':'S';
	const myreq = `SELECT COUNT(*) as n FROM REUNIAO_T1000_Reuniao where Ind_ReaberturaReuniao='${reabertura}'`;
	try {
		const count = await mssql(myreq) as Numres[] ;
		mylog("DBG",filename,'fetchReunioesPages','number of records=',count[0].n);
		const totalPages = Math.ceil(count[0].n / ITEMS_PER_PAGE);
		return (totalPages);
	} catch (error) {
		mylog ("ERROR", "app/lib/dat", "fetchReunioesPages","error=",error);
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
		mylog ("ERROR", "app/lib/dat", "fetchNextReuniao","error=",error);
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
		mylog ("ERROR", "app/lib/dat", "fetchReuniaoById","error=",error);
		throw new Error('Failed to fetch Reunioes');
	}
}

export async function fetchParticipantesByReuniaoPages (id:number)
{
	const myreq = `Select count(1) as n from REUNIAO_T1600_ParticipanteReuniao where Cd_Reuniao = ${id}`;
	const count = await mssql(myreq) as Numres[] ;
	mylog("DBG","app/lib/data","fetchParticipantesByReuniaoPages","count",count)
	const totalPages = Math.ceil(Number(count[0].n) / ITEMS_PER_PAGE);
	return totalPages;
}


export async function fetchParticipantesByReuniao (id: number, currentPage: number)
{
	mylog("DBG","app/lib/data","fetchParticipantesByReuniao","{id,currentPage}=",{id,currentPage})
	const offset = (currentPage - 1) * ITEMS_PER_PAGE;
	try {
		const myreq = `Select
		  part.Cd_ParticipanteReuniao as id,
		  part.Nm_ParticipanteReuniao as name,
		  part.Ds_PosicaoParticipanteReuniao as title
		from REUNIAO_T1600_ParticipanteReuniao as part
		inner join REUNIAO_T4600_ParticipantePosicao as pos
		on (part.Ds_PosicaoParticipanteReuniao = pos.Ds_PosicaoParticipanteReuniao)
		where part.Cd_Reuniao = ${id}
		order by pos.Cd_Posicao
		offset ${offset} rows
		fetch next ${ITEMS_PER_PAGE} rows only`;
		const participantes = await mssql(myreq);
		return (participantes)
	} catch (error) {
		mylog ("ERROR", "app/lib/dat", "fetchParticipantesByReuniao","error=",error);
		throw new Error('Failed to fetch Reunioes');
	}
}

export async function fetchFilteredReunioes (
	query: string, 
	currentPage: number,
	active: string,
)  {
	const offset = (currentPage - 1) * ITEMS_PER_PAGE;
	try {
		const myreq = `Select 
		               distinct u.Cd_Reuniao as id, 
					   u.Dt_InicialReuniao as d_ini, 
					   u.Dt_FinalReuniao as d_end, 
					   u.Ds_SalaReuniao as sala, 
					   u.Ds_PredioSalaReuniao as predio, 
					   u.Dt_LimiteInclusaoItemReuniao as d_lim, 
					   u.Ind_ReaberturaReuniao as active,
					   u.Nr_sequenciaReaberturaReuniao as sequencia
					from REUNIAO_T1000_Reuniao as u 
						LEFT JOIN REUNIAO_T1600_ParticipanteReuniao as p
						ON p.Cd_Reuniao = u.Cd_Reuniao
					WHERE
					   u.Ind_ReaberturaReuniao = 'AAA'
					order by d_ini desc
					offset OOO rows 
					fetch next LLL rows only
					`.replace(/OOO/g,offset.toString()).replace(/LLL/g,ITEMS_PER_PAGE.toString()).replace(/PPP/g,query).replace(/AAA/g,active);
		mylog ("DBG", "app/lib/dat", "fetchFilteredReunioes","myreq=", myreq.replace(/\s/g," "));
		const reunioes = await mssql(myreq);
		mylog ("DBG", "app/lib/dat", "fetchFilteredReunioes","reunioes=", reunioes);
		return (
			reunioes
		)
	} catch (error) {
		mylog ("ERROR", "app/lib/dat", "fetchFilteredReunioes","error=",error);
		throw new Error('Failed to fetch Reunioes');
	}
}

{/* Niveis */}

export async function fetchNiveis () {
	const myreq = "SELECT Cd_NivelUsuarioSistema as idniv, Nm_NivelUsuarioSistema as niv from REUNIAO_T3300_NivelUsuarioSistema";
	try {
	const niveis = await mssql(myreq) as Niveis[];
	return niveis;
	} catch (error) {
		mylog ("ERROR", "app/lib/dat", "fetchNiveis","error=",error);
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
		mylog ("ERROR", "app/lib/dat", "fetchUsersPages","error=",error);
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
		mylog ("ERROR", "app/lib/dat", "fetchFilteredUsers","error=",error);
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
		mylog ("ERROR", "app/lib/dat", "fetchUserById","error=",error);
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
		mylog ("ERROR", "app/lib/dat", "fetchParticipantesPages","error=",error);
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

export async function fetchOrdemDiaPages (id: string) {
	mylog("DBG",filename,'fetchOrdemDiaPages','id=',id);
	const myreq = `SELECT COUNT(*) as n FROM REUNIAO_T1500_OrdemDia where cd_reuniao='${id}'`;
	try {
		const count = await mssql(myreq) as Numres[] ;
		mylog("DBG",filename,'fetchReunioesPages','number of records=',count[0].n);
		const totalPages = Math.ceil(count[0].n / ITEMS_PER_PAGE);
		return (totalPages);
	} catch (error) {
		mylog ("ERROR", "app/lib/dat", "fetchReunioesPages","error=",error);
		throw new Error('Failed to fetch Number of Ordem do Dia');
	} 
}

export async function fetchOrdemDia (id: number, currentPage: number) 
{
	mylog("DBG",filename,"fetchOrdemDia","{id, currentPage}=",{id,currentPage});
	const offset = (currentPage - 1) * ITEMS_PER_PAGE;
	const myreq = `select 
		Cd_OrdemDia as id, 
		Cd_SequenciaOrdemDia as seq, 
		Ds_OrdemDia as assunto,
		Ds_DeliberacaoOrdemDia as deliberacao, 
		Ind_OrdemDiaPublicavel as publicavel 
		from REUNIAO_T1500_OrdemDia 
		where cd_reuniao =${id}
		order by seq
		offset ${offset} rows
		fetch next ${ITEMS_PER_PAGE} rows only`;
	mylog("DBG",filename,"fetchOrdemDia","myreq=",myreq.replace(/\s/g," "));
	try {
		const ordemdia = await mssql(myreq) as OrdemDia[];
		mylog("DBG",filename,"fetchOrdemDia","ordemdia=",ordemdia);
		return(ordemdia)
	} catch(error) {
		mylog("ERROR",filename,"fetchOrdemDia","Error",error);
		throw new Error ("Failed to fetch Ordem do Dia");
	}

}

