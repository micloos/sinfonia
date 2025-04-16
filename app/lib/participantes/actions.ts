'use server';

import { z } from 'zod';
import { mssql } from '@/app/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { mylog } from '../mylogger';

const filename = 'app/lib/participantes/actions'

{/* Participantes Usuais */}

const ParticipanteFormSchema = z.object({
	id: z.number(),
	nome: z.string().min(3,"Nome deve ter no minimo 3 letras").max(100,"Nome deve ter no maximo 100 letras"),
})

export type ParticipanteState = {
	errors?: {
		nome?: string[];
	};
	message?: string | null;
}

export async function deleteFromParticipantesList (id: number) 
{
	const myreq = `DELETE from REUNIAO_T4000_Participantes where Cd_Participante = ${id}` ;
	mylog ("DBG", filename, "deleteFromParticipantesList", "myreq=",myreq);
	await mssql(myreq);
	revalidatePath('/sinfonia/administracao/participantes');
}



const CreateParticipante = ParticipanteFormSchema.omit({id: true})

export async function createParticipante (prevState: ParticipanteState, formData:FormData)
{
	mylog("DBG",filename,"createParticipantes","formdata=",formData);
	const validatedFields = CreateParticipante.safeParse({
		nome: formData.get('nome'),
	});
	
	mylog ("DBG", filename, "createParticipante", "validatedFields=",validatedFields);

	if(!validatedFields.success) {
		mylog ("ERROR", filename, "createParticipante", "validatedFields=", validatedFields.error.flatten().fieldErrors);
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Missing Fields, failed to create',
		}
	}

	const nome = validatedFields.data.nome;
	mylog ("DBG", filename, "createParticipante", "nome=",nome);

	try {
		const myreq = `
		INSERT INTO REUNIAO_T4000_Participantes
		(Nm_Participante)
		VALUES ('${nome}')
		`;
		mylog ("DBG", filename, "createParticipante","myreq=",myreq.replace(/\s/g," "));
		const answer = await mssql(myreq);
		mylog ("DBG", filename, "createParticipante", "answer=",answer);
	} catch (error) {
		mylog ("ERROR", filename, "createParticipante", "error=",error);
		return {
			message: 'Database Error: Nao criou Participante'
		};
	};

	redirect('/sinfonia/administracao/participantes');

}




export async function escParticipant (id: number)
{
	mylog ("DBG", filename, "escParticipant", "id=",id);
	const goto =  "/sinfonia/reuniao/"+id+"/participantes?rid="+id;
	redirect (goto);
}

export async function escParticipantReuniao (id: number)
{
	mylog ("DBG", filename, "participantes", "id=",id);
	const goto =  "/sinfonia/reuniao/"+id+"/editparticipante?rid="+id;
	redirect (goto);
}

export async function escParticipantForReuniao (id: number)
{
	mylog ("DBG", filename, "participantes", "id=",id);
	const goto =  "/sinfonia/reuniao/"+id+"/reuniaoparticipantes?rid="+id;
	redirect (goto);
}

export async function updateParticipante (id: string, formData:FormData) {
	mylog("DBG","app/lib/participantes/actions","updateParticipantes","formdata=",formData);
	mylog("DBG","app/lib/participantes/actions","updateParticipantes","id=",id);

	const validatedFields = CreateParticipante.safeParse({
		nome: formData.get('nome'),
	});
	
	if(!validatedFields.success) {
		mylog ("ERROR", filename, "updateParticipante", "validatedFields=", validatedFields.error.flatten().fieldErrors);
		{/*
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Missing Fields, failed to create',
		}
			*/}
		return
	}
	const nome = validatedFields.data.nome;
	const nid = Number(id);

	try {
		const myreq =`
		UPDATE REUNIAO_T4000_Participantes 
		SET
		   Nm_Participante = '${nome}'
		WHERE
		   Cd_Participante = ${nid}
		`
		mylog("DBG","app/lib/participantes/actions","updateParticipantes","myreq=",myreq.replace(/\s/g," "));
		const answer = await mssql(myreq);
		mylog("DBG","app/lib/participantes/actions","updateParticipantes","answer=",answer);
	} catch(error) {
		mylog("ERROR","app/lib/participantes/actions","updateParticipantes","error=",error);
		return 
		{/*
			message: 'Database Error: Nao Salvou Participante'
		*/}
	}

	revalidatePath('/sinfonia/administracao/participantes');
	redirect('/sinfonia/administracao/participantes');
	
}

export async function deleteParticipantFromReuniao (id: number, rid: number) {
	mylog("DBG",filename,'deleteParticipantFromReuniao','id=',id);
	const myreq = `DELETE FROM REUNIAO_T1600_ParticipanteReuniao where Cd_ParticipanteReuniao = ${id}`;
	mylog("DBG",filename,'deleteParticipantFromReuniao','myreq=',myreq);
	const answer = mssql(myreq);
	mylog("DBG",filename,'deleteParticipantFromReuniao','answer=',answer);

	revalidatePath('/sinfonia/reuniao/'+rid.toString()+'/editparticipante');
	redirect('/sinfonia/reuniao/'+rid.toString()+'/editparticipante');
}