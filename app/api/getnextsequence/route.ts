'use server';

import { mssql } from '@/app/lib/db';
import { mylog } from '@/app/lib/mylogger';
import { numericanswer } from '@/app/lib/definitions';

import {type NextRequest} from 'next/server';

const filename='/api/getnextsequence';

export async function GET (request: NextRequest)
{
    const searchParams = request.nextUrl.searchParams;
    const rid = searchParams.get("rid");
    mylog ("DBG", filename, "getNextSequence", "rid=",rid);
    const myreq = `select max(Cd_SequenciaOrdemDia) +1 as n FROM REUNIAO_T1500_OrdemDia where Cd_Reuniao = ${rid}`;
    mylog ("DBG", filename, "getNextSequence", "myreq=",myreq.replace(/\s/g," "));
    const nextCdArr = await mssql(myreq) as numericanswer[];
    mylog ("DBG", filename, "getNextSequence", "nextCdArr=",nextCdArr);
    const nextCd = nextCdArr[0].n? nextCdArr[0].n : 1;
    mylog ("DBG", filename, "getNextSequence", "nextCd=",nextCd);
    const retobj  = {
        nextCd: nextCd
    }
    return Response.json(retobj);
}