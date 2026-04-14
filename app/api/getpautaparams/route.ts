'use server';

import { mssql } from '@/app/lib/db';
import { mylog } from '@/app/lib/mylogger';
import { PautaParams } from '@/app/lib/definitions';


import {type NextRequest} from 'next/server';

const filename='/api/getpautaparams';

export async function GET (request: NextRequest)
{
    const searchParams = request.nextUrl.searchParams;
    const pid = searchParams.get("pid");
    mylog ("DBG", filename, "getPautaParams", "pid=",pid);
    const myreq = `
    select 
      Cd_AssuntoReuniao as id,
      Ind_Interessado as i_interessado,
      Ind_Orientador as i_orientador,
      Ind_Defesa as i_defesa,
      Ind_PlanoTrabalho as i_plano,
      Ind_BancaExaminadora as i_banca,
      Ind_Relator as i_relator,
      Ind_AtribuiCreditos as i_a_creditos,
      Ind_CredenciamentoDisciplina as i_cred_disc,
      Ind_SolicitaPrazo as i_sol_praz,
      Ind_ADReferendum as i_addref,
      Ind_Deliberacao as i_deliber,
      Ind_ObservacaoNaoPublicavel as i_nao_pub,
      Ind_ObservacaoAssunto as i_obs,
      Ind_MotivoAssunto as i_motivo, 
      Ind_NovoPlano as i_novo_plan,
      Ind_NovoOrientador as i_novo_orient, 
      Ind_NovoProfessor as i_novo_prof,
      Ind_DataDeposito as i_data_dep,
      Ind_DissertacaoTese as i_disser_tese,
      Ind_DataApresentacao as i_data_apres,
      Ind_Estagio as i_estagio,
      Ind_DisciplinaEspecial as i_disc_esp
    
    from REUNIAO_T1200_ParametroAssuntoReuniao
    where Cd_AssuntoReuniao = ${pid}
    `;
    mylog ("DBG", filename, "getpautaparams", "myreq=",myreq.replace(/\s/g," "));
    const answer = await mssql(myreq) as PautaParams[];
    mylog ("DBG", filename, "getpautaparams", "answer=",answer);
    if (answer.length === 0) {
        mylog ("ERROR", filename, "getpautaparams", "No pauta params found for pid=",pid);
        return Response.json({ error: 'No pauta params found' }, { status: 404 });
    }
    return Response.json(answer[0]);
}