export type Reunioes = {
	d_ini: string;
	d_end: string;
	sala: string;
	id: number;
	predio: string;
	d_lim: string;
	active: number;
};

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

export type ParticipanteList = {
	id: number;
	name: string;
}

export type Numres = {
	n: number;
}