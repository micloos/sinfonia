'use server';

import { z } from 'zod';
import { mssql } from '@/app/lib/db';
import { redirect } from 'next/navigation';
import { mylog } from '../mylogger';

const filename="/app/lib/reuniao/actions"

{/* Reunioes */}

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

export type ReuniaoState = {
	errors?: {
		d_ini?: string[];
		sala?: string[];
		id?: string[];
		predio?: string[];
		d_lim?: string[];
	};
	message?: string | null;
} 

const ReuniaoFormSchema = z.object ({
	id: z.string(),
	d_ini: z.string().datetime(),
	d_lim: z.string().datetime(),
	predio: z.string().max(40),
	sala: z.string().max(40),
	active: z.enum(['S','N']),
	d_end: z.string().datetime(),
})

export async function editReuniao (id: string)
{
	mylog ("DBG", "app/lib/actions", "editReuniao", "id=",id);
	const goto =  "/sinfonia/reuniao/"+id+"/edit";
	redirect (goto);
}

type numericanswer = { n : number};
type charanswer = { s : string};

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
redirect ("/sinfonia/reuniao/"+rid.toString()+"/edit")

}

export async function setReuniaoFuncao(pid: number, funcao: string) {
	mylog("DBG",filename,'setReuniaoFuncao','{pid, funcao}=',{pid,funcao});
	const myreq = `UPDATE REUNIAO_T1600_ParticipanteReuniao SET Ds_PosicaoParticipanteReuniao = '${funcao}' WHERE Cd_ParticipanteReuniao=${pid}`;
	const ans = await mssql(myreq);
	mylog("DBG",filename,'setReuniaoFuncao','ans=',ans);
}

export async function escOrdemDoDia (id: string)
{
	mylog ("DBG", "app/lib/actions", "escOrdemDoDia", "id=",id);
	redirect ('/proto');
}

export async function reativarReuniao (id: string)
{
	mylog ("DBG", "app/lib/actions", "reativarReuniao", "id=",id);
	redirect ('/proto');
}

export async function comporPauta (id: string)
{
	mylog ("DBG", "app/lib/actions", "comporPauta", "id=",id);
	redirect ('/proto');
}

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
		mylog ("DBG", "app/lib/actions", "createReuniao", "answer=",answer);
	} catch (error) {
		mylog ("ERROR", "app/lib/actions", "createReuniao", "error=",error);
		return {
			message: 'Database Error: Nao criou Reuniao'
		};
	}
	
	redirect('/sinfonia/reuniao');
}

export async function updateReuniao (id: string)
{
	mylog ("DBG", "app/lib/actions", "updateReuniao", "id=",id);
	redirect ('/proto')
}
