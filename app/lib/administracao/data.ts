import { mssql } from '@/app/lib/db';
import { AdminAssuntoType, AdminAssuntoParametersType } from '@/app/lib/definitions';
import { mylog } from '../mylogger';

const filename = 'app/lib/administracao/data';

export async function fetchAssuntoById(id: number) {
    const myreq = `SELECT 
        CD_AssuntoReuniao as id, 
        Ds_AssuntoAtaReuniao as nome, 
        Ds_AssuntoDeliberacao as descricao,
        Cd_AssuntoReuniaoRetornavel as retornavel,
        Cd_ModeloDespacho as modeloDespacho 
        FROM REUNIAO_T0200_AssuntoReuniao WHERE Cd_AssuntoReuniao = ${id}`;
    try {
        const assunto = await mssql(myreq) as AdminAssuntoType[];
        return assunto[0];
    } catch (error) {
        mylog("ERROR", filename, "fetchAssuntoById", "error=", error);
        throw new Error('Failed to fetch Assunto by ID');
    }
}

export async function fetchAssuntoParametersById(id: number) {
    const myreq = `SELECT Ind_Interessado as ind_interessado,
        Ind_Orientador as ind_orientador,
        Ind_Defesa as ind_defesa,
        Ind_PlanoTrabalho as ind_plano,
        Ind_BancaExaminadora as ind_banca,
        Ind_Relator as ind_relator,
        Ind_AtribuiCreditos as ind_a_creditos,
        Ind_CredenciamentoDisciplina as ind_cred_disc,
        Ind_SolicitaPrazo as ind_sol_praz,
        Ind_ADReferendum as ind_addref,
        Ind_Deliberacao as ind_deliber,
        Ind_ObservacaoNaoPublicavel as ind_nao_pub,
        Ind_ObservacaoAssunto as ind_obs,
        Ind_MotivoAssunto as ind_motivo,
        Ind_NovoPlano as ind_novo_plan,
        Ind_NovoOrientador as ind_novo_orient,
        Ind_NovoProfessor as ind_novo_prof,
        Ind_DataDeposito as ind_data_dep,
        Ind_DissertacaoTese as ind_disser_tese,
        Ind_DataApresentacao as ind_data_apres,
        Ind_Estagio as ind_estagio,
        Ind_DisciplinaEspecial as ind_disc_esp
     FROM REUNIAO_T1200_ParametroAssuntoReuniao WHERE Cd_AssuntoReuniao = ${id}`;
    try {
        const params = await mssql(myreq) as AdminAssuntoParametersType[];
        return params[0];
    } catch (error) {
        mylog("ERROR", filename, "fetchAssuntoParametersById", "error=", error);
        throw new Error('Failed to fetch Assunto parameters by ID');
    }
}