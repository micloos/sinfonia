import type { ItemReuniao,AtribuidorName } from "./reuniao/definitions";

export type numericanswer = { n : number};

export type Reunioes = {
	id: number;
	d_ini: string;
	d_end: string;
	sala: string;
	predio: string;
	d_lim: string;
	active: string;
	sequencia: number|null;
} 

export type PautaRed = {
	iid: string;
	assuntoId: string
	assunto: string;
	interessado: string;
	area: string;
	assuntoRetornavel: number;
}

export type Assuntos = {
	id: number;
	assunto: string;
}

export type AssuntoParameters	 = {
	Cd_AssuntoReuniao: number
	Ind_Interessado : bool_br
    Ind_Orientador : bool_br
    Ind_Defesa : bool_br
    Ind_PlanoTrabalho : bool_br
    Ind_BancaExaminadora : bool_br
    Ind_Relator : bool_br
    Ind_AtribuiCreditos : bool_br
    Ind_CredenciamentoDisciplina : bool_br
    Ind_SolicitaPrazo : bool_br
    Ind_AdReferendum : bool_br
    Ind_Deliberacao : bool_br
    Ind_ObservacaoNaoPublicavel : bool_br
    Ind_ObservacaoAssunto : bool_br
    Ind_MotivoAssunto : bool_br
    Ind_NovoPlano : bool_br
    Ind_NovoOrientador : bool_br
    Ind_NovoProfessor : bool_br
    Ind_DataDeposito : bool_br
    Ind_DissertacaoTese : bool_br
    Ind_DataApresentacao : bool_br
    Ind_Estagio : bool_br
    Ind_DisciplinaEspecial : bool_br
}

export type OrdemDia = {
	id: number;
	seq: number;
	assunto: string;
	publicavel: string;
	deliberacao: string;
}


export type LinksType = {
	name: string;
	href: string;
	pname: string;
	icon: object;
}

export type UserType = {
	username: string;  // Ds_LoginAcessoUsuarioSistemaReuniao  varchar(20)
	nome: string;  // Nm_UsuarioSistemaReuniao varchar(50)
	password: string; // Nr_SenhaAcessoUsuarioSistemaReuniao  varchar(20)
	nivel: number; // Cd_NivelUsuarioSistema  int
	cpf: string; // Cd_UsuariosSistemaReuniao numeric[11,0]
//	id: string;    // Id_Usuario  should rely on default
//	date: string; // Dt_Atualizacao datetime  should rely on default
};

{/* export type User = {
	username: string;  // Ds_LoginAcessoUsuarioSistemaReuniao  varchar(20)
	nome: string;  // Nm_UsuarioSistemaReuniao varchar(50)
	password: string; // Nr_SenhaAcessoUsuarioSistemaReuniao  varchar(20)
	nivel: number; // Cd_NivelUsuarioSistema  int
	cpf: string; // Cd_UsuariosSistemaReuniao numeric[11,0]
//	id: string;    // Id_Usuario  should rely on default
//	date: string; // Dt_Atualizacao datetime  should rely on default
};
*/}


export type Niveis = {
	idniv: number;
	niv: string;
}

export type Participantes = {
	id: number;
	title: string;
	name: string;
}

export type ParticipanteType = {
	id: number;
	name: string;
}

export type Numres = {
	n: number;
}

export type AssuntosListType = {
	id: number;
	assunto: string;
	assuntoDeliberacao: string;
}

type bool_br = 'S' | 'N';

export type PautaParams = {
	id: number,
	i_interessado: bool_br,
	i_orientador: bool_br,
	i_defesa: bool_br,
	i_plano: bool_br,
	i_banca: bool_br,
	i_relator: bool_br,
	i_a_creditos: bool_br,
	i_cred_disc: bool_br,
	i_sol_praz: bool_br,
	i_addref: bool_br,
	i_deliber: bool_br,
	i_nao_pub: bool_br,
	i_obs: bool_br,
	i_motivo: bool_br,
	i_novo_plan: bool_br,
	i_novo_orient: bool_br,
	i_novo_prof: bool_br,
	i_data_dep: bool_br,
	i_dissertacao_tese: bool_br,
	i_data_apres: bool_br,
	i_estagio: bool_br,
	i_disc_esp: bool_br,
}

export type AdminAssuntoType = {
	id: number,
	nome: string,
	descricao: string,
	retornavel: number,
	modeloDespacho: number,
}

export type AdminAssuntoParametersType = {
	id: number,
	ind_interessado: bool_br,
	ind_orientador: bool_br,
	ind_defesa: bool_br,
	ind_plano: bool_br,
	ind_banca: bool_br,
	ind_relator: bool_br,
	ind_a_creditos: bool_br,
	ind_cred_disc: bool_br,
	ind_sol_praz: bool_br,
	ind_addref: bool_br,
	ind_deliber: bool_br,
	ind_nao_pub: bool_br,
	ind_obs: bool_br,
	ind_motivo: bool_br,
	ind_novo_plan: bool_br,
	ind_novo_orient: bool_br,
	ind_novo_prof: bool_br,
	ind_data_dep: bool_br,
	ind_dissertacao_tese: bool_br,
	ind_data_apres: bool_br,
	ind_estagio: bool_br,
	ind_disc_esp: bool_br,
}	

export interface BancaCompleta  {
	Cd_ItemReuniao: number;
    nm_ExaminadorBanca: string;
    ds_LotExaminadorBanca: string;
    Cd_TipoExaminador: number;
    Cd_BancaExaminadoraReuniao: string;
}

export interface AttrCreditos {
	cd_AtribuidorCredito: number;
	ds_TituloTrabalho: string;
	ds_TituloPeriodicoLivroCongresso: string;
	ds_Pais: string;
	dt_PeriodoInicial: string;
	dt_PeriodoFinal: string;
	nu_Volume: number;
	ds_Paginas: string;
	ds_Ano: string;
	Cd_TipoAtribuidorCredito: string;
}

export interface DiscEspecial {
	cd_DisciplinaEspecial: number;
	nm_DisciplinaEspecial: string;
	qt_Creditos: number;
	dt_PeriodoInicial: string;
	dt_PeriodoFinal: string;
	ds_Frequencia: string;
	ds_Conceito: string;
}

export interface ImprimirData {
	tipo: string;
	reuniao: Reunioes;
	participantes: Participantes[];
	ordemDia: OrdemDia[];
	assuntos: Assuntos[];
	items: ItemReuniao[];
	assuntoParameters: AssuntoParameters[];
	bancas: BancaCompleta[];
	tipoPrazos: string[];
	tipoAttrCreditos: AtribuidorName[];
	attrCreditos: AttrCreditos[];
	discEspecial: DiscEspecial[];
}