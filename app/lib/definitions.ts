export type SystemUser = {
	id: number;
	username: string;
	password: string;
	role: string;
}

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