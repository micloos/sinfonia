'use server';

import { mssql } from '@/app/lib/db';
import { mylog } from '@/app/lib/mylogger';

import {type NextRequest} from 'next/server';

const filename='/api/getordemlist';
const ITEMS_PER_PAGE = 5;

export async function GET (request: NextRequest)
{
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");
    mylog ("DBG", filename, "getOrdemList", "id=",id);
    const page = searchParams.get("page");
    mylog ("DBG", filename, "getOrdemList", "page=",page);
    const offset = page ? (parseInt(page) - 1) * ITEMS_PER_PAGE : 0;
    mylog ("DBG", filename, "getOrdemList", "offset=",offset);
    const myreq = `select 
        Cd_OrdemDia as id, 
        Cd_SequenciaOrdemDia as seq, 
        Ds_OrdemDia as assunto,
        Ds_DeliberacaoOrdemDia as deliberacao, 
        Ind_OrdemDiaPublicavel as publicavel 
        from REUNIAO_T1500_OrdemDia 
        where cd_reuniao =${id}
        order by seq
        offset ${offset} rows
        fetch next ${ITEMS_PER_PAGE} rows only`;
    mylog ("DBG", filename, "getOrdemList", "myreq=",myreq.replace(/\s/g," "));
    const ordemList = await mssql(myreq);
    mylog ("DBG", filename, "getOrdemList", "ordemList=",ordemList);
    return Response.json(ordemList);
}

export async function POST (request: NextRequest)
{
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");
    mylog ("DBG", filename, "postOrdemList", "id=",id);
    const body = await request.json();
    mylog ("DBG", filename, "postOrdemList", "body=",body);
    const myreq = `update REUNIAO_T1500_OrdemDia set Cd_SequenciaOrdemDia = ${body.seq} 
        where Cd_OrdemDia = ${id}`;
    mylog ("DBG", filename, "postOrdemList", "myreq=",myreq.replace(/\s/g," "));
    await mssql(myreq);
    return Response.json({message: 'Ordem do Dia added successfully'});
}