'use server';

import { z } from 'zod';
import { mssql } from '@/app/lib/db';
import { redirect } from 'next/navigation';
import { mylog } from '../../mylogger';

import { Banca, ItemReuniaoState } from '@/app/lib/reuniao/definitions';
import { revalidatePath } from 'next/cache';

// import { revalidatePath } from 'next/cache';

const filename="/app/lib/reuniao/pauta/actions";
// type numericanswer = { n : number};
// type charanswer = { s : string};

// const AdReferendumSchema = z.object ({
//    ind_adreferendum: z.enum(['S','N']),
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
    cd_itemreuniao: z.string().regex(/^\d+$/),
    nm_interessado: minstr3,
    ds_areainteressado: minstr3,
    ds_nivelinteressado: minstr3,
    nm_orientador: minstr3,
    ds_LotOrientador: minstr3,
    dt_Apresentacao: mydate,
    ds_TituloPlanoTrabalho: minstr3,
    ds_ObservacaoItem: minstr3,
    ds_ObservacaoNaoPublicavelItem: minstr3,
    ind_adreferendum: mybool,
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
    

})

export async function getNextItem () {
    const myreq1 = `select max(cd_itemreuniao)+ 1 as n from reuniao_t1010_itemreuniao`;
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
        {/*
        for (let i = nextitem[0].n; i < nextitem[0].n + n; i++) {
            mylog("ERROR",filename,"getNextBancaItem","next banca item = ", i);
            const myreq = `insert into REUNIAO_T0900_BancaExaminadoraReuniao (cd_BancaExaminadoraReuniao,cd_itemreuniao) values (${i},0)`
            try {
                const answer = await mssql(myreq)
                mylog ("ERROR",filename,"getNextBancaItem","answer for banca = ", answer);
            } catch(error) {
                mylog ("ERROR",filename,"getNextBancaItem","error for banca = ", error);
        // Continuar o loop mesmo se houver um erro ao inserir um membro da banca
            }
        }
            */}
        return (nextitem[0].n)
    } catch (error) {
        mylog("ERROR",filename,"getNextBancaItem","Error",error);
        return (-1)
    }
}


export async function createItem () {
    const cd_itemreuniao = await getNextItem();
    mylog("ERROR",filename,"createItem","cd_itemreuniao = ",cd_itemreuniao)
    if (cd_itemreuniao > 0) {
        try {
            const myreq = `insert into reuniao_t1010_itemreuniao (cd_itemreuniao) values (${cd_itemreuniao})`
            mssql (myreq)
        } catch (error) {
            mylog ("ERROR",filename,"createItem","Error",error)
            return(-2)
        }
    }
    return (cd_itemreuniao)
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
// Criar o ItemReuniao se não existir, ou seja, se cd_itemreuniao for 0. O createItemObject é chamado tanto para criação quanto para edição, então precisamos garantir que o item exista antes de tentar atualizá-lo. A função createItemObject2 é uma alternativa que recebe os dados já em formato JSON, mas a lógica de criação do item seria a mesma.
    if (essentialFields.data.cd_itemreuniao === '0') {
        const cd_itemreuniao = await getNextItem();
        if (cd_itemreuniao > 0) {
            try {
                const myreq = `insert into reuniao_t1010_itemreuniao (cd_itemreuniao) values (${cd_itemreuniao})`
                mssql (myreq)
                essentialFields.data.cd_itemreuniao = String(cd_itemreuniao);
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
            const myreq = `
            UPDATE REUNIAO_T1010_ItemReuniao set 
            cd_reuniao = ${essentialFields.data.cd_reuniao},
            cd_assuntoreuniao = ${essentialFields.data.cd_AssuntoReuniao},
            nm_interessado = '${essentialFields.data.nm_interessado}',
            ds_areainteressado = '${essentialFields.data.ds_areainteressado}',
            ds_nivelinteressado = '${essentialFields.data.ds_nivelinteressado}',
            nm_orientador = '${essentialFields.data.nm_orientador}',
            ds_LotOrientador = '${essentialFields.data.ds_LotOrientador}',
            dt_Apresentacao = '${essentialFields.data.dt_Apresentacao}',
            ind_adreferendum = '${essentialFields.data.ind_adreferendum}',
            ds_adreferendum = '${essentialFields.data.ds_AdReferendum}',
            dt_adreferendum = '${essentialFields.data.dt_adreferendum}',
            ds_TituloPlanoTrabalho = '${essentialFields.data.ds_TituloPlanoTrabalho}',
            ds_ObservacaoItem = '${essentialFields.data.ds_ObservacaoItem}',
            ds_ObservacaoNaoPublicavelItem = '${essentialFields.data.ds_ObservacaoNaoPublicavelItem}',
            nm_Relator = '${essentialFields.data.nm_Relator}',
            ds_LotRelator = '${essentialFields.data.ds_LotRelator}',
            ds_ObservacaoRelator = '${essentialFields.data.ds_ObservacaoRelator}',
            ds_TituloDissertacaoTese = '${essentialFields.data.ds_TituloDissertacaoTese}',
            ds_MotivoItem = '${essentialFields.data.ds_MotivoItem}',
            nm_NovoOrientador = '${essentialFields.data.nm_NovoOrientador}',
            ds_TituloPlanoTrabalho_NovoPlano = '${essentialFields.data.ds_TituloPlanoTrabalho_NovoPlano}',
            nm_CredNovoProfessor = '${essentialFields.data.nm_CredNovoProfessor}',
            ds_CredenciamentoDisciplina = '${essentialFields.data.ds_CredenciamentoDisciplina}',
            Nm_CredProfessorResponsavel = '${essentialFields.data.Nm_CredProfessorResponsavel}',
            Dt_Defesa = '${essentialFields.data.Dt_Defesa}',
            dt_Deposito = '${essentialFields.data.dt_Deposito}'

            where cd_itemreuniao = ${essentialFields.data.cd_itemreuniao}
            `;
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
        for (let i = cd_BancaExaminadoraReuniaoInit; i < cd_BancaExaminadoraReuniaoInit + banca.length; i++) {
            const element = banca[i - cd_BancaExaminadoraReuniaoInit];
            try {
                
                    mylog("ERROR",filename,"createItemObject","i = ",i);
                     const myreq = `
                        INSERT INTO REUNIAO_T0900_BancaExaminadoraReuniao 
                        (cd_BancaExaminadoraReuniao, cd_itemreuniao, nm_ExaminadorBanca, ds_LotExaminadorBanca, Cd_TipoExaminador)
                        VALUES 
                        (${i}, ${essentialFields.data.cd_itemreuniao}, '${element.nm_ExaminadorBanca}', '${element.ds_LotExaminadorBanca}', ${element.Cd_TipoExaminador})
                    `;
                    
                    const answer = await mssql(myreq);
                    mylog ("ERROR",filename,"createItemObject","answer for banca = ", answer);
                
            } catch (error) {
                mylog ("ERROR",filename,"createItemObject","Error in banca insertion loop = ", error);
            }                  
        }
    }


    revalidatePath("/sinfonia/reuniao/"+essentialFields.data.cd_reuniao+"/pauta")
    redirect("/sinfonia/reuniao/"+essentialFields.data.cd_reuniao+"/pauta")
}