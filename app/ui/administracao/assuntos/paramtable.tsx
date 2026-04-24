import { mylog } from "@/app/lib/mylogger";

const filename = 'app/ui/administracao/assuntos/paramtable';

import { fetchAssuntoParametersById } from "@/app/lib/administracao/data";


export async function AssParamTable(props: {params: Promise<{ id: string }> }) {
    const params = await props.params;

    mylog("DBG", filename, 'AssParamTable' , "params=", params);
    const id = params.id;
    mylog("DBG", filename, 'AssParamTable' , "id=", id);
    const parameters = await fetchAssuntoParametersById(Number(id));

    mylog("DBG", filename, 'AssParamTable' , "parameters=", parameters);

    return (
        <div className="w-full">

            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <p>Nome: {parameters?.ind_interessado}</p>
                <p>Valor: {parameters?.ind_defesa}</p>
            </div>
        </div>
    )
}

