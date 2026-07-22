CREATE TABLE [dbo].[REUNIAO_T4400_DeliberacaoValor](
	Cd_DeliberacaoValor [int] identity(1,1),
        cd_AssuntoReuniao [int] not null,
        Cd_ClassificacaoDeliberacao [int] not null,
        Ind_DeliberacaoValor [char],
	[Id_Usuario] [varchar](200) NOT NULL,
	[Dt_Atualizacao] [datetime] NOT NULL
)
	
ALTER TABLE [dbo].[REUNIAO_T4400_DeliberacaoValor] ADD  CONSTRAINT [DF_Usuario440]  DEFAULT (user_name()) FOR [Id_Usuario]
ALTER TABLE [dbo].[REUNIAO_T4400_DeliberacaoValor] ADD  CONSTRAINT [DF_DataAtualizacao440]  DEFAULT (getdate()) FOR [Dt_Atualizacao]

insert into reuniao_t4400_deliberacaoValor (cd_assuntoreuniao,cd_classificacaodeliberacao,ind_deliberacaoValor) values
(1,5,'N'), (1,1,'P'), (2,6,'N'), (2,3,'P'), (3,4,'N'), (3,2,'P'), (4,5,'N'), (4,1,'P'), (5,9,'N'), (5,8,'P'),
(6,4,'N'), (6,2,'P'), (7,5,'N'), (7,1,'P'), (8,9,'N'), (8,8,'P'), (9,5,'N'), (9,1,'P'), (10,5,'N'), (10,1,'P'), 
(11,4,'N'), (11,2,'P'), (12,5,'N'), (12,1,'P'), (13,5,'N'), (13,1,'P'), (14,6,'N'), (14,3,'P'), (15,5,'N'), (15,1,'P'), 
(16,5,'N'), (16,1,'P'), (17,6,'N'), (17,3,'P'), (18,5,'N'), (18,1,'P'), (19,6,'N'), (19,3,'P'), (20,5,'N'), (20,1,'P'),
(21,5,'N'), (21,1,'P'), (22,4,'N'), (22,2,'P'), (23,5,'N'), (23,1,'P'), (24,4,'N'), (24,2,'P'), (25,5,'N'), (25,1,'P'), 
(26,4,'N'), (26,2,'P'), (27,5,'N'), (27,1,'P'), (28,4,'N'), (28,2,'P'), (29,5,'N'), (29,1,'P'), (30,5,'N'), (30,1,'P'), 
(31,5,'N'), (31,1,'P'), (32,5,'N'), (32,1,'P'), (33,5,'N'), (33,1,'P'), (34,5,'N'), (34,1,'P'), (35,5,'N'), (35,1,'P'), 
(36,5,'N'), (36,1,'P'), (37,5,'N'), (37,1,'P'), (38,5,'N'), (38,1,'P'), (39,5,'N'), (39,1,'P'), (40,5,'N'), (40,1,'P'),
(41,5,'N'), (41,1,'P'), (42,5,'N'), (42,1,'P'), (43,5,'N'), (43,1,'P'), (44,5,'N'), (44,1,'P'), (45,5,'N'), (45,1,'P'), 
(46,5,'N'), (46,1,'P'), (47,5,'N'), (47,1,'P'), (48,5,'N'), (48,1,'P'), (49,5,'N'), (49,1,'P'), (50,6,'N'), (50,3,'P'), 
(51,5,'N'), (51,1,'P'), (52,5,'N'), (52,1,'P'), (53,5,'N'), (53,1,'P'), (54,5,'N'), (54,1,'P')

go
