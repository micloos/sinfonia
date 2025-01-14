'use server';

import { z } from 'zod';
import { mssql } from '@/app/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import md5 from 'md5';
{/*
import { AuthError } from 'next-auth';
import { signIn } from '@/auth';
*/}


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


{/*
const ParticipanteListSchema = z.object({
	id: z.number(),
	name: z.string().min(3,"Nome deve ter no minimo 3 letras").max(50,"Nome deve ter no maximo 50 letras"),
})
	*/}
	


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
	console.log ( "DBG: [", Date(),"] lib/actions createUser, formData",formData);
	const validatedFields = CreateUser.safeParse({
		cpf: formData.get('cpf'),
		nome: formData.get('nome'),
		username: formData.get('username'),
		password: formData.get('password'),
		nivel: formData.get('nivel'),
	});
	console.log ( "DBG: [", Date(),"] lib/actions createUser, validateFields",validatedFields);

	if (!validatedFields.success) {
		console.log("functionC createUser, validatedFields.error", validatedFields.error.flatten().fieldErrors);
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

	console.log("DBG: [", Date(),"] lib/actions createUser: cpf, password",cpf,password );
		
	try {
		const myreq = `
		INSERT INTO REUNIAO_T3100_UsuarioSistemaReuniao (Cd_UsuarioSistemaReuniao, Nm_UsuarioSistemaReuniao, Nr_SenhaAcessoUsuarioSistemaReuniao, Ds_LoginAcessoUsuarioSistemaReuniao, Cd_NivelUsuarioSistema)
		VALUES (${cpf}, '${nome}', '${password}', '${username}',${nivel})
		`;
	console.log(myreq);
	const answer = await mssql(myreq);
	console.log("function createUser: answer=",answer);

	} catch (error) {
		console.log("function createUser database error=", error);
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
    console.log("function updateUser: cpf=", cpf);
	console.log ("function updateUser: validateFields=",validatedFields);
	{/*
	try {
	await mssql`
	  UPDATE invoices
	  SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
	  WHERE id = ${id} `;

	} catch (error) {
		return {
			message: 'Database Error: Failed to update Invoice.'
		};
	}
		*/}
	redirect ('/administracao/usuarios/proto');
}

export async function deleteUser (cpf: string) 
{
	const myreq = `DELETE from REUNIAO_T3100_UsuarioSistemaReuniao where Cd_UsuarioSistemaReuniao = ${cpf}` ;
	console.log(myreq);
	await mssql(myreq);
	revalidatePath('/administracao/usuarios');
}

export async function deleteParticipantesList (id: number) 
{
	const myreq = `DELETE from REUNIAO_T4000_Participantes where Cd_Participante = ${id}` ;
	console.log(myreq);
	await mssql(myreq);
	revalidatePath('/administracao/participantes');
}

{/*
export async function authenticate(
	prevState: string | undefined,
	formData: FormData,
) {
	console.log ( "DBG: [", Date(),"] lib/actions, authenticate",prevState,formData);
	try {  
		await signIn('credentials', formData);
	} catch(error) {
		console.log ( "DBG: [", Date(),"] lib/actions, authenticate error",error);
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


export async function deleteReuniao (id: string)
{
	console.log("deleteReuniao",id);
	redirect ('/proto');
}

export async function escParticipant (id: string)
{
	console.log("escParticipant",id);
	const goto =  "/reuniao/participantes/"+id+"/edit";
	console.log ("escParticipant =", goto);
	redirect (goto);
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
	console.log("editReuniao",id)
	const goto =  "/reuniao/"+id+"/edit";
	console.log ("editReuniao =", goto);
	redirect (goto);
}

export async function escOrdemDoDia (id: string)
{
	console.log("escOrdemDoDia",id);
	redirect ('/proto');
}

export async function reativarReuniao (id: string)
{
	console.log("reativarReuniao",id);
	redirect ('/proto');
}

export async function comporPauta (id: string)
{
	console.log("comporPauta",id);
	redirect ('/proto');
}

const CreateReuniao = ReuniaoFormSchema.omit({active: true, d_end: true});

export async function createReuniao (prevState: ReuniaoState, formData:FormData)
{
	console.log ( "DBG: [", Date(),"] lib/actions createReuniao, formData",formData);	
	
	const validatedFields = CreateReuniao.safeParse({
		id: formData.get('id'),
		d_ini: formData.get('d_ini'),
		d_lim: formData.get('d_lim'),
		predio: formData.get('predio'),
		sala: formData.get('sala'),
	});

	console.log ( "DBG: [", Date(),"] lib/actions createReuniao, validatedFields", validatedFields);

	if(!validatedFields.success) {
		console.log ( "DBG: [", Date(),"] lib/actions createReuniao, validatedFields.error", validatedFields.error.flatten().fieldErrors);
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
	console.log ( "DBG: [", Date(),"] lib/actions createReuniao, d_ini", d_ini);
	
	try {
		const myreq = `
		INSERT INTO REUNIAO_T1000_Reuniao 
		    (Cd_Reuniao, Dt_inicialReuniao, Dt_LimiteInclusaoItemReuniao, Ds_SalaReuniao, Ds_PredioSalaReuniao, Ind_ReaberturaReuniao)
			VALUES (${id}, '${d_ini}','${d_lim}','${sala}','${predio}','N')
		`;
		const answer = await mssql(myreq);
		console.log ( "DBG: [", Date(),"] lib/actions createReuniao, answer", answer);
	} catch (error) {
		console.log ( "DBG: [", Date(),"] lib/actions createReuniao, error", error);
		return {
			message: 'Database Error: Nao criou Reuniao'
		};
	}
	
	redirect('/sinfonia/reuniao');
}

export async function updateReuniao (id: string)
{
	console.log("updateReuniao",id);
	redirect ('/proto')
}