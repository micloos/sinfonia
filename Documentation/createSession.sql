create TABLE REUNIAO_T4100_Sessoes(
	Cd_sessao varchar(100),
	Cd_UsuarioSistemaReuniao NUMERIC(11) FOREIGN KEY REFERENCES REUNIAO_T3100_UsuarioSistemaReuniao(Cd_UsuarioSistemaReuniao),
	Token VARCHAR(500) NOT NULL,
	Ds_LoginAcessoUsuarioSistemaReuniao varchar(20) not null,
	Cd_NivelUsuarioSistema int,
	CreatedAt DATETIME DEFAULT GETDATE(),
	LastActivity DATETIME DEFAULT GETDATE(),
	ExpiresAt DATETIME NOT NULL,
	IsActive BIT DEFAULT 1);

GO
