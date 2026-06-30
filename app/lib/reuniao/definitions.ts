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
    nm_ExaminadorBanca: string;
    ds_LotExaminadorBanca: string;
    Cd_TipoExaminador: number;
    Cd_BancaExaminadoraReuniao: string;
}

export interface DisciplinaEspeciais {
    cd_DisciplinaEspecial : string;
    Cd_ItemReuniao : string;
    nm_DisciplinaEspecial : string;
    qt_Creditos : number;
    dt_PeriodoInicial : string;
    dt_PeriodoFinal : string;
    ds_Frequencia : string;
    ds_Conceito : string;
}

export type DisciplinaEspeciaisFormData = Omit<DisciplinaEspeciais, 'cd_DisciplinaEspecial' | 'Cd_ItemReuniao'>;

export type DisciplinaEspecial = Omit<DisciplinaEspeciais, 'Cd_ItemReuniao'>;

export interface Creditos {
    cd_AtribuidorCredito : string;
    Cd_TipoAtribuidorCredito : string;
    ds_TituloTrabalho : string;
    ds_TituloPeriodicoLivroCongresso : string;
    ds_Pais : string;
    dt_PeriodoInicial : string;
    dt_PeriodoFinal : string;
    ds_Paginas : string;
    ds_Ano: string;
    nu_Volume: string;
    qt_Creditos : number;
}

export type Credito = Omit<Creditos, 'qt_Creditos'>;

export type CreditosFormData = Omit<Creditos, 'cd_AtribuidorCredito' | 'qt_Creditos'>;

export type AtribuidorName = {
    id: string;
    name: string;
}

export type BancaFormData = Omit<Banca, 'Cd_BancaExaminadoraReuniao'>;

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

export type Estagio = {
    ds_EstagioDisciplina: string;
    dt_EstagioPeriodoInicio: string;
    dt_EstagioPeriodoFim: string;
    qt_EstagioCreditos: number;
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
  estagio: Estagio;
  prazo: Prazo;
  creditos: Credito[];
  disciplinaEspecial: DisciplinaEspecial[]; 
  cd_ReuniaoOrigem: string;
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
    creditos: Credito[];
    disciplinaEspecial: DisciplinaEspecial[]; 
}

export type PrazoName = {
    id: number;
    name: string;
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
    nm_Orientador: string;
    ds_LotOrientador: string;
}

export type Interessado = {
    nm_Interessado: string;
    ds_AreaInteressado: string;
    ds_NivelInteressado: string;
}

export type Shadow = {
    nm_Orientador: string;
    ds_LotOrientador: string;
}

export type AdReferendumType = {
    Ind_AdReferendum: string;
    ds_AdReferendum: string;
    dt_AdReferendum: string;
}

export type Apresentacao = {
    dt_apresentacao: string;
}

export type Prazo = {
    Cd_TipoSolicitacaoPrazo: number;
    qt_SolicitacaoPrazoDiasSolicitados: number;
}

{/* ds_areainteressado?: string[];
        ds_NivelInteressado?: string[];
        nm_Orientador?: string[];
        ds_LotOrientador?: string[];
        Ind_AdReferendum?: string[];
        ds_AdReferendum?: string[];
        dt_AdReferendum?: string[];
        dt_defesa?: string[]; */}



export type ItemReuniaoState = {
    errors?: {
        nm_Interessado?: string[];
    };
    message?: string | null;
}

export type ItemReuniao = {
    Cd_ItemReuniao: string;
    cd_reuniao: string;
    Cd_AssuntoReuniao?: string;
    dt_Apresentacao?: string;
    // Interessado
        nm_Interessado?: string;
        ds_AreaInteressado?: string;
        ds_NivelInteressado?: string;
    // Orientador
        nm_Orientador?: string;
        ds_LotOrientador?: string;
    // Novo Orientador
        nm_NovoOrientador?: string;
    // Ad Referendum
        Ind_AdReferendum?: string;
        ds_AdReferendum?: string;
        dt_AdReferendum?: string;
    // Defesa
        Dt_Defesa?: string;
    // Data de Deposito
        dt_Deposito?: string;
    // Plano de Trabalho
        ds_TituloPlanoTrabalho?: string;
    // Estagio
        ds_EstagioDisciplina?: string;
        dt_EstagioPeriodoInicio?: string;
        dt_EstagioPeriodoFim?: string;
        qt_EstagioCreditos?: string
    // Novo Plano de Trabalho
        ds_TituloPlanoTrabalho_NovoPlano?: string;
    // Dissertacao/Tese
        ds_TituloDissertacaoTese?: string;
    // Novo Professor
        Nm_CredNovoProfessor?: string;
    // Motivo
        ds_MotivoItem?: string;
    // Relator
        nm_Relator?: string;
        ds_ObservacaoRelator?: string;
        ds_LotRelator?: string;
    // Atribuicao de Creditos (TBD)
    // Credenciamento de Disciplina
        ds_CredenciamentoDisciplina?: string;
        Nm_CredProfessorResponsavel?: string;
    // Solicitacao de Prazo
        Cd_TipoSolicitacaoPrazo?: number;
        qt_SolicitacaoPrazoDiasSolicitados?: number;
    // Observacao
      ds_ObservacaoItem?: string;
      ds_ObservacaoNaoPublicavelItem?: string;
    // Deliberacao
      Cd_ClassificacaoDeliberacao?: string;
      Ds_ObservacaoDeliberacao?: string;
}

export type ItemReuniaoAdreferendum = {
    Ind_AdReferendum?: string;
    ds_AdReferendum?: string;
    dt_AdReferendum?: string;
}