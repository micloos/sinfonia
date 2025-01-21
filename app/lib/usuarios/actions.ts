'use server';

import { z } from 'zod';
import { mssql } from '@/app/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import md5 from 'md5';
import { mylog } from '../mylogger';

const filename = 'app/lib/usuarios/actions';

{/* Usuarios */}

const UserFormSchema = z.object({
	id: z.string(),
	username: z.string().max(50),
	nome: z.string().min(3,"Nome deve ter no minimo 3 letras").max(50,"Nome deve ter no maximo 50 letras"),
	password: z.string().min(8, "password deve ter no minimo 8 letras").max(20, "deve ter no maximo 20 letras"),
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
	mylog ("DBG", filename, "createUser","formData=",formData);
	const validatedFields = CreateUser.safeParse({
		cpf: formData.get('cpf'),
		nome: formData.get('nome'),
		username: formData.get('username'),
		password: formData.get('password'),
		nivel: Number(formData.get('nivel')),
	});
	mylog ("DBG", filename, "createUser", "validatedFields=",validatedFields);

	if (!validatedFields.success) {
		mylog ("ERROR", filename, "createUser","validatedFields.error=",validatedFields.error.flatten().fieldErrors);
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
	mylog ("DBG", filename, "createUser", "myreq=",myreq.replace(/\s/g," "));
	const answer = await mssql(myreq);
	mylog ("DBG", filename, "createUser", "answer=",answer);

	} catch (error) {
		mylog ("ERROR", filename, "createUser", "DB errors=",error);
		return {
			message: 'Database Error: Nao criou usuario.'
		};
	}


	redirect('/sinfonia/administracao/usuarios');
}

const UpdateUserWithPassword = UserFormSchema.omit({ id: true, cpf: true});
const UpdateUserWithoutPassword = UserFormSchema.omit({ id: true, cpf: true, password: true});
export async function updateUser (cpf: string, formData: FormData) 
{
	mylog ("DBG", filename, "updateUser", "formData=",formData);

	if (formData.get('password') === '******') {
		mylog("DBG", filename, "updateUser","No password change"," ");
		const validatedFields = UpdateUserWithoutPassword.safeParse(
			{
				cpf: formData.get('cpf'),
				nome: formData.get('nome'),
				username: formData.get('username'),
				nivel: Number(formData.get('nivelId')),
			}
		);	
		if (!validatedFields.success) {
			mylog ("ERROR", filename, "createUser","validatedFields.error=",validatedFields.error.flatten().fieldErrors);
			return
		}
		mylog ("DBG", filename, "updateUser", "validatedFields=",validatedFields);

		const nome = validatedFields.data.nome.toString();
		const username = validatedFields.data.username.toString();
		const nivel = validatedFields.data.nivel;

		try {
			const myreq = `
				UPDATE REUNIAO_T3100_UsuarioSistemaReuniao
				SET
					Nm_UsuarioSistemaReuniao = '${nome}',
					Ds_LoginAcessoUsuarioSistemaReuniao = '${username}',
					Cd_NivelUsuarioSistema = ${nivel}
				WHERE
					Cd_UsuarioSistemaReuniao = ${cpf}
	
				`;
			mylog("DBG",filename,"updateUser","myreq = ",myreq.replace(/\s/g," "));
			const answer = await mssql(myreq);
			mylog("DBG",filename,"updateUser","answer = ",answer);
		} catch(error) {
			mylog("ERROR", filename, "updateUser","error =",error);
		}

	} else {
	const validatedFields = UpdateUserWithPassword.safeParse(
		{
			cpf: formData.get('cpf'),
			nome: formData.get('nome'),
			username: formData.get('username'),
			password: formData.get('password'),
			nivel: Number(formData.get('nivelId')),
		}
	);

	if (!validatedFields.success) {
		mylog ("ERROR", filename, "createUser","validatedFields.error=",validatedFields.error.flatten().fieldErrors);
		return
	}

	mylog ("DBG", filename, "updateUser", "validatedFields=",validatedFields);

	const nome = validatedFields.data.nome.toString();
	const password = md5(validatedFields.data.password).substr(0,20);
	const username = validatedFields.data.username.toString();
	const nivel = validatedFields.data.nivel;

	try {
		const myreq = `
			UPDATE REUNIAO_T3100_UsuarioSistemaReuniao
			SET
				Nm_UsuarioSistemaReuniao = '${nome}',
				Nr_SenhaAcessoUsuarioSistemaReuniao ='${password}',
				Ds_LoginAcessoUsuarioSistemaReuniao = '${username}',
				Cd_NivelUsuarioSistema = ${nivel}
			WHERE
				Cd_UsuarioSistemaReuniao = ${cpf}

			`;
		mylog("DBG",filename,"updateUser","myreq = ",myreq.replace(/\s/g," "));
		const answer = await mssql(myreq);
		mylog("DBG",filename,"updateUser","answer = ",answer);
	} catch(error) {
		mylog("ERROR", filename, "updateUser","error =",error);
	}
}
	

	redirect ('/sinfonia/administracao/usuarios/');
}

export async function deleteUser (cpf: string) 
{
	const myreq = `DELETE from REUNIAO_T3100_UsuarioSistemaReuniao where Cd_UsuarioSistemaReuniao = ${cpf}` ;
	mylog ("DBG", filename, "deleteUser", "myreq=",myreq);
	await mssql(myreq);
	revalidatePath('/sinfonia/administracao/usuarios');
}
