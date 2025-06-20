'use server';

import { z } from 'zod';
import { mssql } from '@/app/lib/db';
import { redirect } from 'next/navigation';
import { mylog } from '../mylogger';

import { getNextSequence } from '@/app/lib/reuniao/data';
import { ReuniaoState, OrdemState } from '@/app/lib/reuniao/definitions';
import { revalidatePath } from 'next/cache';


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
		    (Cd_Reuniao, Dt_inicialReuniao, Dt_LimiteInclusaoItemReuniao, Ds_SalaReuniao, Ds_PredioSalaReuniao, Ind_ReaberturaReuniao)
			VALUES (${id}, '${d_ini}','${d_lim}','${sala}','${predio}','N')
		`;
		const answer = await mssql(myreq);
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
	mylog ("DBG", "app/lib/reuniao/actions", "updateReuniao", "id=",id);
	mylog ("DBG", "app/lib/reuniao/actions", "updateReuniao", "formData=",formData);
	{/* Fast */}
	const myreq = `update reuniao_t1000_reuniao set
			Dt_inicialReuniao='${formData.get('d_ini')}',
			Dt_LimiteInclusaoItemReuniao='${formData.get('d_lim')}',
			Ds_SalaReuniao='${formData.get('sala')}',
			Ds_PredioSalaReuniao='${formData.get('predio')}'
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
		const myreq = `insert into REUNIAO_T1600_ParticipanteReuniao (Cd_Reuniao,Nm_ParticipanteReuniao,Cd_ParticipanteReuniao,Ds_PosicaoParticipanteReuniao) values (${rid},'${userName[0].s}',${nextCd},'Default')`;
		mylog("DBG",filename,'addParticipanteToReuniao',"myreq=",myreq);
		const ans = await mssql(myreq);
		mylog("DBG",filename,'addParticipanteToReuniao',"ans=",ans);
	} else {
		mylog("DBG",filename,'addParticipanteToReuniao',"Participante ja existente",vazio.length);
	}
redirect ("/sinfonia/reuniao/"+rid.toString()+"/editparticipante")

}

export async function setReuniaoFuncao(pid: number, funcao: string) {
	mylog("DBG",filename,'setReuniaoFuncao','{pid, funcao}=',{pid,funcao});
	const myreq = `UPDATE REUNIAO_T1600_ParticipanteReuniao SET Ds_PosicaoParticipanteReuniao = '${funcao}' WHERE Cd_ParticipanteReuniao=${pid}`;
	const ans = await mssql(myreq);
	mylog("DBG",filename,'setReuniaoFuncao','ans=',ans);
}


// Reuniao Ordem do Dia

const OrdemFormSchema = z.object ({
	rid: z.string().regex(/^\d+$/),
	sequencia: z.string().regex(/^\d+$/),
	assunto: z.string().min(5),
	deliberacao: z.string().min(3),
	publicavel: z.enum(['S','N']).nullable(),
})

export async function escOrdemDoDia (id: string)
{
	mylog ("DBG", "app/lib/actions", "escOrdemDoDia", "id=",id);
	const goto =  "/sinfonia/reuniao/"+id+"/ordemDia";
	redirect (goto);
}



export async function deleteOrdemDia (id:number,rid: number)
{
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
	   update newseq set cd_sequenciaordemdia = id_new
	   `
	const answer = await mssql(myreq);
	mylog ("DBG",filename,"deleteOrdemDia","answer=",answer);
	
   } catch(error) {
	mylog("ERROR",filename,"deleteOrdemDia","Unable to renumber Ordem Dia error=",error);
   }
   revalidatePath('/sinfonia/reuniao/'+rid.toString()+'/ordemDia');
   redirect ('/sinfonia/reuniao/'+rid.toString()+'/ordemDia');
}


export async function addOrdemDia (id: number)
{
	mylog ("DBG", filename, "ordemDoDia", "id=",id);
	const goto =  "/sinfonia/reuniao/"+id+"/addOrdemDia";
	mylog ("DBG", filename, "ordemDoDia", "goto=",goto);
	redirect (goto);
}

export async function editOrdemDia (id: number)
{
	mylog ("DBG", filename, "editOrdemDia", "id=",id);
	const goto =  "/sinfonia/reuniao/"+id+"/editOrdemDia";
	mylog ("DBG", filename, "editOrdemDia", "goto=",goto);
	redirect (goto);
}





const CreateOrdem = OrdemFormSchema.omit({deliberacao: true, sequencia: true});

export async function createOrdem (prevState: OrdemState, formData:FormData)
{
	mylog ("DBG",filename,"createOrdem","formData=",formData);

	const validatedFields = CreateOrdem.safeParse({
		rid: formData.get('id'),
		assunto: formData.get('assunto'),
		publicavel: formData.get('publicavel')
	});

	if(!validatedFields.success) {
		mylog("WARN",filename,"createOrdem","validation error=",validatedFields.error.flatten().fieldErrors);
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Missing Fields, failed to create',
		}	
	}

	const rid = validatedFields.data.rid;
	
	const assunto = validatedFields.data.assunto;
	const publicavel = validatedFields.data.publicavel?"S":"N";
	mylog("DBG",filename,"createOrdem","validatedFields.data=",validatedFields.data);
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
			(Cd_OrdemDia, Cd_Reuniao,Cd_SequenciaOrdemDia,Ds_OrdemDia,Ind_OrdemDiaPublicavel)
			VALUES (${nextCdOrdemDia},${rid},${sequencia},'${assunto}','${publicavel}')
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

	redirect('/sinfonia/reuniao/'+rid.toString()+'/ordemDia');
}


export async function reativarReuniao (id: string)
{
	mylog ("DBG", "app/lib/actions", "reativarReuniao", "id=",id);
	redirect ('/proto');
}

export async function comporPauta (id: string)
{
	mylog ("DBG", "app/lib/actions", "comporPauta", "id=",id);
	const goto = "/sinfonia/reuniao/"+id+"/pauta";
	redirect (goto);
}

export async function reorderOrdemDiaDo (newSeq: {id: number, seq: number}[])
{
	mylog ("DBG", filename, "reorderOrdemDia", "ordemDia}", newSeq);
	if (newSeq.length === 0) {
		mylog ("ERROR", filename, "reorderOrdemDia", "ordemDia", "is empty");
		return;
	}
	
	try {
		for (const item of newSeq) {
			const myreq = `UPDATE REUNIAO_T1500_OrdemDia SET Cd_SequenciaOrdemDia = ${item.seq} WHERE Cd_OrdemDia = ${item.id}`;
			mylog ("DBG", filename, "reorderOrdemDia", "myreq=", myreq);
			await mssql(myreq);
		}
	} catch (error) {
		mylog ("ERROR", filename, "reorderOrdemDia", "error=", error);
	}
}
