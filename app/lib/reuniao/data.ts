'use server'

import { mssql } from '@/app/lib/db';
import { Numres, Reunioes, OrdemDia, AssuntoParameters, Assuntos } from '@/app/lib/definitions';
import { mylog } from '../mylogger';
import { Banca, Credito, DisciplinaEspecial, ItemReuniaoResponse, PrazoName } from './definitions';



const ITEMS_PER_PAGE = 5;
const filename='/app/lib/reuniao/data';

type numericanswer = { n : number};


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
        mylog ("ERROR", filename, "fetchReunioesPages","error=",error);
        throw new Error('Failed to fetch Reunioes pages');
    } 
}

export async function fetchNextReuniao () 
{
    mylog("DBG",filename,'fetchNextReuniao',' fetching next Reuniao number','...')   ;
    type correctanswer = { n: number};
    {/* type badanswer = {error: string};
    
    type answer = correctanswer[] | badanswer; */}
    
    try {
        const myreq = "select max(Cd_Reuniao) + 1 as n from REUNIAO_T1000_Reuniao";
        const nextreuniao = await mssql(myreq) as correctanswer[];
        return (nextreuniao[0].n);
    } catch(error) {
        mylog ("ERROR", filename, "fetchNextReuniao","error=",error);
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
        mylog ("ERROR", filename, "fetchReuniaoById","error=",error);
        throw new Error('Failed to fetch Reunioes');
    }
}

export async function fetchParticipantesByReuniaoPages (id:number)
{
    const myreq = `Select count(1) as n from REUNIAO_T1600_ParticipanteReuniao where Cd_Reuniao = ${id}`;
    const count = await mssql(myreq) as Numres[] ;
    mylog("DBG",filename,"fetchParticipantesByReuniaoPages","count",count)
    const totalPages = Math.ceil(Number(count[0].n) / ITEMS_PER_PAGE);
    return totalPages;
}


export async function fetchParticipantesByReuniao (id: number, currentPage: number)
{
    mylog("DBG",filename,"fetchParticipantesByReuniao","{id,currentPage}=",{id,currentPage})
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
        mylog ("ERROR", filename, "fetchParticipantesByReuniao","error=",error);
        throw new Error('Failed to fetch Reunioes');
    }
}

export async function fetchFilteredPauta     (id: number, query: string, currentPage: number)
{
    mylog("DBG",filename,"fetchFilteredPauta","{id, query, currentPage}=",{id, query, currentPage})
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    if (isNaN(+query) || query.trim() === '') {
    try {
        const myreq = `Select 
            ip.Cd_ItemReuniao as iid,
            ip.nm_Interessado as interessado, 
            ip.Cd_AssuntoReuniao as assuntoId,
            a.Ds_AssuntoAtaReuniao as assunto,
            ip.Ds_AreaInteressado as area
        from 
            Reuniao_T1010_ItemReuniao as ip 
        inner join Reuniao_T0200_AssuntoReuniao as a
        on ip.Cd_AssuntoReuniao = a.Cd_AssuntoReuniao
        where ip.cd_reuniao = ${id} and (ip.nm_Interessado like '%${query}%' or ip.Cd_AssuntoReuniao like '%${query}%')
        order by ip.cd_assuntoReuniao, ip.Cd_ItemReuniao, ip.nm_Interessado 
        offset ${offset} rows fetch next ${ITEMS_PER_PAGE} rows only`;
        mylog("DBG",filename,"fetchFilteredPauta","myreq=",myreq.replace(/\s/g," "));
        const pauta = await mssql(myreq);
        mylog("DBG",filename,"fetchFilteredPauta","pauta=",pauta);
        return (pauta)
    } catch (error) {
        mylog ("ERROR", filename, "fetchFilteredPauta","error=",error);
        throw new Error('Failed to fetch Pauta');
    }
} else {
    mylog("ERROR",filename,"fetchFilteredPauta","query is not numeric", {id,query,currentPage});
    try {        
            const myreq = `Select 
            ip.Cd_ItemReuniao as iid,
            ip.nm_Interessado as interessado, 
            ip.Cd_AssuntoReuniao as assuntoId,
            a.Ds_AssuntoAtaReuniao as assunto,
            ip.Ds_AreaInteressado as area
        from 
            Reuniao_T1010_ItemReuniao as ip 
        inner join Reuniao_T0200_AssuntoReuniao as a
        on ip.Cd_AssuntoReuniao = a.Cd_AssuntoReuniao
        where ip.cd_reuniao = ${id} and (ip.nm_Interessado like '%${query}%' or ip.Cd_AssuntoReuniao = ${query})
        order by ip.cd_assuntoReuniao, ip.Cd_ItemReuniao, ip.nm_Interessado 
        offset ${offset} rows fetch next ${ITEMS_PER_PAGE} rows only`;
        mylog("DBG",filename,"fetchFilteredPauta","myreq=",myreq.replace(/\s/g," "));
        const pauta = await mssql(myreq);
        mylog("DBG",filename,"fetchFilteredPauta","pauta=",pauta);
        return (pauta)
    } catch (error) {
        mylog ("ERROR", filename, "fetchFilteredPauta","error=",error);
        throw new Error('Failed to fetch Pauta');
    }
}
}

export async function fetchAssuntoParameters ()
{    const myreq = `select
    Cd_ParametroAssuntoReuniao as id, 
    Ind_Interessado,
    Ind_Orientador,
    Ind_Defesa,
    Ind_PlanoTrabalho,
    Ind_BancaExaminadora,
    Ind_Relator,
    Ind_AtribuiCreditos,
    Ind_CredenciamentoDisciplina,
    Ind_SolicitaPrazo,
    Ind_AdReferendum,
    Ind_Deliberacao,
    Ind_ObservacaoNaoPublicavel,
    Ind_ObservacaoAssunto,
    Ind_MotivoAssunto,
    Ind_NovoPlano,
    Ind_NovoOrientador,
    Ind_NovoProfessor,
    Ind_DataDeposito,
    Ind_DisertacaoTese,
    Ind_DataApresentacao,
    Ind_Estagio,
    Ind_DisciplinaEspecial
    from REUNIAO_T1200_ParametroAssuntoReuniao`
    try {        const parameters = await mssql(myreq) as AssuntoParameters[];  
        return (parameters)
    } catch (error) {
        mylog ("ERROR", filename, "fetchAssuntoParameters","error=",error);
        throw new Error('Failed to fetch Assunto Parameters');
    }
}

export async function fetchAssuntos() {
    const myreq = `select Cd_AssuntoReuniao as id, concat(Cd_AssuntoReuniao,' - ',Ds_AssuntoAtaReuniao) as assunto from REUNIAO_T0200_AssuntoReuniao`;
    try {
        const assuntos = await mssql(myreq) as Assuntos[];   
        return (assuntos)
    } catch (error) {
        mylog ("ERROR", filename, "fetchAssuntos","error=",error);  
        throw new Error('Failed to fetch Assuntos');
    }  
}

export async function fetchIndices() {
    const myreq = `select 
    Ind_Interessado,
    Ind_Orientador,
    Ind_Defesa,
    Ind_PlanoTrabalho,
    Ind_BancaExaminadora,
    Ind_Relator,
    Ind_AtribuiCreditos,
    Ind_CredenciamentoDisciplina,
    Ind_SolicitaPrazo,
    Ind_AdReferendum,
    Ind_Deliberacao,
    Ind_ObservacaoNaoPublicavel,
    Ind_ObservacaoAssunto,
    Ind_MotivoAssunto,
    Ind_NovoPlano,
    Ind_NovoOrientador,
    Ind_NovoProfessor,
    Ind_DataDeposito,
    Ind_DissertacaoTese,
    Ind_DataApresentacao,
    Ind_Estagio,
    Ind_DisciplinaEspecial
     from REUNIAO_T1200_ParametroAssuntoReuniao`
       ;
    try {
        const indices = await mssql(myreq) as AssuntoParameters[];  
        return (indices)
    } catch (error) {
        mylog ("ERROR", filename, "fetchIndices","error=",error);
        throw new Error('Failed to fetch Indices');
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
        mylog ("DBG", filename, "fetchFilteredReunioes","myreq=", myreq.replace(/\s/g," "));
        const reunioes = await mssql(myreq);
        mylog ("DBG", filename, "fetchFilteredReunioes","reunioes=", reunioes);
        return (
            reunioes
        )
    } catch (error) {
        mylog ("ERROR", filename, "fetchFilteredReunioes","error=",error);
        throw new Error('Failed to fetch Reunioes');
    }
}

//  Ordem do Dia da Reuniao
export async function fetchOrdemDiaPages (id: string) {
	mylog("DBG",filename,'fetchOrdemDiaPages','id=',id);
	const myreq = `SELECT COUNT(*) as n FROM REUNIAO_T1500_OrdemDia where cd_reuniao='${id}'`;
	try {
		const count = await mssql(myreq) as Numres[] ;
		mylog("DBG",filename,'fetchOrdemDiaPages','number of records=',count[0].n);
		const totalPages = Math.ceil(count[0].n / ITEMS_PER_PAGE);
		return (totalPages);
	} catch (error) {
		mylog ("ERROR", filename, "fetchOrdemDiaPages","error=",error);
		throw new Error('Failed to fetch Number of Ordem do Dia');
	} 
}

export async function fetchItemObject (irid: number) {
    mylog("DBG",filename,"fetchItemObject","irid = ",irid)
    if (irid) {
    const myreq = `select * from reuniao_t1010_itemreuniao where cd_itemreuniao = ${irid}`;
    try {
        const item = await mssql(myreq) as ItemReuniaoResponse[];
        const toreturn = item[0] ? item[0] : null;
        const myreq2 = `select * from REUNIAO_T0900_BancaExaminadoraReuniao where cd_itemreuniao = ${irid}`;
        const banca = await mssql(myreq2) as Banca[];
        if (banca && banca.length > 0 && toreturn) {
            toreturn.banca = banca as Banca[];
            mylog("ERROR",filename,"fetchItemObject","banca = ",banca)
        }
        const myreq3 = `select * from REUNIAO_T3900_AtribuidorCreditos where cd_itemreuniao = ${irid}`;
        const creditos = await mssql(myreq3) as Credito[];
        if (creditos && creditos.length > 0 && toreturn) {
            toreturn.creditos = creditos as Credito[];
            mylog("ERROR",filename,"fetchItemObject","creditos = ",creditos)
        }
        const myreq4 = `select * from REUNIAO_T3800_DisciplinaEspecial where cd_itemreuniao = ${irid}`;
        const disciplinas = await mssql(myreq4) as DisciplinaEspecial[];
        if (disciplinas && disciplinas.length > 0 && toreturn) {
            toreturn.disciplinaEspecial = disciplinas as DisciplinaEspecial[];
            mylog("ERROR",filename,"fetchItemObject","disciplinas = ",disciplinas)
        }

        return (toreturn)
    } catch (error) {
        mylog("DBG",filename,"fetchItemObject","Error",error);
        
    }
    }
}

export async function fetchPrazoNames () {
    const myreq = `select Cd_TipoSolicitacaoPrazo as id, nm_TipoSolicitacaoPrazo as name from REUNIAO_T3700_TipoSolicitacaoPrazo`;
    try {
        const prazos = await mssql(myreq) as {id: number, name: string}[] as PrazoName[];
        return (prazos)
    } catch (error) {
        mylog("DBG",filename,"fetchPrazoNames","Error",error);
        throw new Error('Failed to fetch Prazo Names');
    }
}

export async function fetchTipoAtribuidorCredito () {
    const myreq = `select Cd_TipoAtribuidorCredito as id, nm_TipoAtribuidorCredito as name from REUNIAO_T3600_TipoAtribuidorCredito`;
    try {
        const tipos = await mssql(myreq) as {id: string, name: string}[];
        return (tipos)
    } catch (error) {
        mylog("DBG",filename,"fetchTipoAtribuidorCredito","Error",error);
        throw new Error('Failed to fetch Tipo Atribuidor Creditos');
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

// Ordem do Dia da Reuniao
export async function fetchOrdemDiaById (id: number)
{
    mylog("DBG",filename,"fetchOrdemDiaById","id=",id);
    const myreq = `select 
        Cd_OrdemDia as id, 
        Cd_SequenciaOrdemDia as seq, 
        Ds_OrdemDia as assunto,
        Ds_DeliberacaoOrdemDia as deliberacao, 
        Ind_OrdemDiaPublicavel as publicavel 
        from REUNIAO_T1500_OrdemDia 
        where cd_ordemdia =${id}`;
    mylog("DBG",filename,"fetchOrdemDiaById","myreq=",myreq.replace(/\s/g," "));
    try {
        const ordemdia = await mssql(myreq) as OrdemDia[];
        mylog("DBG",filename,"fetchOrdemDiaById","ordemdia=",ordemdia);
        return(ordemdia[0])
    } catch(error) {
        mylog("ERROR",filename,"fetchOrdemDiaById","Error",error);
        throw new Error ("Failed to fetch Ordem do Dia");
    }
}

export async function fetchOrdemDiaByReuniao (id: number) 
{
    mylog("DBG",filename,"fetchOrdemDiaByReuniao","id=",id);
    const myreq = `select 
        Cd_OrdemDia as id, 
        Cd_SequenciaOrdemDia as seq, 
        Ds_OrdemDia as assunto,
        Ds_DeliberacaoOrdemDia as deliberacao, 
        Ind_OrdemDiaPublicavel as publicavel 
        from REUNIAO_T1500_OrdemDia 
        where cd_reuniao =${id}`;
    mylog("DBG",filename,"fetchOrdemDiaByReuniao","myreq=",myreq.replace(/\s/g," "));
    try {
        const ordemdia = await mssql(myreq) as OrdemDia[];
        mylog("DBG",filename,"fetchOrdemDiaByReuniao","ordemdia=",ordemdia);
        return(ordemdia)
    } catch(error) {
        mylog("ERROR",filename,"fetchOrdemDiaByReuniao","Error",error);
        throw new Error ("Failed to fetch Ordem do Dia");
    }
}


export async function getNextSequence (rid: number)
{
    mylog ("DBG", filename, "getNextSequence", "rid=",rid);
    const myreq = `select max(Cd_SequenciaOrdemDia) +1 as n FROM REUNIAO_T1500_OrdemDia where Cd_Reuniao = ${rid}`;
    mylog ("DBG", filename, "getNextSequence", "myreq=",myreq.replace(/\s/g," "));
    const nextCdArr = await mssql(myreq) as numericanswer[];
    mylog ("DBG", filename, "getNextSequence", "nextCdArr=",nextCdArr);
    const nextCd = nextCdArr[0].n? nextCdArr[0].n : 1;
    mylog ("DBG", filename, "getNextSequence", "nextCd=",nextCd);
    return nextCd;
}

export async function fetchAssuntosPages (query:string, reuniao: string, currentPage: number) {
    mylog("DBG",filename,'fetchAssuntosPages','query=',query);
    mylog("DBG",filename,'fetchAssuntosPages','reuniao=',reuniao);
    mylog("DBG",filename,'fetchAssuntosPages','currentPage=',currentPage);
    const myreq = `SELECT COUNT(*) as n FROM REUNIAO_T1010_ItemReuniao where Cd_Reuniao=${reuniao} and (nm_Interessado like '%${query}%' or Cd_AssuntoReuniao like '%${query}%')`;
    try {
        const count = await mssql(myreq) as Numres[] ;
        mylog("DBG",filename,'fetchReunioesPages','number of records=',count[0].n);
        const totalPages = Math.ceil(count[0].n / ITEMS_PER_PAGE);
        return (totalPages);
    } catch (error) {
        mylog ("ERROR", filename, "fetchReunioesPages","error=",error);
        throw new Error('Failed to fetch Reunioes pages');
    } 
}