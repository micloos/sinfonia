'use server';

import { redirect } from 'next/navigation';
import { mylog } from '../mylogger';
import { mssql } from '@/app/lib/db';

export async function deleteAssunto(id: number) {
  const filename = "app/lib/assunto/actions.tsx";
  mylog("DBG", filename, "deleteAssunto", "id=", id);

  try {
    const myreq = `DELETE FROM REUNIAO_T3200_Assuntos WHERE Id_Assunto = ${id}`;
    mylog("DBG", filename, "deleteAssunto", "myreq=", myreq.replace(/\s/g, " "));
    const answer = await mssql(myreq);
    // const answer = "await mssql(myreq)";
    mylog("DBG", filename, "deleteAssunto", "answer=", answer);
  } catch (error) {
    mylog("ERROR", filename, "deleteAssunto", "error=", error);
    
  }

  redirect('/sinfonia/administracao/assuntos');
}