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
	i_disser_tese: bool_br,
	i_data_apres: bool_br,
	i_estagio: bool_br,
	i_disc_esp: bool_br,
}
