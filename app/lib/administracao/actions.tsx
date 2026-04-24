'use server';

import { redirect } from 'next/navigation';
import { mylog } from '../mylogger';
import { mssql } from '@/app/lib/db';
import { z } from 'zod';

export async function deleteAssunto(id: number) {
  const filename = "app/lib/assunto/actions.tsx";
  mylog("DBG", filename, "deleteAssunto", "id=", id);

  try {
    const myreq = `DELETE FROM REUNIAO_T3200_Assuntos WHERE Id_Assunto = ${id}`;
    mylog("DBG", filename, "deleteAssunto", "myreq=", myreq.replace(/\s/g, " "));
    const answer = await mssql(myreq);
    // const answer = "await mssql(myreq)";
    mylog("DBG", filename, "deleteAssunto", "answer=", answer);
  } catch (error) {
    mylog("ERROR", filename, "deleteAssunto", "error=", error);
    
  }

  redirect('/sinfonia/administracao/assuntos');
}

export async function parametrizeAssunto(id: number) {
  const filename = "app/lib/assunto/actions.tsx";
  mylog("DBG", filename, "parametrizeAssunto", "id=", id);
  const goto =  "/sinfonia/administracao/assuntos/"+id+"/parametrize";
	redirect (goto);
}
  
export async function editAssunto(id: number) {
  const filename = "app/lib/assunto/actions.tsx";
  mylog("DBG", filename, "editAssunto", "id=", id);
}

const AdminAssuntoFormSchema = z.object({
  nome: z.string().min(8, "Nome is required"),
  descricao: z.string().min(8, "Descrição is required"),
  retornavel:z.union([z.string().regex(/^\d+$/, "Retornável must be a number"), z.literal('')]),
  modeloDespacho: z.union([z.string().regex(/^\d+$/, "Modelo de Despacho must be a number"), z.literal('')]),
  ind_interessado: z.enum(['S', 'N']).default('N'),
  ind_orientador: z.enum(['S', 'N']).default('N'),
  ind_defesa: z.enum(['S', 'N']).default('N'),
  ind_plano: z.enum(['S', 'N']).default('N'),
  ind_banca: z.enum(['S', 'N']).default('N'),
  ind_relator: z.enum(['S', 'N']).default('N'),
  ind_a_creditos: z.enum(['S', 'N']).default('N'),
  ind_cred_disc: z.enum(['S', 'N']).default('N'),
  ind_sol_praz: z.enum(['S', 'N']).default('N'),
  ind_addref: z.enum(['S', 'N']).default('N'),
  ind_deliber: z.enum(['S', 'N']).default('N'),
  ind_nao_pub: z.enum(['S', 'N']).default('N'),
  ind_obs: z.enum(['S', 'N']).default('N'),
  ind_motivo: z.enum(['S', 'N']).default('N'),
  ind_novo_plan: z.enum(['S', 'N']).default('N'),
  ind_novo_orient: z.enum(['S', 'N']).default('N'),
  ind_novo_prof: z.enum(['S', 'N']).default('N'),
  ind_data_dep: z.enum(['S', 'N']).default('N'),
  ind_disser_tese: z.enum(['S', 'N']).default('N'),
  ind_data_apres: z.enum(['S', 'N']).default('N'),
  ind_estagio: z.enum(['S', 'N']).default('N'),
  ind_disc_esp: z.enum(['S', 'N']).default('N'),
});

export async function updateAssunto(id: string, formData: FormData) {
  const filename = "app/lib/assunto/actions.tsx";
  mylog("DBG", filename, "updateAssunto", "id=", id);
  mylog("DBG", filename, "updateAssunto", "formData=", formData);
  const validatedFields = AdminAssuntoFormSchema.safeParse ({
    nome: formData.get('nome'),
    descricao: formData.get('descricao'),
    retornavel: formData.get('retornavel'),
    modeloDespacho: formData.get('modeloDespacho'),
    ind_interessado: formData.get('ind_interessado') || 'N',
    ind_orientador: formData.get('ind_orientador') || 'N',
    ind_defesa: formData.get('ind_defesa') || 'N',
    ind_plano: formData.get('ind_plano') || 'N',
    ind_banca: formData.get('ind_banca') || 'N',
    ind_relator: formData.get('ind_relator') || 'N',
    ind_a_creditos: formData.get('ind_a_creditos') || 'N',
    ind_cred_disc: formData.get('ind_cred_disc') || 'N',
    ind_sol_praz: formData.get('ind_sol_praz') || 'N',
    ind_addref: formData.get('ind_addref') || 'N',
    ind_deliber: formData.get('ind_deliber') || 'N',
    ind_nao_pub: formData.get('ind_nao_pub') || 'N',
    ind_obs: formData.get('ind_obs') || 'N',
    ind_motivo: formData.get('ind_motivo') || 'N',
    ind_novo_plan: formData.get('ind_novo_plan') || 'N',
    ind_novo_orient: formData.get('ind_novo_orient') || 'N',
    ind_novo_prof: formData.get('ind_novo_prof') || 'N',
    ind_data_dep: formData.get('ind_data_dep') || 'N',
    ind_disser_tese: formData.get('ind_disser_tese') || 'N',
    ind_data_apres: formData.get('ind_data_apres') || 'N',
    ind_estagio: formData.get('ind_estagio') || 'N',
    ind_disc_esp: formData.get('ind_disc_esp') || 'N',
  }
  );
  if (!validatedFields.success) {
    mylog("ERROR", filename, "updateAssunto", "validatedFields=", validatedFields.error.flatten().fieldErrors);
    return;
  }
  mylog("DBG", filename, "updateAssunto", "validatedFields=", validatedFields.data);

  try {
    const myreq = `
      UPDATE REUNIAO_T0200_AssuntoReuniao
      SET 
        Ds_AssuntoAtaReuniao = '${validatedFields.data.nome}',
        Ds_AssuntoDeliberacao = '${validatedFields.data.descricao}',
        Cd_AssuntoReuniaoRetornavel = '${validatedFields.data.retornavel}' ,
        Cd_ModeloDespacho = '${validatedFields.data.modeloDespacho}' 
      Where Cd_AssuntoReuniao = ${id}
    `;
    mylog("DBG", filename, "updateAssunto", "myreq=", myreq.replace(/\s/g, " "));
    const answer = await mssql(myreq);
    mylog("DBG", filename, "updateAssunto", "answer=", answer);
  } catch (error) {
    mylog("ERROR", filename, "updateAssunto", "error=", error);
  }
  try {    const myreq = `
      UPDATE REUNIAO_T1200_ParametroAssuntoReuniao
      SET
        Ind_Interessado = '${validatedFields.data.ind_interessado}',
        Ind_Orientador = '${validatedFields.data.ind_orientador}',
        Ind_Defesa = '${validatedFields.data.ind_defesa}',
        Ind_PlanoTrabalho = '${validatedFields.data.ind_plano}',
        Ind_BancaExaminadora = '${validatedFields.data.ind_banca}',
        Ind_Relator = '${validatedFields.data.ind_relator}',
        Ind_AtribuiCreditos = '${validatedFields.data.ind_a_creditos}',
        Ind_CredenciamentoDisciplina = '${validatedFields.data.ind_cred_disc}',
        Ind_SolicitaPrazo = '${validatedFields.data.ind_sol_praz}',
        Ind_ADReferendum = '${validatedFields.data.ind_addref}',
        Ind_Deliberacao = '${validatedFields.data.ind_deliber}',
        Ind_ObservacaoNaoPublicavel = '${validatedFields.data.ind_nao_pub}',
        Ind_ObservacaoAssunto = '${validatedFields.data.ind_obs}',
        Ind_MotivoAssunto = '${validatedFields.data.ind_motivo}',
        Ind_NovoPlano = '${validatedFields.data.ind_novo_plan}',
        Ind_NovoOrientador = '${validatedFields.data.ind_novo_orient}',
        Ind_NovoProfessor = '${validatedFields.data.ind_novo_prof}',
        Ind_DataDeposito = '${validatedFields.data.ind_data_dep}',
        Ind_DissertacaoTese = '${validatedFields.data.ind_disser_tese}',
        Ind_DataApresentacao = '${validatedFields.data.ind_data_apres}',
        Ind_Estagio = '${validatedFields.data.ind_estagio}',
        Ind_DisciplinaEspecial = '${validatedFields.data.ind_disc_esp}'
      Where Cd_AssuntoReuniao = ${id}`;
    mylog("DBG", filename, "updateAssunto", "myreq=", myreq.replace(/\s/g, " "));
    const answer = await mssql(myreq);
    mylog("DBG", filename, "updateAssunto", "answer=", answer);
  } catch (error) {
    mylog("ERROR", filename, "updateAssunto", "error=", error);
  }
  
  redirect('/sinfonia/administracao/assuntos');
  
}