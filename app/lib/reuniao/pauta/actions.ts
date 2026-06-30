'use server';

import { z } from 'zod';
import { mssql } from '@/app/lib/db';
import { redirect } from 'next/navigation';
import { mylog } from '../../mylogger';

import { Banca, Credito, DisciplinaEspecial, ItemReuniaoState } from '@/app/lib/reuniao/definitions';
import { revalidatePath } from 'next/cache';

// import { revalidatePath } from 'next/cache';

const filename="/app/lib/reuniao/pauta/actions";
// type numericanswer = { n : number};
// type charanswer = { s : string};

// const AdReferendumSchema = z.object ({
//    Ind_AdReferendum: z.enum(['S','N']),
//    ds_AdReferendum: z.string(),
//    dt_AdReferendum: z.string().date()
// })

const minstr3 = z.union ([
        z.string().min(3),
        z.string().length(0)           
]).default('')

const mydate = z.string().datetime().default('1970-01-01T00:00:00Z');

const mybool = z.enum(['S','N']).default('N')

const ItemAssunto = z.object ({
    cd_reuniao: z.string().regex(/^\d+$/),
    cd_AssuntoReuniao: z.string().regex(/^\d+$/),
    Cd_ItemReuniao: z.string().regex(/^\d+$/),
    nm_Interessado: minstr3,
    ds_AreaInteressado: minstr3,
    ds_NivelInteressado: minstr3,
    nm_Orientador: minstr3,
    ds_LotOrientador: minstr3,
    dt_Apresentacao: mydate,
    ds_TituloPlanoTrabalho: minstr3,
    ds_ObservacaoItem: minstr3,
    ds_ObservacaoNaoPublicavelItem: minstr3,
    Ind_AdReferendum: mybool,
    dt_adreferendum: mydate,
    ds_AdReferendum: minstr3,
    nm_Relator: minstr3,
    ds_LotRelator: minstr3,
    ds_ObservacaoRelator: minstr3,
    ds_TituloDissertacaoTese: minstr3,
    ds_MotivoItem: minstr3,
    nm_NovoOrientador: minstr3,
    ds_TituloPlanoTrabalho_NovoPlano: minstr3,
    nm_CredNovoProfessor: minstr3,
    ds_CredenciamentoDisciplina: minstr3,
    Nm_CredProfessorResponsavel: minstr3,
    Dt_Defesa: mydate,
    dt_Deposito: mydate,
    ds_EstagioDisciplina: minstr3,
    dt_EstagioPeriodoInicio: mydate,
    dt_EstagioPeriodoFim: mydate,
    qt_EstagioCreditos: z.string().regex(/^\d+$/).default('0'),
    Cd_TipoSolicitacaoPrazo: z.string().regex(/^\d+$/).default('0'),
    qt_SolicitacaoPrazoDiasSolicitados: z.string().regex(/^\d+$/).default('0'),
    qt_SolicitacaoPrazoDiasConcedidos: z.string().regex(/^\d+$/).default('0'),
    cd_ReuniaoOrigem: z.string().regex(/^\d*$/).default('')
})

export async function getNextItem () {
    const myreq1 = `select max(Cd_ItemReuniao)+ 1 as n from reuniao_t1010_itemreuniao`;
    try {
        const nextitem = await mssql(myreq1) as {n: number }[];
        mylog("DBG",filename,"getNextItem","nextitem",nextitem);
        return (nextitem[0].n)
    } catch (error) {
        mylog("DBG",filename,"getNextItem","Error",error);
        return (-1)
    }
}

export  async function getNextBancaItem ()
{
    const myreq1 = `select max(cd_BancaExaminadoraReuniao)+ 1 as n from REUNIAO_T0900_BancaExaminadoraReuniao`;
    
    try {
        const nextitem = await mssql(myreq1) as {n: number }[];
        mylog("ERROR",filename,"getNextBancaItem","nextitem",nextitem);
        return (nextitem[0].n)
    } catch (error) {
        mylog("ERROR",filename,"getNextBancaItem","Error",error);
        return (-1)
    }
}

export  async function getNextCreditosItem ()
{
    const myreq1 = `select max(cd_AtribuidorCredito)+ 1 as n from REUNIAO_T3900_AtribuidorCreditos`;
    
    try {
        const nextitem = await mssql(myreq1) as {n: number }[];
        mylog("ERROR",filename,"getNextCreditosItem","nextitem",nextitem);
        return (nextitem[0].n)
    } catch (error) {
        mylog("ERROR",filename,"getNextCreditosItem","Error",error);
        return (-1)
    }
}

export async function getNextDisciplinaEspecialItem ()
{
    const myreq1 = `select max(cd_DisciplinaEspecial)+ 1 as n from REUNIAO_T3800_DisciplinaEspecial`;
    
    try {
        const nextitem = await mssql(myreq1) as {n: number }[];
        mylog("ERROR",filename,"getNextDisciplinaEspecialItem","nextitem",nextitem);
        return (nextitem[0].n)
    } catch (error) {
        mylog("ERROR",filename,"getNextDisciplinaEspecialItem","Error",error);
        return (-1)
    }
}

export async function deleteBancaItem (cd_BancaExaminadoraReuniao: string) {
    const myreq1 = `delete from REUNIAO_T0900_BancaExaminadoraReuniao where cd_BancaExaminadoraReuniao = ${cd_BancaExaminadoraReuniao}`;
    try {
        await mssql(myreq1);
    } catch (error) {
        mylog("ERROR",filename,"deleteBancaItem","Error",error);
    }
}

export async function deleteCreditosItem (cd_AtribuidorCredito: string) {
    const myreq1 = `delete from REUNIAO_T3900_AtribuidorCreditos where cd_AtribuidorCredito = ${cd_AtribuidorCredito}`;
    try {
        await mssql(myreq1);
    } catch (error) {
        mylog("ERROR",filename,"deleteCreditosItem","Error",error);     
    }
}

export async function deleteDisciplinaEspecialItem (cd_DisciplinaEspecial: string) {
    const myreq1 = `delete from REUNIAO_T3800_DisciplinaEspecial where cd_DisciplinaEspecial = ${cd_DisciplinaEspecial}`;
    try {
        await mssql(myreq1);
    } catch (error) {
        mylog("ERROR",filename,"deleteDisciplinaEspecialItem","Error",error);           
    }
}

export interface SearchResult {
    id: string;
    name: string;
    ds_AreaInteressado?: string;
    ds_NivelInteressado?: string;
    nm_Orientador?: string;
    ds_LotOrientador?: string;
    ds_TituloPlanoTrabalho?: string;
    isNew?: boolean;
    [key: string]: any;
}



export async function createItem () {
    const Cd_ItemReuniao = await getNextItem();
    mylog("ERROR",filename,"createItem","Cd_ItemReuniao = ",Cd_ItemReuniao)
    if (Cd_ItemReuniao > 0) {
        try {
            const myreq = `insert into reuniao_t1010_itemreuniao (Cd_ItemReuniao) values (${Cd_ItemReuniao})`
            mssql (myreq)
        } catch (error) {
            mylog ("ERROR",filename,"createItem","Error",error)
            return(-2)
        }
    }
    return (Cd_ItemReuniao)
}
 
export async function createItemObject (prevState: ItemReuniaoState, formData:FormData) {
    mylog("ERROR",filename,"createItemObject","prevState = ",prevState)
    mylog("ERROR",filename,"createItemObject","formData = ",formData)
    
    const myform = Object.fromEntries(formData.entries());

    mylog("ERROR",filename,"createItemObject","myform = ",myform);

     

    const essentialFields = ItemAssunto.safeParse(myform)

    mylog("ERROR",filename,"createItemObject","essentials = ",essentialFields)
    if(!essentialFields.success) {
		mylog ("ERROR", "app/lib/actions", "createItemObject", "essentialFields=", essentialFields.error.flatten().fieldErrors);
		return {
			errors: essentialFields.error.flatten().fieldErrors,
			message: 'Missing Fields, failed to create',
		}
	}
// Criar o ItemReuniao se não existir, ou seja, se Cd_ItemReuniao for 0. O createItemObject é chamado tanto para criação quanto para edição, então precisamos garantir que o item exista antes de tentar atualizá-lo. A função createItemObject2 é uma alternativa que recebe os dados já em formato JSON, mas a lógica de criação do item seria a mesma.
    if (essentialFields.data.Cd_ItemReuniao === '0') {
        const Cd_ItemReuniao = await getNextItem();
        if (Cd_ItemReuniao > 0) {
            try {
                const myreq = `insert into reuniao_t1010_itemreuniao (Cd_ItemReuniao) values (${Cd_ItemReuniao})`
                mssql (myreq)
                essentialFields.data.Cd_ItemReuniao = String(Cd_ItemReuniao);
            } catch (error) {
                mylog ("DBG",filename,"createItemObject","Error",error)
                return({
                    message: "Database Error" + error
                })
            }
        }
    }

    mylog("ERROR",filename,"createItemObject","essentialFields.data after creation = ",essentialFields.data)

// Inserir datos essentials

    try {
            const myreq0 = `
            UPDATE REUNIAO_T1010_ItemReuniao set 
            cd_reuniao = ${essentialFields.data.cd_reuniao},
            Cd_AssuntoReuniao = ${essentialFields.data.cd_AssuntoReuniao},
            nm_Interessado = '${essentialFields.data.nm_Interessado}',
            ds_AreaInteressado = '${essentialFields.data.ds_AreaInteressado}',
            ds_NivelInteressado = '${essentialFields.data.ds_NivelInteressado}',
            nm_Orientador = ${essentialFields.data.nm_Orientador.length>0?"'"+essentialFields.data.nm_Orientador+"'":null},
            ds_LotOrientador = ${essentialFields.data.ds_LotOrientador.length>0?"'"+essentialFields.data.ds_LotOrientador+"'":null},
            dt_Apresentacao = ${essentialFields.data.dt_Apresentacao==='01/01/1970'?null:"'"+essentialFields.data.dt_Apresentacao+"'"},
            Ind_AdReferendum = '${essentialFields.data.Ind_AdReferendum}',
            ds_adreferendum = ${essentialFields.data.ds_AdReferendum.length>0?"'"+essentialFields.data.ds_AdReferendum+"'":null},
            dt_adreferendum = ${essentialFields.data.Ind_AdReferendum==='S'?"'"+essentialFields.data.dt_adreferendum+"'":null},
            ds_TituloPlanoTrabalho = ${essentialFields.data.ds_TituloPlanoTrabalho.length>0?"'"+essentialFields.data.ds_TituloPlanoTrabalho+"'":null},
            ds_ObservacaoItem = ${essentialFields.data.ds_ObservacaoItem.length>0?"'"+essentialFields.data.ds_ObservacaoItem+"'":null},
            ds_ObservacaoNaoPublicavelItem = ${essentialFields.data.ds_ObservacaoNaoPublicavelItem.length>0?"'"+essentialFields.data.ds_ObservacaoNaoPublicavelItem+"'":null},
            nm_Relator = ${essentialFields.data.nm_Relator.length>0?"'"+essentialFields.data.nm_Relator+"'":null},
            ds_LotRelator = ${essentialFields.data.ds_LotRelator.length>0?"'"+essentialFields.data.ds_LotRelator+"'":null},
            ds_ObservacaoRelator = ${essentialFields.data.ds_ObservacaoRelator.length>0?"'"+essentialFields.data.ds_ObservacaoRelator+"'":null},
            ds_TituloDissertacaoTese = ${essentialFields.data.ds_TituloDissertacaoTese.length>0?"'"+essentialFields.data.ds_TituloDissertacaoTese+"'":null},
            ds_MotivoItem = ${essentialFields.data.ds_MotivoItem.length>0?"'"+essentialFields.data.ds_MotivoItem+"'":null},
            nm_NovoOrientador = ${essentialFields.data.nm_NovoOrientador.length>0?"'"+essentialFields.data.nm_NovoOrientador+"'":null},
            ds_TituloPlanoTrabalho_NovoPlano = ${essentialFields.data.ds_TituloPlanoTrabalho_NovoPlano.length>0?"'"+essentialFields.data.ds_TituloPlanoTrabalho_NovoPlano+"'":null},
            nm_CredNovoProfessor = ${essentialFields.data.nm_CredNovoProfessor.length>0?"'"+essentialFields.data.nm_CredNovoProfessor+"'":null},
            ds_CredenciamentoDisciplina = ${essentialFields.data.ds_CredenciamentoDisciplina.length>0?"'"+essentialFields.data.ds_CredenciamentoDisciplina+"'":null},
            Nm_CredProfessorResponsavel = ${essentialFields.data.Nm_CredProfessorResponsavel.length>0?"'"+essentialFields.data.Nm_CredProfessorResponsavel+"'":null},
            Dt_Defesa = ${essentialFields.data.Dt_Defesa==='01/01/1970'?null:"'"+essentialFields.data.Dt_Defesa+"'"},
            dt_Deposito = ${essentialFields.data.dt_Deposito==='01/01/1970'?null:"'"+essentialFields.data.dt_Deposito+"'"},
            ds_EstagioDisciplina = ${essentialFields.data.ds_EstagioDisciplina.length>0?"'"+essentialFields.data.ds_EstagioDisciplina+"'":null},
            dt_EstagioPeriodoInicio = ${essentialFields.data.dt_EstagioPeriodoInicio==='01/01/1970'?null:"'"+essentialFields.data.dt_EstagioPeriodoInicio+"'"},
            dt_EstagioPeriodoFim = ${essentialFields.data.dt_EstagioPeriodoFim==='01/01/1970'?null:"'"+essentialFields.data.dt_EstagioPeriodoFim+"'"},
            qt_EstagioCreditos = ${Number(essentialFields.data.qt_EstagioCreditos)===0?null:essentialFields.data.qt_EstagioCreditos},
            cd_ReuniaoOrigem = ${essentialFields.data.cd_ReuniaoOrigem.length>0?"'"+essentialFields.data.cd_ReuniaoOrigem+"'":null}`;
        const add1 = essentialFields.data.Cd_TipoSolicitacaoPrazo === '0' ? '' :`
            , Cd_TipoSolicitacaoPrazo = ${essentialFields.data.Cd_TipoSolicitacaoPrazo},
            qt_SolicitacaoPrazoDiasSolicitados = ${essentialFields.data.qt_SolicitacaoPrazoDiasSolicitados},
            qt_SolicitacaoPrazoDiasConcedidos = ${essentialFields.data.qt_SolicitacaoPrazoDiasConcedidos}`
        const fim = `
            where Cd_ItemReuniao = ${essentialFields.data.Cd_ItemReuniao}
            `;
        const myreq = myreq0 + add1 + fim;
            mylog ("ERROR",filename,"createItemObject","myreq =",myreq.replace(/\s/g," "));
            const answer = mssql(myreq)
            mylog ("ERROR",filename,"createItemObject","answer = ", answer);
        } catch(error) {
            mylog ("ERROR",filename,"createItemObject","error = ", error);
            return {
                message: "Database Error" + error
            }
        }

// Agota inserir membros da banca, se houver. A lógica de inserção de membros da banca não está clara, pois depende de como os dados estão estruturados e de quais tabelas precisam ser atualizadas. O código abaixo é apenas um exemplo e pode precisar ser ajustado com base na estrutura real do banco de dados e dos dados recebidos.
    const banca= myform.banca_json ? JSON.parse(myform.banca_json as string) as Banca[] : [];

    if (banca.length > 0) {
        mylog("ERROR",filename,"createItemObject","banca = ",banca);
        const cd_BancaExaminadoraReuniaoInit =  await getNextBancaItem();
        mylog("ERROR",filename,"createItemObject","next cd_BancaExaminadoraReuniao = ",cd_BancaExaminadoraReuniaoInit);
        let myreqtotal = "create table TEMPBANCA (cd_BancaExaminadoraReuniao int, Cd_ItemReuniao int, nm_ExaminadorBanca varchar(200), ds_LotExaminadorBanca varchar(200), Cd_TipoExaminador int); ";
        
        for (let i = cd_BancaExaminadoraReuniaoInit; i < cd_BancaExaminadoraReuniaoInit + banca.length; i++) {
            const element = banca[i - cd_BancaExaminadoraReuniaoInit];            
                    mylog("ERROR",filename,"createItemObject","i = ",i);
                     const myreq = `
                        INSERT INTO TEMPBANCA 
                        (cd_BancaExaminadoraReuniao, Cd_ItemReuniao, nm_ExaminadorBanca, ds_LotExaminadorBanca, Cd_TipoExaminador)
                        VALUES 
                        (${i}, ${essentialFields.data.Cd_ItemReuniao}, '${element.nm_ExaminadorBanca}', '${element.ds_LotExaminadorBanca}', ${element.Cd_TipoExaminador})
                    ; `;
                    myreqtotal = myreqtotal + myreq
        }
        const myreqf= `
            MERGE Reuniao_t0900_BancaExaminadoraReuniao as Target
            USING TEMPBANCA as Source
                ON Target.Cd_ItemReuniao = Source.Cd_ItemReuniao
                AND Target.Nm_ExaminadorBanca = Source.Nm_ExaminadorBanca
            WHEN NOT MATCHED BY TARGET THEN
                INSERT (cd_BancaExaminadoraReuniao, Cd_ItemReuniao, nm_ExaminadorBanca, ds_LotExaminadorBanca, Cd_TipoExaminador)
                VALUES (Source.cd_BancaExaminadoraReuniao, Source.Cd_ItemReuniao, Source.nm_ExaminadorBanca, 
                Source.ds_LotExaminadorBanca, Source.Cd_TipoExaminador);

            DROP TABLE TEMPBANCA;
`;
        myreqtotal = myreqtotal + myreqf
        try { 
            await mssql(myreqtotal)
            
        } catch (error) {
                    mylog ("ERROR",filename,"createItemObject","Error in banca insertion loop = ", error);
        }
    }

    const creditos= myform.creditos_json ? JSON.parse(myform.creditos_json as string) as Credito[] : [];

    if (creditos.length > 0) {
        mylog("ERROR",filename,"createItemObject","creditos = ",creditos);
        const cd_CreditosInit =  await getNextCreditosItem();
        let myreqtotal = `
            CREATE TABLE TEMPCREDITOS (cd_AtribuidorCredito int, ds_TituloTrabalho varchar(1000), ds_TituloPeriodicoLivroCongresso varchar(500),
            ds_Pais varchar(100), dt_PeriodoInicial datetime, dt_PeriodoFinal datetime, nu_Volume int, ds_Paginas varchar(20), ds_Ano int,
            Cd_ItemReuniao int, Cd_TipoAtribuidorCredito int); 
        `
        for (let i = cd_CreditosInit; i < cd_CreditosInit + creditos.length; i++) {
            const element = creditos[i - cd_CreditosInit];
            if (isNaN(+element.cd_AtribuidorCredito)) {

                
                    mylog("ERROR",filename,"createItemObject","i = ",i);
                    element.nu_Volume = element.nu_Volume ? element.nu_Volume : '0';
                     const myreq = `
                        INSERT INTO TEMPCREDITOS 
                        (cd_AtribuidorCredito, Cd_ItemReuniao, Cd_TipoAtribuidorCredito, ds_titulotrabalho, ds_tituloperiodicolivrocongresso, ds_pais, ds_paginas, ds_ano, nu_volume, dt_periodoinicial, dt_periodofinal) 
                        
                        VALUES 
                        (${i}, ${essentialFields.data.Cd_ItemReuniao}, '${element.Cd_TipoAtribuidorCredito}', '${element.ds_TituloTrabalho}', '${element.ds_TituloPeriodicoLivroCongresso}', '${element.ds_Pais}', '${element.ds_Paginas}', '${element.ds_Ano}', ${element.nu_Volume}, '${element.dt_PeriodoInicial}', '${element.dt_PeriodoFinal}')
                    `;
                    mylog("ERROR",filename,"createItemObject","myreq for creditos = ",myreq.replace(/\s/g," "));
                    myreqtotal = myreqtotal+myreq
                                 
        }
        }
        const myreqf= `
            MERGE REUNIAO_T3900_AtribuidorCreditos as Target
            USING TEMPCREDITOS as Source
                ON Target.Cd_ItemReuniao = Source.Cd_ItemReuniao
                AND Target.ds_TituloTrabalho = Source.ds_TituloTrabalho
            WHEN NOT MATCHED BY TARGET THEN
                INSERT (cd_AtribuidorCredito, Cd_ItemReuniao, Cd_TipoAtribuidorCredito, ds_titulotrabalho, ds_tituloperiodicolivrocongresso, ds_pais, ds_paginas, ds_ano, nu_volume, dt_periodoinicial, dt_periodofinal) 
                VALUES (Source.cd_AtribuidorCredito, Source.Cd_ItemReuniao, Source.Cd_TipoAtribuidorCredito, Source.ds_titulotrabalho, 
                        Source.ds_tituloperiodicolivrocongresso, Source.ds_pais, Source.ds_paginas, Source.ds_ano, Source.nu_volume, 
                        Source.dt_periodoinicial, Source.dt_periodofinal) ;

                DROP TABLE TEMPCREDITOS;
        `;
        myreqtotal = myreqtotal + myreqf
        try { 
            await mssql(myreqtotal)
            
        } catch (error) {
                    mylog ("DBG",filename,"createItemObject","Error in creditos insertion loop = ", error);
        }
       
    }

    const disciplinaEspecial= myform.disciplinas_json ? JSON.parse(myform.disciplinas_json as string) as DisciplinaEspecial[] : [];
    if (disciplinaEspecial.length > 0) {
        mylog("ERROR",filename,"createItemObject","disciplinaEspecial = ",disciplinaEspecial);
        const cd_DisciplinaEspecialInit =  await getNextDisciplinaEspecialItem();
        mylog("ERROR",filename,"createItemObject","next cd_Creditos = ",cd_DisciplinaEspecialInit);
        let myreqtotal = `create table TEMPESPECIAIS (
            cd_DisciplinaEspecial int,
            nm_DisciplinaEspecial varchar(255), 
            qt_Creditos int, 
            dt_PeriodoInicial datetime, 
            dt_PeriodoFinal datetime,
            ds_Frequencia varchar(50),
            ds_Conceito varchar(50),
            Cd_ItemReuniao int
            )`
        for (let i = cd_DisciplinaEspecialInit; i < cd_DisciplinaEspecialInit + disciplinaEspecial.length; i++) {
            const element = disciplinaEspecial[i - cd_DisciplinaEspecialInit];
            if (isNaN(+element.cd_DisciplinaEspecial)) {
            
                    mylog("ERROR",filename,"createItemObject","i = ",i);
                     const myreq = `
                        INSERT INTO TEMPESPECIAIS 
                        (cd_DisciplinaEspecial, Cd_ItemReuniao, nm_DisciplinaEspecial, qt_Creditos, dt_PeriodoInicial, dt_PeriodoFinal, ds_Frequencia, ds_Conceito)
                        VALUES 
                        (${i}, ${essentialFields.data.Cd_ItemReuniao}, '${element.nm_DisciplinaEspecial}', ${element.qt_Creditos}, '${element.dt_PeriodoInicial}', '${element.dt_PeriodoFinal}', '${element.ds_Frequencia}', '${element.ds_Conceito}');

                    `;
                    
                    myreqtotal = myreqtotal + myreq;                     
            }
        }
        const myreqf= `
            MERGE reuniao_t3800_disciplinaEspecial as Target
            USING TEMPESPECIAIS as Source
                ON Target.Cd_ItemReuniao = Source.Cd_ItemReuniao
                AND Target.nm_DisciplinaEspecial = Source.nm_DisciplinaEspecial
            WHEN NOT MATCHED BY TARGET THEN
                INSERT (cd_DisciplinaEspecial, Cd_ItemReuniao, nm_DisciplinaEspecial, qt_Creditos, dt_PeriodoInicial, dt_PeriodoFinal, ds_Frequencia, ds_Conceito)
                VALUES (Source.cd_DisciplinaEspecial,Source.Cd_ItemReuniao, Source.nm_DisciplinaEspecial, Source.qt_Creditos, 
                Source.dt_PeriodoInicial, Source.dt_PeriodoFinal, Source.ds_Frequencia, Source.ds_Conceito);

            DROP TABLE TEMPESPECIAIS;
        `
        myreqtotal = myreqtotal + myreqf
        try { 
            await mssql(myreqtotal)
            
        } catch (error) {
                    mylog ("ERROR",filename,"createItemObject","Error in DisciplinaEspecial insertion loop = ", error);
        }
    }

    revalidatePath("/sinfonia/reuniao/"+essentialFields.data.cd_reuniao+"/pauta")
    redirect("/sinfonia/reuniao/"+essentialFields.data.cd_reuniao+"/pauta")
}
