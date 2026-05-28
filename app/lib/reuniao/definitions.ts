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

export type OrdemState = {
    errors?: {
        // sequencia?: string[];
        assunto?: string[];      
        publicavel?: string[];
    };
    message?: string | null;
}

export interface Banca  {
    id_ExaminadorBanca: string;
    nm_ExaminadorBanca: string;
    ds_LotExaminadorBanca: string;
    Cd_TipoExaminador: number;
}

export type BancaFormData = Omit<Banca, 'id_ExaminadorBanca'>;

export type Relator = {
    nm_Relator: string;
    ds_ObservacaoRelator: string;
    ds_LotRelator: string;
}

export type TituloTese = {
    ds_TituloDissertacaoTese: string;
}

export type Assunto = {
    cd_AssuntoReuniao: string;
}

export type MotivoAssunto = {
    ds_MotivoItem: string;
}

export type NovoOrientador = {
    nm_NovoOrientador: string;
}

export type NovoPlano = {
    ds_TituloPlanoTrabalho_NovoPlano: string;
}

export type NovoProfessor = {
    nm_CredNovoProfessor: string;
}

export type CredenciamentoDisciplina = {
    ds_CredenciamentoDisciplina: string;
    Nm_CredProfessorResponsavel: string;
}

export type Defesa = {
    Dt_Defesa: string;
}

export type Deposito = {
    dt_Deposito: string;
}


export interface AddPautaFormData {
  bancaMembers: Banca[];
  interessado: Interessado;
  adReferendum: AdReferendumType;
  apresentacao: Apresentacao;
  planotrabalho: Plano;
  orientador: Orientador;
  observacao: Observacao;
  observacaoNP: ObservacaoNP;
  relatorData: Relator;
  cd_AssuntoReuniao: Assunto;
  ds_TituloDissertacaoTese: TituloTese;
  ds_MotivoItem: MotivoAssunto;
  novoOrientador: NovoOrientador;
  novoPlano: NovoPlano;
  novoProfessor: NovoProfessor; 
  credenciamentoDisciplina: CredenciamentoDisciplina;
  defesa: Defesa;
  deposito: Deposito;
}

export type ItemReuniaoResponse = {
    Ind_AdReferendum: string;
    ds_AdReferendum: string;
    dt_AdReferendum: string;
    ds_CredenciamentoDisciplina: string;
    Nm_CredProfessorResponsavel: string;
    Nm_CredNovoProfessor: string;
    Dt_Defesa: string;
    Cd_ClassificacaoDeliberacao: string;
    Ds_ObservacaoDeliberacao: string;
    nm_Interessado: string;
    nm_Orientador: string;
    ds_MotivoItem: string;
    ds_ObservacaoItem: string;
    ds_ObservacaoNaoPublicavelItem: string;
    nm_Relator: string;
    ds_ObservacaoRelator: string;
    nm_NovoOrientador: string;
    Cd_TipoSolicitacaoPrazo: string;
    qt_SolicitacaoPrazoDiasSolicitados: string;
    qt_SolicitacaoPrazoDiasConcedidos: string;
    Cd_AssuntoReuniao: string;
    ds_AreaInteressado: string;
    ds_NivelInteressado: string;
    ds_LotOrientador: string;
    ds_LotRelator: string;
    cd_Reuniao: string;
    dt_Deposito: string;
    ds_TituloDissertacaoTese: string;
    ds_TituloPlanoTrabalho: string;
    ds_TituloPlanoTrabalho_NovoPlano: string;
    dt_Apresentacao: string;
    ds_EstagioDisciplina: string;
    dt_EstagioPeriodoInicio: string;
    dt_EstagioPeriodoFim: string;
    qt_EstagioCreditos: string;
    cd_ReuniaoOrigem: string;
    banca: Banca[];
}

export type Observacao = {
    ds_ObservacaoItem: string;
}

export type ObservacaoNP = {
    ds_ObservacaoNaoPublicavelItem: string;
}


export type Plano = {
    ds_TituloPlanoTrabalho: string;
}

export type Orientador = {
    nm_orientador: string;
    ds_LotOrientador: string;
}

export type Interessado = {
    nm_interessado: string;
    ds_areainteressado: string;
    ds_nivelinteressado: string;
}

export type AdReferendumType = {
    ind_adreferendum: string;
    ds_AdReferendum: string;
    dt_AdReferendum: string;
}

export type Apresentacao = {
    dt_apresentacao: string;
}

{/* ds_areainteressado?: string[];
        ds_nivelinteressado?: string[];
        nm_orientador?: string[];
        ds_LotOrientador?: string[];
        ind_adreferendum?: string[];
        ds_AdReferendum?: string[];
        dt_AdReferendum?: string[];
        dt_defesa?: string[]; */}



export type ItemReuniaoState = {
    errors?: {
        nm_interessado?: string[];
    };
    message?: string | null;
}

export type ItemReuniao = {
    cd_itemreuniao: string;
    cd_reuniao: string;
    cd_assuntoreuniao?: string;
    // Interessado
        nm_interessado?: string;
        ds_areainteressado?: string;
        ds_nivelinteressado?: string;
    // Orientador
        nm_orientador?: string;
        ds_LotOrientador?: string;
    // Ad Referendum
        ind_adreferendum?: string;
        ds_AdReferendum?: string;
        dt_AdReferendum?: string;
    // Defesa
        Dt_Defesa?: string;
    // Plano de Trabalho
        ds_TituloPlanoTrabalho?: string;
    // Relator
        nm_relator?: string;
        ds_ObservacaoRelator?: string;
        ds_lotRelator?: string;
    // Atribuicao de Creditos (TBD)
    // Credenciamento de Disciplina
        ds_CredenciamentoDisciplina?: string;
        Nm_CredProfessorResponsavel?: string;
    // Solicitacao de Prazo
        Cd_TipoSolicitacaoPrazo?: number;
        qt_SolicitacaoPrazoDiasSolicitados?: number;
    // 
}

export type ItemReuniaoAdreferendum = {
    ind_adreferendum?: string;
    ds_AdReferendum?: string;
    dt_AdReferendum?: string;
}