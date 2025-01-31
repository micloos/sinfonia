'use client'

import { mylog } from '@/app/lib/mylogger';
import { setReuniaoFuncao } from '@/app/lib/reuniao/actions';

const filename='/app/ui/reuniao/funcao';

export function Funcoes({id, funcao, editable}:{id: number, funcao: string, editable: number}) {
    mylog("DBG",filename,"Funcoes","{id, funcao}=",{id,funcao});
    const myid = `func${id}`;
    mylog("DBG",filename,"Funcoes","myid=",myid);
    if (editable==1){
    return(
        <select onChangeCapture={(event) => setReuniaoFuncao(id,(event.target as HTMLSelectElement).value)}  id={myid} name={myid} className='peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500' defaultValue={funcao}>
            <option key="Default" value="Default" disabled> Escolher Posição</option>
            <option key="Presidente" value="Presidente"> Presidente </option>
            <option key="Vice Presidente" value="Vice Presidente"> Vice Presidente </option>
            <option key="Docente" value="Docente"> Docente </option>
            <option key="Discente" value="Discente"> Discente </option>
            <option key="Assistente" value="Assistente"> Assistente </option>
            <option key="Assessor" value="Assessor"> Assessor </option>
        </select>
    )
} else {
    return (funcao);
}
}