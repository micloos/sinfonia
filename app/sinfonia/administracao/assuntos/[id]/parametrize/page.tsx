import { mylog } from '@/app/lib/mylogger';


const filename = 'app/sinfonia/administracao/assuntos/[id]/parametrize/page';

import { fetchAssuntoById, fetchAssuntoParametersById } from '@/app/lib/administracao/data';
import { EditParamsAssunto } from '@/app/ui/administracao/assuntos/edittable';

export default async function Page(props: {params: Promise<{ id: string }> }) {
    const params = await props.params;

    mylog("DBG", filename, 'Page' , "params=", params);
    const id = params.id;
    mylog("DBG", filename, 'Page' , "id=", id);
    const assunto = await fetchAssuntoById(Number(id));
    const assuntoParameters = await fetchAssuntoParametersById(Number(id));

    mylog("DBG", filename, 'Page' , "assunto=", assunto);
    mylog("DBG", filename, 'Page' , "assuntoParameters=", assuntoParameters);

    return (
        <main>
            <EditParamsAssunto assunto={assunto} assuntoParameters={assuntoParameters} />
        </main>
    );
}
