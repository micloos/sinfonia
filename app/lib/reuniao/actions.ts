'use server';

import { z } from 'zod';
import { mssql } from '@/app/lib/db';
import { redirect } from 'next/navigation';
import { mylog } from '../mylogger';
import { getNextSequence } from '@/app/lib/reuniao/data';
import { ReuniaoState, OrdemState, ItemReuniao } from '@/app/lib/reuniao/definitions';
import { revalidatePath } from 'next/cache';
import { criarAssuntoPendente } from './pauta/actions';
import { requireAuth } from '../auth/authorization';



const filename="/app/lib/reuniao/actions";
type numericanswer = { n : number};
type charanswer = { s : string};



{/* Reunioes */}

const ReuniaoFormSchema = z.object ({
	id: z.string(),
	d_ini: z.string().datetime(),
	d_lim: z.string().datetime(),
	predio: z.string().max(40),
	sala: z.string().max(40),
	active: z.enum(['S','N']),
	d_end: z.string().datetime(),
})

const CreateReuniao = ReuniaoFormSchema.omit({active: true, d_end: true});

export async function createReuniao (prevState: ReuniaoState, formData:FormData)
{
		const session = await requireAuth('2'); // Require at least 'admin' role
		const { user } = session;
		mylog("INFO", filename, "createUser", "user=", user);
	
	mylog ("DBG", "app/lib/actions", "createReuniao", "formdata=",formData);
	
	const validatedFields = CreateReuniao.safeParse({
		id: formData.get('id'),
		d_ini: formData.get('d_ini'),
		d_lim: formData.get('d_lim'),
		predio: formData.get('predio'),
		sala: formData.get('sala'),
	});

	mylog ("DBG", "app/lib/actions", "createReuniao", "validatedFields=",validatedFields);

	if(!validatedFields.success) {
		mylog ("ERROR", "app/lib/actions", "createReuniao", "validatedFields=", validatedFields.error.flatten().fieldErrors);
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Missing Fields, failed to create',
		}
	}

	const d_ini = validatedFields.data.d_ini;
	const d_lim = validatedFields.data.d_lim;
	const id = validatedFields.data.id;
	const predio = validatedFields.data.predio;
	const sala = validatedFields.data.sala;

	mylog ("DBG", "app/lib/actions", "createReuniao", "d_ini=",d_ini);
	
	try {
		const myreq = `
		INSERT INTO REUNIAO_T1000_Reuniao 
		    (Cd_Reuniao, Dt_inicialReuniao, Dt_LimiteInclusaoItemReuniao, Ds_SalaReuniao, Ds_PredioSalaReuniao, Ind_ReaberturaReuniao, Id_Usuario)
			VALUES (${id}, '${d_ini}','${d_lim}','${sala}','${predio}','N', '${user.Ds_LoginAcessoUsuarioSistemaReuniao}')
		`;
		const answer =  mssql(myreq);
		mylog ("DBG", filename, "createReuniao", "answer=",answer);
	} catch (error) {
		mylog ("ERROR", "app/lib/actions", "createReuniao", "error=",error);
		return {
			message: 'Database Error: Nao criou Reuniao'
		};
	}
	
	redirect('/sinfonia/reuniao');
}

export async function updateReuniao (id: string, formData:FormData)
{
		const session = await requireAuth('2'); // Require at least 'admin' role
		const { user } = session;
		mylog("INFO", filename, "createUser", "user=", user);
	
	mylog ("DBG", "app/lib/reuniao/actions", "updateReuniao", "id=",id);
	mylog ("DBG", "app/lib/reuniao/actions", "updateReuniao", "formData=",formData);
	{/* Fast */}
	const myreq = `update reuniao_t1000_reuniao set
			Dt_inicialReuniao='${formData.get('d_ini')}',
			Dt_LimiteInclusaoItemReuniao='${formData.get('d_lim')}',
			Ds_SalaReuniao='${formData.get('sala')}',
			Ds_PredioSalaReuniao='${formData.get('predio')}',
			Id_Usuario = '${user.Ds_LoginAcessoUsuarioSistemaReuniao}'
			Where Cd_Reuniao = ${id}`;
	mylog ("DBG", "app/lib/reuniao/actions", "updateReuniao", "myreq=",myreq);
	try {
		const answer = await mssql(myreq);
		mylog("DBG", "app/lib/reuniao/actions","updateReuniao","answer=",answer)
	} catch (error) {
		mylog("ERROR","app/lib/reuniao/actions","updateReuniao","error=",error)
	}
	redirect ('/sinfonia/reuniao')
}


export async function editReuniao (id: string)
{
	mylog ("DBG", "app/lib/actions", "editReuniao", "id=",id);
	const goto =  "/sinfonia/reuniao/"+id+"/edit";
	redirect (goto);
}

export async function editAssuntoFromReuniao (id: string, reuniao:number)
{
	mylog ("DBG", "app/lib/actions", "editAssuntoFromReuniao", "{id,reuniao}=", {id,reuniao});
	const goto =  "/sinfonia/reuniao/"+id+"/editassunto";
	redirect (goto);
}




export async function deleteAssuntoFromReuniao (id: string) {
	mylog ("DBG", "app/lib/actions", "deleteAssuntoFromReuniao", "id=",id);
	const myreq0 = `
		DELETE FROM REUNIAO_T0900_BancaExaminadoraReuniao
		WHERE Cd_ItemReuniao = ${id}
	`;
	mylog ("DBG", "app/lib/actions", "deleteAssuntoFromReuniao", "myreq0=",myreq0.replace(/\s/g," "));
	try {
		const answer = await mssql (myreq0);
		mylog ("DBG", "app/lib/actions", "deleteAssuntoFromReuniao", "answer=",answer);
	} catch (error) {
		mylog ("INFO", "app/lib/actions", "deleteAssuntoFromReuniao", "error=",error);
	}

		const myreq1 = `
		DELETE FROM REUNIAO_T3900_AtribuidorCreditos
		WHERE Cd_ItemReuniao = ${id}
	`;
	mylog ("DBG", "app/lib/actions", "deleteAssuntoFromReuniao", "myreq1=",myreq1.replace(/\s/g," "));
	try {
		const answer = await mssql (myreq1);
		mylog ("DBG", "app/lib/actions", "deleteAssuntoFromReuniao", "answer=",answer);
	} catch (error) {
		mylog ("INFO", "app/lib/actions", "deleteAssuntoFromReuniao", "error=",error);
	}

		const myreq2 = `
		DELETE FROM REUNIAO_T3800_DisciplinaEspecial
		WHERE Cd_ItemReuniao = ${id}
	`;
	mylog ("DBG", "app/lib/actions", "deleteAssuntoFromReuniao", "myreq2=",myreq2.replace(/\s/g," "));
	try {
		const answer = await mssql (myreq2);
		mylog ("DBG", "app/lib/actions", "deleteAssuntoFromReuniao", "answer=",answer);
	} catch (error) {
		mylog ("INFO", "app/lib/actions", "deleteAssuntoFromReuniao", "error=",error);
	}


	const myreq = `
		DELETE FROM REUNIAO_T1010_ItemReuniao
		WHERE Cd_ItemReuniao = ${id}
	`;
	mylog ("DBG", "app/lib/actions", "deleteAssuntoFromReuniao", "myreq=",myreq.replace(/\s/g," "));
	try {
		const answer = await mssql (myreq);
		mylog ("DBG", "app/lib/actions", "deleteAssuntoFromReuniao", "answer=",answer);
	} catch (error) {
		mylog ("INFO", "app/lib/actions", "deleteAssuntoFromReuniao", "error=",error);
	}
	revalidatePath('/sinfonia/reuniao/pauta');
}

{/*
export async function imprimirCoisas (id:string,opcao:string) {
	mylog("DBG",filename,"imprimirCoisas","{id,opcao}",{id,opcao})
	const data:ImprimirData = { 
		tipo: opcao,
		reuniao: id,
		date : '01/01/2026'
	}
	mylog("DBG",filename,"imprimirCoisas","data",data);
	data.sala = '222';
	mylog("DBG",filename,"imprimirCoisas","data",data);
}
	*/}


export async function deleteReuniao (id: string)
{
	mylog ("DBG", "app/lib/actions", "deleteReuniao", "id=",id);
	const myreq = `
			DELETE FROM REUNIAO_T1000_Reuniao
			WHERE Cd_Reuniao = ${id}
	` 
	mylog ("DBG", "app/lib/actions", "deleteReuniao", "myreq=",myreq.replace(/\s/g," "));
	try {
		const answer = await mssql (myreq);
		mylog ("DBG", "app/lib/actions", "deleteReuniao", "answer=",answer);
	} catch (error) {
		mylog ("INFO", "app/lib/actions", "deleteReuniao", "error=",error);
	} finally {
		redirect ('/sinfonia/reuniao');
	}
}


// Reuniao Participantes


export async function escParticipante (id: string)
{
	mylog ("DBG", "app/lib/actions", "editReuniao", "id=",id);
	const goto =  "/sinfonia/reuniao/"+id+"/participantes";
	redirect (goto);
}


export async function addParticipanteToReuniao (id: number, rid: number ){
		const session = await requireAuth('2'); // Require at least 'admin' role
		const { user } = session;
		mylog("INFO", filename, "createUser", "user=", user);
	
	mylog("DBG",filename,"addParticipantesToReuniao","{id,rid}=",{id,rid} );
	const nextCdArr = await mssql("select max(Cd_ParticipanteReuniao) +1 as n FROM REUNIAO_T1600_ParticipanteReuniao") as numericanswer[];
	const nextCd = nextCdArr[0].n;
	mylog("DBG",filename,"addParticipanteToReuniao","nextCd=",nextCd);
	const userName = await mssql (`select Nm_Participante as s from REUNIAO_T4000_Participantes where Cd_Participante = ${id}`) as charanswer[];
	mylog("DBG",filename,'addParticipanteToReuniao',"userName=",userName);
	const myreq = `select Nm_ParticipanteReuniao as s from REUNIAO_T1600_ParticipanteReuniao where Nm_ParticipanteReuniao = '${userName[0].s}' and Cd_Reuniao = ${rid}`;
	mylog("DBG",filename,'addParticipanteToReuniao',"myreq=",myreq);
	const vazio = await mssql (myreq) as charanswer[];
	if (vazio.length==0) {
		mylog("DBG",filename,'addParticipanteToReuniao',"Pronto para inserir o participante ",userName[0].s);
		const myreq = `insert into REUNIAO_T1600_ParticipanteReuniao (Cd_Reuniao,Nm_ParticipanteReuniao,Cd_ParticipanteReuniao,Ds_PosicaoParticipanteReuniao, Id_Usuario) values (${rid},'${userName[0].s}',${nextCd},'Default', '${user.Ds_LoginAcessoUsuarioSistemaReuniao}')`;
		mylog("DBG",filename,'addParticipanteToReuniao',"myreq=",myreq);
		const ans = await mssql(myreq);
		mylog("DBG",filename,'addParticipanteToReuniao',"ans=",ans);
	} else {
		mylog("DBG",filename,'addParticipanteToReuniao',"Participante ja existente",vazio.length);
	}
redirect ("/sinfonia/reuniao/"+rid.toString()+"/editparticipante")

}

export async function setReuniaoFuncao(pid: number, funcao: string) {
		const session = await requireAuth('2'); // Require at least 'admin' role
		const { user } = session;
		mylog("INFO", filename, "createUser", "user=", user);
	
	mylog("DBG",filename,'setReuniaoFuncao','{pid, funcao}=',{pid,funcao});
	const myreq = `UPDATE REUNIAO_T1600_ParticipanteReuniao SET Ds_PosicaoParticipanteReuniao = '${funcao}', Id_Usuario = '${user.Ds_LoginAcessoUsuarioSistemaReuniao}' WHERE Cd_ParticipanteReuniao=${pid}`;
	const ans = await mssql(myreq);
	mylog("DBG",filename,'setReuniaoFuncao','ans=',ans);
}


// Reuniao Ordem do Dia

const OrdemFormSchema = z.object ({
	rid: z.string().regex(/^\d+$/),
	oid: z.string().regex(/^\d+$/),
	sequencia: z.string().regex(/^\d+$/),
	assunto: z.string().min(3),
	deliberacao: z.string().nullable(),
	publicavel: z.enum(['S','N']).nullable(),
})

export async function escOrdemDoDia (id: string)
{
	mylog ("DBG", "app/lib/actions", "escOrdemDoDia", "id=",id);
	const goto =  "/sinfonia/reuniao/"+id+"/ordemDia";
	redirect (goto);
}

export async function execOrdemDoDia (id: string)
{
	mylog ("INFO", "app/lib/actions", "escOrdemDoDia", "id=",id);
	const goto =  "/sinfonia/reuniao/"+id+"/execOrdemDia";
	redirect (goto);
}



export async function deleteOrdemDia (id:number,rid: number)
{
		const session = await requireAuth('2'); // Require at least 'admin' role
		const { user } = session;
		mylog("INFO", filename, "createUser", "user=", user);
	
   mylog("DBG",filename,"deleteOrdemDia","{rid,id}=",{rid,id});
   
   try {
	const myreq = `DELETE FROM REUNIAO_T1500_OrdemDia where Cd_OrdemDia = ${id}`;
	const answer = await mssql(myreq);
	mylog ("DBG",filename,"deleteOrdemDia","answer=",answer)

   } catch(error) {
	mylog("ERROR",filename,"deleteOrdemDia","Unable to delete Ordem Dia error=",error);
   }

 try {
	
	const myreq = `with newseq as 
	   (select cd_sequenciaordemdia, row_number() over (order by cd_sequenciaordemdia) 
	   as id_new from reuniao_t1500_OrdemDia
	   where cd_reuniao=${rid}) 
	   update newseq set cd_sequenciaordemdia = id_new,
	   Id_Usuario = '${user.Ds_LoginAcessoUsuarioSistemaReuniao}'
	   `
	const answer = await mssql(myreq);
	mylog ("DBG",filename,"deleteOrdemDia","answer=",answer);
	
   } catch(error) {
	mylog("ERROR",filename,"deleteOrdemDia","Unable to renumber Ordem Dia error=",error);
   }
   revalidatePath('/sinfonia/reuniao/'+rid.toString()+'/ordemDia');
   redirect ('/sinfonia/reuniao/'+rid.toString()+'/ordemDia');
}


export async function addOrdemDia (id: number, oid:string)
{
	mylog ("DBG", filename, "ordemDoDia", "id,oid=",{id,oid});
	const goto =  "/sinfonia/reuniao/"+id+"/"+oid+"/editOrdemDia";
	mylog ("DBG", filename, "ordemDoDia", "goto=",goto);
	redirect (goto);
}

export async function editOrdemDia (id: number, oid:string)
{
	mylog ("DBG", filename, "editOrdemDia", "id=",id);
	const goto =  "/sinfonia/reuniao/"+id+"/"+oid+"/editOrdemDia";
	mylog ("DBG", filename, "editOrdemDia", "goto=",goto);
	redirect (goto);
}

export async function execOrdemDia (id: number, oid:string)
{
	mylog ("DBG", filename, "execOrdemDia", "id=",id);
	const goto =  "/sinfonia/reuniao/"+id+"/"+oid+"/execOrdemDia";
	mylog ("DBG", filename, "execOrdemDia", "goto=",goto);
	redirect (goto);
}




const CreateOrdem = OrdemFormSchema.omit({sequencia: true});

export async function createOrdem (prevState: OrdemState, formData:FormData)
{
	mylog ("DBG",filename,"createOrdem","formData=",formData);
		const session = await requireAuth('2'); // Require at least 'admin' role
		const { user } = session;
		mylog("INFO", filename, "createUser", "user=", user);
	

	const validatedFields = CreateOrdem.safeParse({
		rid: formData.get('id'),
		assunto: formData.get('assunto'),
		publicavel: formData.get('publicavel'),
		oid: formData.get('oid'),
		deliberacao: formData.get('deliberacao')
	});

	if(!validatedFields.success) {
		mylog("WARN",filename,"createOrdem","validation error=",validatedFields.error.flatten().fieldErrors);
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Missing Fields, failed to create',
		}	
	}

	const rid = validatedFields.data.rid;
	const oid = validatedFields.data.oid;
	const assunto = validatedFields.data.assunto;
	const publicavel = validatedFields.data.publicavel?"S":"N";
	const deliberacao = validatedFields.data.deliberacao;
	mylog("INFO",filename,"createOrdem","validatedFields.data=",validatedFields.data);
	let sequencia = 0;
	try {
	  sequencia = await getNextSequence(Number(rid));
	} catch (error) {
		mylog("ERROR",filename,"createOrdem","error=",error);
		return {
			message: 'Nao conseguiu determinar proxima seq.'
		}
	}
	mylog("DBG",filename,"createOrdem","{rid,sequencia,assunto,publicavel}=",{rid,sequencia,assunto,publicavel});

	mylog("DBG",filename,"createOrdem","{toinsert}",{rid,sequencia,assunto,publicavel});
	// get the next sequence number if it is not set
;
	// get the next Cd_OrdemDia
	let nextCdOrdemDia = 0;
	if (oid==='0') {
	try {
		const nextCdOrdemDiaArr = await mssql("select max(Cd_OrdemDia) +1 as n FROM REUNIAO_T1500_OrdemDia") as numericanswer[];
		nextCdOrdemDia = nextCdOrdemDiaArr[0].n;
		mylog("DBG",filename,"createOrdem","nextCdOrdemDia=",nextCdOrdemDia);
	} catch (error) { 
		mylog("ERROR",filename,"createOrdem","error=",error);
		return {
			message: 'Nao conseguiu determinar proximo Cd_OrdemDia'
		}
	}
	try {
		const myreq = `
		INSERT INTO REUNIAO_T1500_OrdemDia
			(Cd_OrdemDia, Cd_Reuniao,Cd_SequenciaOrdemDia,Ds_OrdemDia,Ind_OrdemDiaPublicavel,Id_Usuario)
			VALUES (${nextCdOrdemDia},${rid},${sequencia},'${assunto}','${publicavel}', '${user.Ds_LoginAcessoUsuarioSistemaReuniao}')
		`;
		mylog("DBG",filename,"createOrdem","myreq=",myreq.replace(/\s/g," "));
		const answer = await mssql(myreq);
		mylog("DBG",filename,"createOrdem","answer=",answer)
	} catch(error) {
		mylog("INFO",filename,"createOrdem","error=",error);
		return {
			message: 'Database Error: Nao crou Ordem do Dia'
		}
	}
} else if (!deliberacao) {
	try  {
		const myreq = `
		UPDATE REUNIAO_T1500_OrdemDia 
		SET
			Ds_OrdemDia = '${assunto}',
			Id_Usuario = '${user.Ds_LoginAcessoUsuarioSistemaReuniao}'
		WHERE
		Cd_OrdemDia = '${oid}'
		`;
		mylog("DBG",filename,"createOrdem","myreq=",myreq.replace(/\s/g," "));
		const answer = await mssql(myreq);
		mylog("DBG",filename,"createOrdem","answer=",answer)
	} catch(error) {
		mylog("INFO",filename,"createOrdem","error=",error);
		return {
			message: 'Database Error: Nao crou Ordem do Dia'
		}

	}
} else {
	try  {
		const myreq = `
		UPDATE REUNIAO_T1500_OrdemDia 
		SET
			Ds_OrdemDia = '${assunto}',
			Ds_DeliberacaoOrdemDia ='${deliberacao}',
			Id_Usuario = '${user.Ds_LoginAcessoUsuarioSistemaReuniao}'
		WHERE
		Cd_OrdemDia = '${oid}'
		`;
		mylog("DBG",filename,"createOrdem","myreq=",myreq.replace(/\s/g," "));
		const answer = await mssql(myreq);
		mylog("DBG",filename,"createOrdem","answer=",answer)
	} catch(error) {
		mylog("INFO",filename,"createOrdem","error=",error);
		return {
			message: 'Database Error: Nao crou Ordem do Dia'
		}

	}
}
if (!deliberacao) {
	redirect('/sinfonia/reuniao/'+rid.toString()+'/ordemDia');
} else {
	redirect('/sinfonia/reuniao/'+rid.toString()+'/execOrdemDia');
}
}


export async function reativarReuniao (id: string)
{
		const session = await requireAuth('1'); // Require at least 'admin' role
		const { user } = session;
		mylog("INFO", filename, "createUser", "user=", user);
	
	mylog ("DBG", "app/lib/actions", "reativarReuniao", "id=",id);
	const myreq = `update reuniao_t1000_reuniao set Ind_ReaberturaReuniao = 'N', Id_Usuario = '${user.Ds_LoginAcessoUsuarioSistemaReuniao}' where Cd_Reuniao = ${id}`;
	mylog ("DBG", "app/lib/actions", "reativarReuniao", "myreq=",myreq);
	try {
		const answer = await mssql(myreq);
		mylog("DBG", "app/lib/actions","reativarReuniao","answer=",answer)
	} catch (error) {
		mylog("ERROR","app/lib/actions","reativarReuniao","error=",error)
	}
	redirect ('/sinfonia/reuniao/fechadas');
}

export async function comporPauta (id: string)
{
	mylog ("DBG", "app/lib/actions", "comporPauta", "id=",id);
	const goto = "/sinfonia/reuniao/"+id+"/pauta";
	redirect (goto);
}

export async function executarReuniao (id: string)
{
	mylog ("DBG", "app/lib/actions", "executarReuniao", "id=",id);
	const goto = "/sinfonia/reuniao/"+id+"/executar";
	redirect (goto);
}

export async function fecharReuniao (reuniao: string)
{	const session = await requireAuth('2'); // Require at least 'admin' role
	const { user } = session;
	mylog("INFO", filename, "createUser", "user=", user);

	const myreq  = `select count(1) as n from reuniao_t1010_itemreuniao where cd_reuniao = ${reuniao} and Cd_ClassificacaoDeliberacao is null`
	mylog("INFO",filename,"fecharReuniao","myreq=",myreq)
	const num = await mssql(myreq) as numericanswer[]
	mylog("INFO",filename,"fecharReuniao","Num[0] =",num[0])
	if (num[0].n != 0)
	{ 
		mylog("INFO",filename,"fecharReuniao","Num ","nao e zero")
		return {success: false, error: 'Tem assuntos não deliberados'}
	} else {

		const myreq = `update reuniao_t1000_reuniao set Ind_ReaberturaReuniao = 'S', Dt_FinalReuniao = GETDATE(), Id_Usuario = '${user.Ds_LoginAcessoUsuarioSistemaReuniao}' where cd_reuniao=${reuniao}`;

		try {
			await mssql(myreq);
			return {success: true, error: null }
		} catch {
			return {success: false, error: 'Problema no Banco de Dados'}
		}
	}

	
}


export async function executarItemReuniao (reuniao: number, id: string, assunto: string, decisao: string, toset: number)
{
		const session = await requireAuth('2'); // Require at least 'admin' role
		const { user } = session;
		mylog("INFO", filename, "createUser", "user=", user);
	
	mylog("DBG", "app/lib/actions", "executarItemReuniao", "{reuniao,id,assunto,decisao,toset}=", {reuniao,id,assunto,decisao,toset});
	if (decisao === 'positivo') {
		const myreq = `select * from REUNIAO_T1010_ItemReuniao where Cd_ItemReuniao = ${id}`
		const item = await mssql(myreq) as ItemReuniao[];
		const myreq2 = `select cd_assuntoreuniaoretornavel from reuniao_t0200_AssuntoReuniao where Cd_AssuntoReuniao = ${item[0].Cd_AssuntoReuniao}`;
		const assuntoRetornavel = await mssql(myreq2) as {cd_assuntoreuniaoretornavel: number}[];
		mylog ("DBG", "app/lib/actions", "executarItemReuniao", "item=",item);
		mylog ("DBG", "app/lib/actions", "executarItemReuniao", "assuntoRetornavel=",assuntoRetornavel);
		if (assuntoRetornavel[0].cd_assuntoreuniaoretornavel) {
		await criarAssuntoPendente(Number(item[0].Cd_ItemReuniao), assuntoRetornavel[0].cd_assuntoreuniaoretornavel);
		
		}
	}
	mylog ("DBG", "app/lib/actions", "executarItemReuniao", "{reuniao,id,assunto,decisao,toset}=", {reuniao,id,assunto,decisao,toset});
	const myreq = `update reuniao_t1010_itemreuniao set Cd_ClassificacaoDeliberacao = '${toset}', Id_Usuario = '${user.Ds_LoginAcessoUsuarioSistemaReuniao}' where Cd_ItemReuniao = ${id}`;
	mylog ("DBG", "app/lib/actions", "executarItemReuniao", "myreq=",myreq);
	try {
		const answer = await mssql(myreq);
		mylog("DBG", "app/lib/actions","executarItemReuniao","answer=",answer)
	} catch (error) {
		mylog("ERROR","app/lib/actions","executarItemReuniao","error=",error)
	}
	redirect ('/sinfonia/reuniao/'+reuniao.toString()+'/executar');
}

export async function addPendentes (id: number)
{
	const goto = "/sinfonia/reuniao/"+id+"/pauta?pendente=1";
	redirect(goto)
}


export async function reorderOrdemDiaDo (newSeq: {id: number, seq: number}[])
{
		const session = await requireAuth('2'); // Require at least 'admin' role
		const { user } = session;
		mylog("INFO", filename, "createUser", "user=", user);
	
	mylog ("DBG", filename, "reorderOrdemDia", "ordemDia}", newSeq);
	if (newSeq.length === 0) {
		mylog ("ERROR", filename, "reorderOrdemDia", "ordemDia", "is empty");
		return;
	}
	
	try {
		for (const item of newSeq) {
			const myreq = `UPDATE REUNIAO_T1500_OrdemDia SET Cd_SequenciaOrdemDia = ${item.seq}, Id_Usuario = '${user.Ds_LoginAcessoUsuarioSistemaReuniao}' WHERE Cd_OrdemDia = ${item.id}`;
			mylog ("DBG", filename, "reorderOrdemDia", "myreq=", myreq);
			await mssql(myreq);
		}
	} catch (error) {
		mylog ("ERROR", filename, "reorderOrdemDia", "error=", error);
	}
}
