'use server';

import { redirect } from 'next/navigation';
import { mylog } from '../mylogger';
import { mssql } from '@/app/lib/db';
import { z } from 'zod';


export async function deleteAssunto(id: number) {
  const filename = "app/lib/assunto/actions.tsx";
  mylog("DBG", filename, "deleteAssunto", "id=", id);

  try {
    const myreq = `DELETE FROM REUNIAO_T0200_AssuntoReuniao WHERE Cd_AssuntoReuniao = ${id}`;
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
  nome: z.string().min(8, "Nome é obrigatório"),
  descricao: z.string().min(8, "Descrição é obrigatória"),
  retornavel:z.union([z.string().regex(/^\d+$/, "Retorno deve ser numerico"), z.literal('').transform(() => null  )]),
  modeloDespacho: z.union([z.string().regex(/^\d+$/, "Modelo de Despacho deve ser Numerico"), z.literal('').transform(() => null)]),
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
  id: z.string().regex(/^\d+$/, "ID deve ser numérico"),
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
    id: id,
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
        Cd_AssuntoReuniaoRetornavel = ${validatedFields.data.retornavel} ,
        Cd_ModeloDespacho = ${validatedFields.data.modeloDespacho} 
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
}

  export async function createAssunto(prevState: AssuntoState, formData: FormData) {
    const filename = "app/lib/assunto/actions.tsx";
    mylog("DBG", filename, "createAssunto", "formData=", formData);
    mylog("DBG", filename, "createAssunto", "prevState=", prevState);
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
      id: formData.get('id'),
    }
    );
    if (!validatedFields.success) {
      mylog("ERROR", filename, "createAssunto", "validatedFields=", validatedFields.error.flatten().fieldErrors);
      return {message: "Validation failed", errors: validatedFields.error.flatten().fieldErrors};
    }

    try {
      let myreq = "";
 
        myreq = `
        INSERT INTO REUNIAO_T0200_AssuntoReuniao (CD_AssuntoReuniao, Ds_AssuntoAtaReuniao, Ds_AssuntoDeliberacao, Cd_AssuntoReuniaoRetornavel, Cd_ModeloDespacho)
        VALUES (${validatedFields.data.id},  '${validatedFields.data.nome}','${validatedFields.data.descricao}', ${validatedFields.data.retornavel}, ${validatedFields.data.modeloDespacho})
      `;
      
      mylog("DBG", filename, "createAssunto", "myreq=", myreq.replace(/\s/g, " "));
      const answer = await mssql(myreq);
      mylog("DBG", filename, "createAssunto", "answer=", answer);
    } catch (error) {
      mylog("ERROR", filename, "createAssunto", "error=", error);
      return {message: "Database error while creating Assunto"};
    }

    try {
      const myreq = `
        INSERT INTO REUNIAO_T1200_ParametroAssuntoReuniao (Cd_AssuntoReuniao, Ind_Interessado, Ind_Orientador, Ind_Defesa, Ind_PlanoTrabalho, Ind_BancaExaminadora, Ind_Relator, Ind_AtribuiCreditos, Ind_CredenciamentoDisciplina, Ind_SolicitaPrazo, Ind_ADReferendum, Ind_Deliberacao, Ind_ObservacaoNaoPublicavel, Ind_ObservacaoAssunto, Ind_MotivoAssunto, Ind_NovoPlano, Ind_NovoOrientador, Ind_NovoProfessor, Ind_DataDeposito, Ind_DissertacaoTese, Ind_DataApresentacao, Ind_Estagio, Ind_DisciplinaEspecial)
        VALUES ('${validatedFields.data.id}',  '${validatedFields.data.ind_interessado}', '${validatedFields.data.ind_orientador}', '${validatedFields.data.ind_defesa}', '${validatedFields.data.ind_plano}', '${validatedFields.data.ind_banca}', '${validatedFields.data.ind_relator}', '${validatedFields.data.ind_a_creditos}', '${validatedFields.data.ind_cred_disc}', '${validatedFields.data.ind_sol_praz}', '${validatedFields.data.ind_addref}', '${validatedFields.data.ind_deliber}', '${validatedFields.data.ind_nao_pub}', '${validatedFields.data.ind_obs}', '${validatedFields.data.ind_motivo}', '${validatedFields.data.ind_novo_plan}', '${validatedFields.data.ind_novo_orient}', '${validatedFields.data.ind_novo_prof}', '${validatedFields.data.ind_data_dep}', '${validatedFields.data.ind_disser_tese}', '${validatedFields.data.ind_data_apres}', '${validatedFields.data.ind_estagio}', '${validatedFields.data.ind_disc_esp}')
      `;
      mylog("DBG", filename, "createAssunto", "myreq=", myreq.replace(/\s/g, " "));
      const answer = await mssql(myreq);
      mylog("DBG", filename, "createAssunto", "answer=", answer);
    } catch (error) {
      mylog("ERROR", filename, "createAssunto", "error=", error);
      return {message: "Database error while creating Assunto parameters"};
    }

    redirect('/sinfonia/administracao/assuntos');
  
}

export type AssuntoState = {
	errors?: {
		nome?: string[];
		descricao?: string[];
		retornavel?: string[];
		modeloDespacho?: string[];
		ind_interessado?: string[];
    ind_orientador?: string[];
    ind_defesa?: string[];
    ind_plano?: string[];
    ind_banca?: string[];
    ind_relator?: string[];
    ind_a_creditos?: string[];
    ind_cred_disc?: string[];
    ind_sol_praz?: string[];
    ind_addref?: string[];
    ind_deliber?: string[];
    ind_nao_pub?: string[];
    ind_obs?: string[];
    ind_motivo?: string[];
    ind_novo_plan?: string[];
    ind_novo_orient?: string[];
    ind_novo_prof?: string[];
    ind_data_dep?: string[];
    ind_disser_tese?: string[];
    ind_data_apres?: string[];
    ind_estagio?: string[];
    ind_disc_esp?: string[];
};
	message?: string | null;
}