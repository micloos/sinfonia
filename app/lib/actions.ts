'use server';

import { z } from 'zod';
import { mssql } from '@/app/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import md5 from 'md5';
import { mylog } from './mylogger';

{/*
import { AuthError } from 'next-auth';
import { signIn } from '@/auth';
*/}

{/* Usuarios */}

const UserFormSchema = z.object({
	id: z.string(),
	username: z.string().max(50),
	nome: z.string().min(3,"Nome deve ter no minimo 3 letras").max(50,"Nome deve ter no maximo 50 letras"),
	password: z.string().min(6, "password deve ter no minimo 6 letras").max(20, "deve ter no maximo 20 letras"),
	cpf: z.string({required_error: 'CPF é obrigatório'})
	      .refine((doc)=> {
			const replacedDoc = doc.replace(/\D/g, '');
			return replacedDoc.length >= 11;
		  }, 'CPF/CNPJ deve conter no mínimo 11 caracteres.')
          .refine((doc) => {
            const replacedDoc = doc.replace(/\D/g, '');
            return replacedDoc.length <= 14;
          }, 'CPF/CNPJ deve conter no máximo 14 caracteres.')
          .refine((doc) => {
            const replacedDoc = doc.replace(/\D/g, '');
            return !!Number(replacedDoc);
          }, 'CPF/CNPJ deve conter apenas números.'),
	nivel: z.number().min(1).max(3),
});



	


export type UserState = {
	errors?: {
		nome?: string[];
		password?: string[];
		username?: string[];
		nivel?: string[];
		cpf?:string[];
			};
	message?: string | null;
}

const CreateUser = UserFormSchema.omit({id: true}); 

export async function createUser (prevState: UserState, formData: FormData) 
{ 
	mylog ("DBG", "app/lib/actions", "createUser","formData=",formData);
	const validatedFields = CreateUser.safeParse({
		cpf: formData.get('cpf'),
		nome: formData.get('nome'),
		username: formData.get('username'),
		password: formData.get('password'),
		nivel: formData.get('nivel'),
	});
	mylog ("DBG", "app/lib/actions", "createUser", "validatedFields=",validatedFields);

	if (!validatedFields.success) {
		mylog ("ERROR", "app/lib/actions", "createUser","validatedFields.error=",validatedFields.error.flatten().fieldErrors);
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Missing Fields, failed to create',
		}
	}
	
	const cpf = validatedFields.data.cpf;
	const nome = validatedFields.data.nome.toString();
	const password = md5(validatedFields.data.password).substr(0,20);
	const username = validatedFields.data.username.toString();
	const nivel = validatedFields.data.nivel;
		
	try {
		const myreq = `
		INSERT INTO REUNIAO_T3100_UsuarioSistemaReuniao (Cd_UsuarioSistemaReuniao, Nm_UsuarioSistemaReuniao, Nr_SenhaAcessoUsuarioSistemaReuniao, Ds_LoginAcessoUsuarioSistemaReuniao, Cd_NivelUsuarioSistema)
		VALUES (${cpf}, '${nome}', '${password}', '${username}',${nivel})
		`;
	mylog ("DBG", "app/lib/actions", "createUser", "myreq=",myreq.replace(/\s/g," "));
	const answer = await mssql(myreq);
	mylog ("DBG", "app/lib/actions", "createUser", "answer=",answer);

	} catch (error) {
		mylog ("ERROR", "app/lib/actions", "createUser", "DB errors=",error);
		return {
			message: 'Database Error: Nao criou usuario.'
		};
	}


	redirect('/sinfonia/administracao/usuarios');
}

const UpdateUser = UserFormSchema.omit({ id: true, cpf: true});

export async function updateUser (cpf: string, formData: FormData) 
{

	const validatedFields = UpdateUser.safeParse(
		{
			cpf: formData.get('cpf'),
			nome: formData.get('nome'),
			username: formData.get('username'),
			password: formData.get('password'),
			nivel: formData.get('nivel'),
		}
	);
	mylog ("DBG", "app/lib/actions", "updateUser", "NOT WORKING YET",cpf);
	mylog ("DBG", "app/lib/actions", "updateUser", "validatedFields=",validatedFields);

	redirect ('/administracao/usuarios/proto');
}

export async function deleteUser (cpf: string) 
{
	const myreq = `DELETE from REUNIAO_T3100_UsuarioSistemaReuniao where Cd_UsuarioSistemaReuniao = ${cpf}` ;
	mylog ("DBG", "app/lib/actions", "deleteUser", "myreq=",myreq);
	await mssql(myreq);
	revalidatePath('/sinfonia/administracao/usuarios');
}

export async function deleteFromParticipantesList (id: number) 
{
	const myreq = `DELETE from REUNIAO_T4000_Participantes where Cd_Participante = ${id}` ;
	mylog ("DBG", "app/lib/actions", "deleteFromParticipantesList", "myreq=",myreq);
	await mssql(myreq);
	revalidatePath('/sinfonia/administracao/participantes');
}

{/*
export async function authenticate(
	prevState: string | undefined,
	formData: FormData,
) {
	mylog ("DBG", "app/lib/actions", "authenticate", "formData=",formData);
	try {  
		await signIn('credentials', formData);
	} catch(error) {
		mylog ("INFO", "app/lib/actions", "authenticate", "error=",error);
		if (error instanceof AuthError) {
			switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid Credentials.';
                default:
                    return 'Something went wrong.';
			}
					}
		throw error;
	}
}
*/}

{/* Participantes */}


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


{/* Reunioes */}

export async function deleteReuniao (id: string)
{
	mylog ("DBG", "app/lib/actions", "deleteReuniao", "id=",id);
	{/*
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
       */}
	redirect ('/proto');
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
