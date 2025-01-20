'use server';

import { z } from 'zod';
import { mssql } from '@/app/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { mylog } from '../mylogger';

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
	mylog ("DBG", "app/lib/actions", "deleteFromParticipantesList", "myreq=",myreq);
	await mssql(myreq);
	revalidatePath('/sinfonia/administracao/participantes');
}



const CreateParticipante = ParticipanteFormSchema.omit({id: true})

export async function createParticipante (prevState: ParticipanteState, formData:FormData)
{
	mylog("DBG","app/lib/actions","createParticipantes","formdata=",formData);
	const validatedFields = CreateParticipante.safeParse({
		nome: formData.get('nome'),
	});
	
	mylog ("DBG", "app/lib/actions", "createParticipante", "validatedFields=",validatedFields);

	if(!validatedFields.success) {
		mylog ("ERROR", "app/lib/actions", "createParticipante", "validatedFields=", validatedFields.error.flatten().fieldErrors);
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Missing Fields, failed to create',
		}
	}

	const nome = validatedFields.data.nome;
	mylog ("DBG", "app/lib/actions", "createParticipante", "nome=",nome);

	try {
		const myreq = `
		INSERT INTO REUNIAO_T4000_Participantes
		(Nm_Participante)
		VALUES ('${nome}')
		`;
		const answer = await mssql(myreq);
		mylog ("DBG", "app/lib/actions", "createParticipante", "answer=",answer);
	} catch (error) {
		mylog ("ERROR", "app/lib/actions", "createParticipante", "error=",error);
		return {
			message: 'Database Error: Nao criou Participante'
		};
	};

	redirect('/sinfonia/administracao/participantes');

}


export async function participantes (id: string)
{
	mylog ("DBG", "app/lib/actions", "participantes", "id=",id);
	const goto =  "/sinfonia/reuniao/participantes/"+id+"/edit";
	redirect (goto);
}

export async function escParticipant (id: string)
{
	mylog ("DBG", "app/lib/actions", "participantes", "id=",id);
	const goto =  "/sinfonia/reuniao/participantes/"+id+"/edit";
	redirect (goto);
}

export async function updateParticipante (id: string, formData:FormData) {
	mylog("DBG","app/lib/participantes/actions","updateParticipantes","formdata=",formData);
	mylog("DBG","app/lib/participantes/actions","updateParticipantes","id=",id);
}